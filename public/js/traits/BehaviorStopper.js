import Trait from '../Trait.js';

export default class BehaviorStopper extends Trait {
    constructor() {
        super('stopper', true);
        // Note: finally we could use the trait like this:
        // const entity = ...;
        // entity.stopper;
    }

}