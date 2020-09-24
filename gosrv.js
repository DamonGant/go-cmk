const http = require('http');
const express = require('express')
const fs = require('fs');
const SocketIO = require('socket.io');
const bodyParser = require("body-parser");
const open = require("open");
const GoEventEmitter = require("./goEventEmitter");

const goEventEmitter = new GoEventEmitter();

const modName = "dududu";

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);
const mod = require("./" + modName);

app.use(bodyParser.json());
app.use(express.static("public/"))
app.use("/modpublic", express.static(modName + "/public"))

app.post("/", goEventEmitter.route);

goEventEmitter.on("status", function(status) {
  io.emit("gomsg", status);
})

io.on("connection", function(socket) {
  socket.emit("preload", mod.preload);
  socket.on("preload-done", function() {
    mod.preloadDone(socket, goEventEmitter);
  })
})

server.listen(3000);
open("http://127.0.0.1:" + server.address().port + "/")
