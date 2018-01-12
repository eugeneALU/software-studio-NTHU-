/*
 * The first param of an event handler is always the current (firing) component.
 */
export default class Component {
    /*
     * Override this method
     */
    static getRootClass() {
        return '.component';
    }

    constructor(root) {
        this.root = root;
        this.handlers  = {};   //declare a "object" (eventhandler object)
    }

    on(event, handler) {
        this.handlers[event] = handler;  //new hadlers{ event:handler() >>> a function}
    }                                    //[event] is a index; 

    fire(event, ...args) {                  //call handler function 
        this.handlers[event](this, ...args);//first element is always "this" (caller)
    }
}
