import WsHandler from './wsHandler';

export default class CloseHandler extends WsHandler {
    constructor(webSocket) {
        super(webSocket, 'close')
    }

    handler(close) {
        logger.debug('[CONNECTION CLOSED]', close.readyState);
    }
}