import Trait from '../Trait.js';

export default class BehaviorKillable extends Trait {
    constructor() {
        super('killable', true);
        this._dead = false;
    }

    get dead() {
        return this._dead;
    }

    kill() {
        this._dead = true;
    }

}