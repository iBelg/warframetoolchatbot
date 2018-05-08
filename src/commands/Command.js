import _ from 'lodash';

export default class Command {
    constructor(params) {
        if (params !== undefined && _.isString(params)) {
            this.params = _.split(params, ' ');
        }
    }

    execute() {
        logger.debug('Implement this method');
    }
}