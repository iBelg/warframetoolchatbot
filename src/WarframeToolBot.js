import Logger from './logger';

export default class WarframeToolBot {
    constructor(ircServer, ircPort, username, password) {
        this.ircServer = ircServer;
        this.ircPort = ircPort;
        this.username = username;
        this.password = password;
        //Logger.info(`Creating bot... (${ircServer}:${ircPort} with ${username})`);
        console.log(`Creating bot... (${ircServer}:${ircPort} with ${username})`);
    }

    connect(channel) {

    }
}