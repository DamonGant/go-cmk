module.exports = function(socket, goEventEmitter) {
  var roundId = null;
  goEventEmitter.on("phase.live", function(s) {
    if (roundId !== null && roundId == s.roundId) return;
    roundId = s.roundId;
    socket.emit("changeplayback", {
      name: "playing",
      cmd: "play"
    })
  })
}
