import { Entity } from "./Entity.js";
import { BePlayerControlTrait as BePlayerControl } from "./traits/BePlayerControl.js";
import { BePlayerTrait as BePlayer } from "./traits/BePlayer.js";

/**
 *
 * @param {Entity} player
 * @returns {Entity}
 */
export function createPlayerEnvironment(player) {
    // create a fictitious entity
    const playerEnv = new Entity();
    playerEnv.draw = () => {};
    player.pos.set(64,64);
    playerEnv.registerTrait(new BePlayerControl(player));
    return playerEnv;
}

/**
 * @param {Entity} player
 */
export function createPlayer(player) {
    player.registerTrait(new BePlayer());
    return player;
}

/**
 * @param {Level} level
 * @generator
 * @yields {Entity} next player entity
 */
export function* generatePlayer(level) {
    for (const entity of level.generateEntity()) {
        // check if the entity has the "player" trait
        if (entity.player)
            yield entity;
    }
}