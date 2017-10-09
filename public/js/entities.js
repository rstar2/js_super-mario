import Entity from './Entity.js';
import { loadCharacterSprites } from './sprites.js';


export function createEntityMario() {
    return loadCharacterSprites().
        then(sprites => {
            const mario = new Entity();

            mario.draw = function (context) {
                sprites.draw('idle', context, this.position.x, this.position.y);
            }

            return mario;
        });
}