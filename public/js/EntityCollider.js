import Entity from './Entity.js';

export default class EntityCollider {
    /**
     * 
     * @param {Set<Entity>} entities 
     */
    constructor(entities) {
        this._entities = entities;
    }

    /**
     * 
     * @param {Entity} entity 
     */
    check(entity) {
        this._entities.forEach(candidate => {
            // skip the same entity
            if (candidate === entity) {
                return;
            }

            if (entity.bounds.overlaps(candidate.bounds)) {
                // notify both entities for the collision between them
                entity.collidedWith(candidate);
                candidate.collidedWith(entity);
            }
        });
    }

}