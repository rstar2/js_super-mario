import { Entity } from "./Entity.js";
import { BePlayerControlTrait as BePlayerControl } from "./traits/BePlayerControl.js";
import { BePlayerTrait as BePlayer } from "./traits/BePlayer.js";

/**
 *
 * @param {Entity} player
 * @param {Level} level
 * @returns {Entity}
 */
export function createPlayerEnvironment(player, level) {
    // create a fictitious entity
    const playerEnv = new Entity();
    playerEnv.draw = () => {};
    playerEnv.registerTrait(new BePlayerControl(player, level.getProp("time")));
    level.addEntity(playerEnv);
    return playerEnv;
}

/**
 * @param {Entity} player
 */
export function createPlayer(player) {
    player.registerTrait(new BePlayer());
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