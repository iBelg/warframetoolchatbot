import WsHandler, { READY_STATE } from './wsHandler';

export default class OpenHandler extends WsHandler {
    constructor(webSocket) {
        super(webSocket, 'open')
    }

    handler(event) {
        if (this.webSocket !== null && this.webSocket.readyState === READY_STATE.OPEN) {
            logger.info(`[CONNECTION OPENED] ${event.target.url}`);

            let {BOT_NAME, OAUTH, DEFAULT_CHANNEL} = process.env;
            this.webSocket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
            this.webSocket.send(`PASS ${OAUTH}`);
            this.webSocket.send(`NICK ${BOT_NAME}`);
            this.callSubscribers(this.webSocket.readyState);
        }
    }
}