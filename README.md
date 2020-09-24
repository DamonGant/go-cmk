# CSGO Custom Music Kit (CMK)

_This is a work in progress. A developer preview. Pre-alpha._

CMK is a Node.JS service that can interact with CSGO Gamestate Integration (the thing eSports events use for big displays). The service also exposes a Socket.IO client for web browsers, which will play the actual clips.

Only one module can be loaded at a time, but it can wire up as much custom stuff as needed. `crimsonassault` contains a subset of the great Crimson Assault kit, as an example.

## How to install

* Copy `gamestate_integration_cmk.cfg` into your CSGO's `cfg` folder. __Do not rename it.__
* Install [Node.js](https://nodejs.org/en/). Stable should work. I've worked with 5.8.0.
* Install dependencies. `npm i` via command line (Shift+RMB in Windows Explorer allows you to open a command line interpreter in the current directory)
* Run the server. `node gosrv`.
* Leave the browser window open.
* Run CSGO.
