import _ from 'lodash';

export const READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};

export default class WsHandler {
    constructor(webSocket, handle) {
        this.webSocket = webSocket;
        this.handle = handle;
        this.subscriptions = [];
        this.attach();
    }

    attach() {
        logger.info(`[ATTACH HANDLER] : ${this.handle}`)
        this.webSocket[`on${this.handle}`] = this.handler.bind(this);
    }

    subscribe(fn) {
        var lastElement = _.last(this.subscriptions);
        var newUniqueKey;
        if (lastElement) {
            newUniqueKey = lastElement.key + 1;
        } else {
            newUniqueKey = 1;
        }
        var foundElement;
        var maxIterations = 1000;
        var currentIteration = 0;
        do {
            foundElement = _.find(this.subscriptions, o => (o.key === newUniqueKey))
            if (foundElement !== undefined) {
                currentIteration += 1
                newUniqueKey += 1;
            }
        } while (foundElement !== undefined || currentIteration >= maxIterations)
        if (currentIteration >= maxIterations) {
            logger.error('Possible infinite loop prevented?');
            return undefined;
        }
        if (foundElement === undefined) {
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