import _ from 'lodash';
import { List } from 'immutable';

export default class Queue {
    constructor() {
        this.list = List();
    }

    add(obj) {
        this.list = this.list.push(obj);
    }

    hasNext() {
        return this.list.first() !== undefined;
    }

    next() {
        let item = this.list.first();

        this.list = this.list.shift();

        return item;
    }
}