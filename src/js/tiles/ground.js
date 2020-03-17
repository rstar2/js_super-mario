import { Entity } from '../Entity.js';

/**
 * @param {TileCollisionContext} tileContext 
 */
function handleX({entity, match}) {
    // check if the entity is going right
    if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
            entity.obstructedBy(match, Entity.COLLIDE_RIGHT);
        }
    }
    // else if going left
    else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
            entity.obstructedBy(match, Entity.COLLIDE_LEFT);
        }
    }
}

/**
 * @param {TileCollisionContext} tileContext 
 */
function handleY({entity, match}) {
    // check if the entity is going down (falling)
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstructedBy(match, Entity.COLLIDE_BOTTOM);
        }
    }
    // else if going up (jumping)
    else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
            entity.obstructedBy(match, Entity.COLLIDE_TOP);
        }
    }
}

export const handlers = [
    handleX, handleY
];
