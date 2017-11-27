import Trait from '../Trait.js';
import Entity from '../Entity.js';

export default class BeSolid extends Trait {
    constructor() {
        super('solid', true);

        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    obstructed(entity, obstacle, direction) {
        if (!this._enabled) {
            return;
        }

        switch (direction) {
            case Entity.COLLIDE_BOTTOM:
                entity.bounds.bottom = obstacle.y1;
                entity.vel.y = 0;
                break;
            case Entity.COLLIDE_TOP:
                entity.bounds.top = obstacle.y2;
                entity.vel.y = 0;
                break;
            case Entity.COLLIDE_RIGHT:
                entity.bounds.right = obstacle.x1;
                entity.vel.x = 0;
                break;
            case Entity.COLLIDE_LEFT:
                entity.bounds.left = obstacle.x2;
                entity.vel.x = 0;
                break;
        }
    }

}