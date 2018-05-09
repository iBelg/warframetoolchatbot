import _ from 'lodash';
import ItemCommand from '../commands/ItemCommand';
import Command from '../commands/Command';

class CommandsHandler {

    handleCommand(command, paramString) {
        var commandHandler = undefined;
        switch(_.toLower(command)) {
            case 'item':
                commandHandler = new ItemCommand(paramString);
                break;
            default:
                commandHandler = new Command(command, paramString); //TODO: unknown command implement
        }
        if (commandHandler !== undefined) {
            commandHandler.execute();
        } else {
            logger.debug(`Could not execute command ${command}!`)
        }
        
    }
}

const instance = new CommandsHandler();
Object.freeze(instance);

export default instance;