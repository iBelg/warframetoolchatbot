import _ from 'lodash';
import WsHandler from './wsHandler';
import ParsedMessage, {COMMANDS} from '../ParsedMessage';
import wsManager from '../WebSocketManager';
import CommandsHandler from './CommandsHandler';

export default class MessageHandler extends WsHandler {
    constructor(webSocket) {
        super(webSocket, 'message')
    }

    handler(event) {
        logger.debug(`[MESSAGE RECEIVED] ${event.data}`);
        if (event !== null) {
            var parsed = this.parseMessage(event.data);

            switch(parsed.command) {
                case COMMANDS.PING:
                    return this.handlePing(parsed);
                case COMMANDS.PRIVMSG:
                    if (parsed.userCommand !== undefined) {
                        logger.debug(`User requesting: [COMMAND: ${parsed.userCommand.name}] [PARAMS: ${parsed.userCommand.params}]`);
                        CommandsHandler.handleCommand(parsed.userCommand.name, parsed.userCommand.params);
                    }
                    break;
            }
        }
    }

    parseMessage(message) {
        return new ParsedMessage(message);
    }

    handlePing(parsedMessage) {
        wsManager.send(`PONG :${parsedMessage.message}`)
    }

}