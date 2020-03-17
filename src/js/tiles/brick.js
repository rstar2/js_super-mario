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
function handleY({entity, match, tileResolver, gameContext, level}) {
    // check if the entity is going down (falling)
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstructedBy(match, Entity.COLLIDE_BOTTOM);
        }
    }
    // else if going up (jumping)
    else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
            // if the entity is the player (e.g. Mario)
            if (entity.player) {
                //remove the current "brick" 
                tileResolver.deleteByIndex(match.indexX, match.indexY);
    
                // just for fun - replace it with a goomba
                const goomba = gameContext.entityFactory.goomba();
                goomba.vel.set(50, -400);
                goomba.pos.set(entity.pos.x, match.y1);
                level.addEntity(goomba);
            }



            entity.obstructedBy(match, Entity.COLLIDE_TOP);
        }
    }
}

export const handlers = [
    handleX, handleY
];
