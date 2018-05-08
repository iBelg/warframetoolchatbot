import './init-app';
import WebSocketManager from './WebSocketManager';

class WarframeToolBot {
    constructor() {
        
        this.start()
    }

    start() {
        let {BOT_NAME, DEFAULT_CHANNEL} = process.env;
        logger.info(`Creating bot... (${BOT_NAME})`);
        WebSocketManager.joinChannel(DEFAULT_CHANNEL);
        WebSocketManager.sendMessage('Hi there guys!', DEFAULT_CHANNEL);
    }

    stop() {
        logger.debug('Stopping the bot...');
        WebSocketManager.close();
    }
}

var instance = new WarframeToolBot();
Object.freeze(instance);

export default instance;

process.on('exit', () => (instance.stop()));
process.on('SIGINT', () => (instance.stop()));