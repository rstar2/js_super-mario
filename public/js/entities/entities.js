import { loadMario } from './Mario.js';
import { loadGoomba } from './Goomba.js';
import { loadKoopa } from './Koopa.js';

export function loadEntities() {
    // I. simple version relying on the fact that each 'loadXXX' 
    // that resolves to a factory function that is named specifically like this: "createXXX"
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
    //     loadMario().then(addAs('createMario')),
    //     loadGoomba().then(addAs('createGoomba')),
    //     loadKoopa().then(addAs('createKoopa'))]).
    //     then(() => entityFactory);
}
