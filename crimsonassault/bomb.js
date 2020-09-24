module.exports = function(socket, goEventEmitter) {
  var roundId = null;
  var timerHandle = null;
  goEventEmitter.on("phase.live", function(s) {
    if (s.round.bomb && s.round.bomb == "planted"){
      if (roundId !== null && roundId == s.roundId) return;
      roundId = s.roundId
      socket.emit("changeplayback", {
        name: "bombplant",
        cmd: "play"
      })
      timerHandle = setTimeout(function() {
        socket.emit("changeplayback", {
          name: "bombtenseccou",
          cmd: "play"
        })
        timerHandle = null;
      }, (40-10)*1000)
    }
  })
  goEventEmitter.on("round.over", function() {
    if (timerHandle !== null)
      clearTimeout(timerHandle)
  })
}
