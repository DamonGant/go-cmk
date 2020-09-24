module.exports = function(socket, goEventEmitter) {
  var roundId = null;
  goEventEmitter.on("phase.freezetime", function(s) {
    if (roundId !== null && roundId == s.roundId) return;
    roundId = s.roundId
    socket.emit("changeplayback", {
      name: "freezetime",
      cmd: "play"
    })
  })
}
