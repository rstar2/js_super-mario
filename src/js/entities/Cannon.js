import { Entity } from '../Entity.js';
import { generatePlayer } from '../player.js';
import { EmitterTrait as Emitter } from '../traits/Emitter.js';
import { loadEntity } from './utils.js';

/**
 * @param {AudioContext} audioContext
 * @param {{[factory]: Function}} entityFactories 
 */
export function loadCannon(audioContext, entityFactories) {
    return loadEntity('cannon', audioContext, entityFactories).
        then(createCannonFactory);
}

const HOLD_SHOOT_THRESHOLD = 30;

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites
 * @param {AudioBoard} audioBoard
 */
function createCannonFactory({audioBoard}) {

    return function cannon() {
        const cannon = new Entity('cannon', audioBoard, false);

        cannon.registerTrait(new Emitter(4));

        cannon.emitter.add(function (/*Entity*/entity, gameContext, /*Level*/level) {
            // here actually cannon === entity

            let direction = 1;

            // check if any player is near the cannon and if yes then don't shoot
            for (const player of generatePlayer(level)) {
                if (player.pos.x > cannon.pos.x - HOLD_SHOOT_THRESHOLD &&
                    player.pos.x < cannon.pos.x + HOLD_SHOOT_THRESHOLD) {
                    // don't shoot
                    return;
                }

                // check to see if which direction to fire
                if (player.pos.x < cannon.pos.x)
                    direction = -1;
            }

            cannon.sound('shoot');
            
            const bullet = gameContext.entityFactory.bullet();
            bullet.pos.set(cannon.pos.x, cannon.pos.y);
            bullet.vel.x = direction * bullet.vel.x;
            
            level.addEntity(bullet);
        });

        return cannon;
    };
}