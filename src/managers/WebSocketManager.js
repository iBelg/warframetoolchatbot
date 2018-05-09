import _ from 'lodash';
import WebSocket from 'ws';
import {READY_STATE} from '../handlers/wsHandler';
import WsErrorHandler from '../handlers/wsErrorHandler';
import WsOpenHandler from '../handlers/wsOpenHandler';
import WsMessageHandler from '../handlers/wsMessageHandler';
import WsCloseHandler from '../handlers/wsCloseHandler';
import Queue from '../Queue';

class WebSocketManager {
    constructor() {
        try {
            let {IRC_SERVER, SERVER_PORT} = process.env;
            logger.debug(`Connecting to server ${IRC_SERVER}:${SERVER_PORT}`)
            this.webSocket = new WebSocket(`wss://${IRC_SERVER}:${SERVER_PORT}/`, 'irc');
        } catch (e) {
            logger.error(`[WS] : ${e}`)
            process.exit();
        }

        this.errorHandler = new WsErrorHandler(this.webSocket);
        this.openHandler = new WsOpenHandler(this.webSocket);
        this.messageHandler = new WsMessageHandler(this.webSocket);
        this.closeHandler = new WsCloseHandler(this.webSocket);

        this.unSubOnOpen = this.openHandler.subscribe(this.onSocketOpen.bind(this));

        this.actionQueue = new Queue();
    }

    get socket() {
        return this.webSocket;
    }

    send(rawMessage) {
        if (this.webSocket && this.webSocket.readyState === READY_STATE.OPEN) {
            this.webSocket.send(rawMessage);
            logger.debug(`[MESSAGE SENT] ${rawMessage}`);
        } else if (this.webSocket && this.webSocket.readyState === READY_STATE.CONNECTING) {
            logger.debug(`WebSocket is not ready yet. Will send message when ready!`)
            this.actionQueue.add(() => (this.send(rawMessage)));
        } else {
            logger.error('There is no websocket! (send)');
        }
    }

    sendMessage(message, channel = process.env.DEFAULT_CHANNEL) {
        let rawMessage = `PRIVMSG #${channel} :${message}`;
        this.send(rawMessage);
    }

    joinChannel(channel) {
        if (this.webSocket && this.webSocket.readyState === READY_STATE.OPEN) {
            logger.debug(`Joining ${channel}...`);
            this.webSocket.send(`JOIN #${channel}`);
        } else if (this.webSocket && this.webSocket.readyState === READY_STATE.CONNECTING) {
            logger.info(`WebSocket is not ready yet. Will join ${channel} when ready!`);
            this.actionQueue.add(() => (this.joinChannel(channel)));
        } else {
            logger.error('There is no websocket! (joinChannel)');
        }
    }

    onSocketOpen(data) {
        if (data === READY_STATE.OPEN) {
            while(this.actionQueue.hasNext()) {
                var action = this.actionQueue.next();
                if (_.isFunction(action)) {
                    action.call();
                }
            }
        } else {
            logger.debug(data);
        }
    }

    close() {
        if (this.webSocket) {
            this.webSocket.close();
        }
    }
}

const instance = new WebSocketManager();
Object.freeze(instance);

export default instance;