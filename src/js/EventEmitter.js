export class EventEmitter {
    constructor() {
        this._listeners = new Map();
    }
    
    add(name, listener) {
        let listeners = this._listeners.get(name);
        if (!listeners) {
            listeners = [];
            this._listeners.set(name, listeners);
        }
        listeners.push(listener);
    }

    emit(name, ...args) {
        let listeners = this._listeners.get(name);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}