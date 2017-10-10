import Entity from './Entity.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import { loadCharacterSprites } from './sprites.js';

export function createEntityMario() {
    return loadCharacterSprites().
        then(sprites => {
            const mario = new Entity();
            mario.size.set(14, 16);

            mario.draw = function (context) {
                sprites.draw('idle', context, this.pos.x, this.pos.y);
            }

            mario.registerTrait(new Jump());
            mario.registerTrait(new Velocity());
            

            return mario;
        });
}