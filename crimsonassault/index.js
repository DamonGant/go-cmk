module.exports = {
  preload: [
    {name: "wonround", filename: "modpublic/wonround.ogg"},
    {name: "lostround", filename: "modpublic/lostround.ogg"},
    {name: "freezetime", filename: "modpublic/startround.ogg"},
    {name: "playing", filename: "modpublic/startaction.ogg"},
    {name: "bombplant", filename: "modpublic/bombplanted.ogg"},
    {name: "bombtenseccou", filename: "modpublic/bombtenseccou.ogg"},
    {name: "mainmenu", filename: "modpublic/mainmenu.ogg"}
  ],
  preloadDone: function(socket, goEventEmitter) {
    console.log("preloadDone run");
    require("./menu")(socket, goEventEmitter);
    require("./roundend")(socket, goEventEmitter);
    require("./freezetime")(socket, goEventEmitter);
    require("./roundstart")(socket, goEventEmitter);
    require("./bomb")(socket, goEventEmitter);
  }
}
