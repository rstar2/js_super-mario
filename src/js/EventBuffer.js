/**
 * This is like an inverted EventEmitter.
 * When emitting it actually stores/buffers the event, and finally when
 * specified it process them 
 */
export class EventBuffer {
    constructor() {
        this._events = new Map();
    }
    
    /**
     * Emits an event (actually stores it for later processing)
     * @param {String} name 
     * @param  {...any} args 
     */
    emit(name, ...args) {
        let events = this._events.get(name);
        if (!events) {
            events = [];
            this._events.set(name, events);
        }
        events.push({args});
    }

    /**
     * Process all stored events for certain key/name
     * @param {String} name 
     * @param {Function} callback 
     */
    process(name, callback) {
        let events = this._events.get(name);
        if (events) {
            events.forEach(event => callback(...event.args));
        }
    }

    /**
     * Clears all the buffered evevnts
     */
    clear() {
        this._events.clear();
    }
}