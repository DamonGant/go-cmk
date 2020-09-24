"use strict";

// This entire file needs heavy DRY, general refactoring
// Probably also needs Angular2

$(document).ready(function() {
  $(".sc").hide();
  $(".uninitialized").show();

  var socket = io('http://127.0.0.1:3000/');
  var sounds = [];
  var currentAudio = null;
  var currentAudioName = null;

  socket.emit("handshake_a");
  socket.on('connect', function() {
    $(".sc").hide();
    $(".connected").show();
    logMsg("connected to socket")
  });

  socket.on("gomsg", function(msg) {
    logJson(msg);
  });

  socket.on("changeplayback", function(options) {
    switch (options.cmd) {
      case "stop":
        logMsg("stopping playback");
        if (currentAudio !== null) {
          if (options.explicit) {
            if (currentAudioName === options.name) {
              currentAudio.pause();
              currentAudio.currentTime = 0;
            }
          } else {
            currentAudio.pause();
            currentAudio.currentTime = 0;
          }
        }
        break;
      case "play":
        logMsg("playing audio " + options.name);
        if (currentAudioName !== null && currentAudioName !== options.name) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudioName = options.name;
        currentAudio = _.find(sounds, {name: options.name}).audio;
        currentAudio.loop = options.loop || false
        currentAudio.play();
    }
  })

  socket.on("preload", function(s) {
    var i = 0;
    var len = s.length;
    var preloadDone = false

    function condPreloadDone() {
      if (preloadDone) return;
      console.log(i);
      console.log(len);
      if (i >= len) {
        logMsg("preload done");
        socket.emit("preload-done");
        preloadDone = true;
      }
    }

    s.forEach(function(sound) {
      console.log("preloading sounds")
      console.dir(sound)
      let audioEl = document.createElement("audio");
      audioEl.autoplay = false;
      audioEl.preload = "auto";
      audioEl.src = sound.filename;
      audioEl.addEventListener("canplaythrough", function() { i++; condPreloadDone(); })
      logMsg("preloading " + sound.name);
      sounds.push({
        name: sound.name,
        audio: audioEl
      });
    })
  })

  function logJson(json) {
    $(".console-list").prepend("<li><pre>" + JSON.stringify(json, null, "\t") + "</pre></li>")
  }

  function logMsg(msg) {
    $(".console-list").prepend("<li><code>" + msg + "</code></li>")
  }
})
