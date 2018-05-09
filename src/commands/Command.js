import _ from 'lodash';

export default class Command {
    constructor(command, params) {
        this.command = command;
        if (params !== undefined && _.isString(params)) {
            this.params = _.split(params, ' ');
        }
    }

    execute() {
        logger.debug(`Unknown command: ${this.command} | params: ${this.params ? this.params.join(' ') : undefined}`);
    }
}