import dotenv from 'dotenv';
import WarframeToolBot from './WarframeToolBot';

export default class Bot {
    constructor() {
        console.log("TEST12345");
        dotenv.config();
        //console.log(process.env)
        var {IRC_SERVER, SERVER_PORT, BOT_NAME, OAUTH} = process.env;
        var warframeToolBot = new WarframeToolBot(IRC_SERVER, SERVER_PORT, BOT_NAME, OAUTH);
        
    }
}

new Bot();