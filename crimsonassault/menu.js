module.exports = function(socket, goEventEmitter) {
  var enabled = false;
  var cancelHandle = null;
  goEventEmitter.on("activity.menu", function(status) {
    if (status.round) return; // ingame menu
    if (cancelHandle !== null) {
      clearTimeout(cancelHandle);
    }
    if (!enabled) {
      socket.emit("changeplayback", {
        name: "mainmenu",
        cmd: "play",
        loop: "true"
      });
    }
    enabled = true;
    cancelHandle = setTimeout(function() {
      socket.emit("changeplayback", {
        name: "mainmenu",
        explicit: true,
        cmd: "stop"
      });
      enabled = false;
    }, 6000);
  })

}
