'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _WarframeToolBot = require('./WarframeToolBot');

var _WarframeToolBot2 = _interopRequireDefault(_WarframeToolBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bot = function Bot() {
    _classCallCheck(this, Bot);

    console.log("TEST12345");
    _dotenv2.default.config();
    //console.log(process.env)
    var _process$env = process.env,
        IRC_SERVER = _process$env.IRC_SERVER,
        SERVER_PORT = _process$env.SERVER_PORT,
        BOT_NAME = _process$env.BOT_NAME,
        OAUTH = _process$env.OAUTH;

    var warframeToolBot = new _WarframeToolBot2.default(IRC_SERVER, SERVER_PORT, BOT_NAME, OAUTH);
};

exports.default = Bot;


new Bot();