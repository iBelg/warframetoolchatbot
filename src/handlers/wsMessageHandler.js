import _ from 'lodash';
import WsHandler from './wsHandler';
import ParsedMessage, {COMMANDS} from '../ParsedMessage';
import wsManager from '../managers/WebSocketManager';
import CommandsHandler from './CommandsHandler';
import Bot from '../bot';
import {OBJ_STATE} from '../managers/StateManager';

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
                        CommandsHandler.handleCommand(parsed.userCommand.name, parsed.userCommand.params);
                    }
                    break;
                case COMMANDS.CAPACK:
                    Bot.getStateManager().setState(OBJ_STATE.READY_UP);
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