import { loadMario } from './Mario.js';
import { loadGoomba } from './Goomba.js';
import { loadKoopa } from './Koopa.js';

export function loadEntities() {

    // the aim is to have mfactory methods like:
    // entityFactory.mario()
    // entityFactory.goomba()
    // entityFactory.koopa()

    // I. simple version relying on the fact that each 'loadXXX' 
    // that resolves to a factory function that is named
    // specifically like this: "mari/goomba/koopa/...."
    const entityFactory = {};
    return Promise.all([loadMario(), loadGoomba(), loadKoopa()]).
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
