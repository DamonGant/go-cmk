const EventEmitter = require('events');
const util = require('util');

function GoEventEmitter() {
  var self = this;
  this.route = function(req, res) {
    res.status(200).end();
    function e(topic) {
        self.emit(topic, req.body);
    }
    if (req.body.map) { // if we're in a match, try to add a crude identifier to the event
      req.body.roundId = req.body.map.name + req.body.map.round + req.body.map.mode;
    }
    const s = req.body;
    const activity = req.body.player.activity || unknown;
    e("status");
    e("activity." + activity);
    if (s.round) {
      if (s.round.phase) e("phase." + s.round.phase);
    }
  }
}

util.inherits(GoEventEmitter, EventEmitter);
module.exports = GoEventEmitter;
