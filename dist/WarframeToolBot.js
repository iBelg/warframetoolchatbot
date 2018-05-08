'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WarframeToolBot = function () {
    function WarframeToolBot(ircServer, ircPort, username, password) {
        _classCallCheck(this, WarframeToolBot);

        this.ircServer = ircServer;
        this.ircPort = ircPort;
        this.username = username;
        this.password = password;
        //Logger.info(`Creating bot... (${ircServer}:${ircPort} with ${username})`);
        console.log('Creating bot... (' + ircServer + ':' + ircPort + ' with ' + username + ')');
    }

    _createClass(WarframeToolBot, [{
        key: 'connect',
        value: function connect(channel) {}
    }]);

    return WarframeToolBot;
}();

exports.default = WarframeToolBot;