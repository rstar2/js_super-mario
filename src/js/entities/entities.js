import { loadMario } from './Mario.js';
import { loadGoomba } from './Goomba.js';
import { loadKoopa } from './Koopa.js';
import { loadBullet } from './Bullet.js';

/**
 * 
 * @param {AudioContext} audioContext 
 */
export function loadEntities(audioContext) {

    // the aim is to have factory methods like:
    // entityFactory.mario()
    // entityFactory.goomba()
    // entityFactory.koopa()

    // I. simple version relying on the fact that each 'loadXXX' 
    // that resolves to a factory function that is named
    // specifically like this: "mario/goomba/koopa/...."
    const entityFactory = {};
    return Promise.all([
        loadMario(audioContext),
        loadGoomba(audioContext),
        loadKoopa(audioContext),
        loadBullet(audioContext),
    ]).
        then(factories => {
            factories.forEach(factory => entityFactory[factory.name] = factory);

            return entityFactory;
        });


    // II. a different solution - specifically name the factories
    // const entityFactory = {};
    // function addAs(name) {
    //     return factory => entityFactory[name] = factory;
    // }
    // return Promise.all([
    //     loadMario().then(addAs('mario')),
    //     loadGoomba().then(addAs('goomba')),
    //     loadKoopa().then(addAs('koopa'))]).
    //     then(() => entityFactory);
}
