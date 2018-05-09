import Subscribe from '../Subscribe'

export const OBJ_STATE = {
    STARTING_UP: 'starting_up', 
    READY_UP: 'ready_up',
    READY: 'ready', 
    BUSY: 'busy', 
    SHUTTING_DOWN: 'shutting_down', 
    SHUT_DOWN: 'shut_down'};

export default class StateManager extends Subscribe {
    /**
     * 
     * @param {*} obj to handle state of 
     */
    constructor(obj) {
        super();
        this.obj = obj;
        this.objState = OBJ_STATE.STARTING_UP;
        this.enhance(obj);
    }

    enhance(obj) {
        obj.$$stateManager = this;
        obj.getStateManager = () => (obj.$$stateManager);
    }

    setState(objState) {
        this.objState = objState;
        this.callSubscribers(this.objState);
    }

}