import _ from 'lodash';
import Subscribe from '../Subscribe';

export const READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};

export default class WsHandler extends Subscribe {
    constructor(webSocket, handle) {
        super();
        this.webSocket = webSocket;
        this.handle = handle;
        this.attach();
    }

    attach() {
        logger.info(`[ATTACH HANDLER] : ${this.handle}`)
        this.webSocket[`on${this.handle}`] = this.handler.bind(this);
    }
}