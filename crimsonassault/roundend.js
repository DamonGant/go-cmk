module.exports = function(socket, goEventEmitter) {
  goEventEmitter.on("phase.over", function(s) {
    var won = (s.player.team === s.round.win_team);
    var sound = (won ? "wonround" : "lostround");
    socket.emit("changeplayback", {
      name: sound,
      cmd: "play"
    })
  })
}
