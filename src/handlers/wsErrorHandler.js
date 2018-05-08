import WsHandler from './wsHandler';

export default class ErrorHandler extends WsHandler {
    constructor(webSocket) {
        super(webSocket, 'error')
    }

    handler(event) {
        logger.error(`[CONNECTION ERROR] ${event.target.message}`);
    }
}