import _ from 'lodash';
import ItemCommand from '../commands/ItemCommand';
import Command from '../commands/Command';

class CommandsHandler {

    handleCommand(command, paramString) {
        var command = undefined;
        switch(_.toLower(command)) {
            case 'item':
                logger.debug('ItemCommand!');
                command = new ItemCommand(paramString);
                break;
            default:
                command = new Command(paramString); //TODO: unknown command implement
        }
        if (command !== undefined) {
            command.execute();
        } else {
            logger.debug(`Could not execute command ${command}!`)
        }
        
    }
}

const instance = new CommandsHandler();
Object.freeze(instance);

export default instance;