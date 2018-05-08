import Command from './Command'

export default class ItemCommand extends Command {
    constructor(params) {
        super(params);
    }

    execute() {
        if (this.params !== undefined) {
            var itemName = this.params.join(' ');
            logger.debug(`[ItemCommand] looking up item ${itemName}`);
        }
    }
}