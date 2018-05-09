import './init-app';
import WebSocketManager from './managers/WebSocketManager';
import BotStateManager, {OBJ_STATE} from './managers/StateManager';
import {READY_STATE} from './handlers/wsHandler';

class WarframeToolBot {
    constructor() {
        new BotStateManager(this);
        this.start();
    }

    start() {
        let {BOT_NAME, DEFAULT_CHANNEL} = process.env;
        logger.info(`Creating bot... (${BOT_NAME})`);
        this.openUnSub = WebSocketManager.openHandler.subscribe(data => {
            if (data === READY_STATE.OPEN) {

            }
        });
        this.stateUnSub = this.getStateManager().subscribe(botState => {
            if (botState === OBJ_STATE.READY_UP) {
                this.getStateManager().setState(OBJ_STATE.READY);
            }
            if (botState === OBJ_STATE.READY) {
                logger.info(`Bot ready! (${BOT_NAME})`);
                WebSocketManager.joinChannel(DEFAULT_CHANNEL);
                WebSocketManager.sendMessage('Hi there guys!', DEFAULT_CHANNEL);
            }
        });
    }

    stop() {
        logger.debug('Stopping the bot...');
        this.getStateManager().setState(OBJ_STATE.SHUTTING_DOWN);
        WebSocketManager.close();
    }
}

var instance = new WarframeToolBot();
Object.freeze(instance);

export default instance;

process.on('exit', () => (instance.stop()));
process.on('SIGINT', () => (instance.stop()));