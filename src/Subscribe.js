import _ from 'lodash';

const MAX_ITERATIONS = 1000;

export default class Subscribe {
    constructor() {
        this.subscriptions = [];
        this.lastUniqueKey = 0;
    }

    subscribe(fn) {
        var newUniqueKey = this.lastUniqueKey;
        var isKeyAlreadyUsed;
        var maxIterations = MAX_ITERATIONS;
        var currentIteration = 0;
        do {
            isKeyAlreadyUsed = (_.find(this.subscriptions, o => (o.key === newUniqueKey)) !== undefined)
            if (isKeyAlreadyUsed) {
                currentIteration += 1
                newUniqueKey += 1;
            }
        } while (isKeyAlreadyUsed || currentIteration >= maxIterations)
        if (currentIteration >= maxIterations) {
            logger.error('Possible infinite loop prevented?');
            return undefined;
        }
        if (!isKeyAlreadyUsed) {
            this.subscriptions.push({key: newUniqueKey, fn});
            return () => (_.remove(this.subscriptions, item => (item.key === newUniqueKey))); //returns unsub function
        }
        
    }

    callSubscribers(data) {
        _.forEach(this.subscriptions, item => {
            if (_.isFunction(item.fn)) {
                item.fn.call(undefined, data)
            }
        });
    }
}