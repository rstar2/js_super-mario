/* eslint-disable no-console */

import { loadDataSounds, loadBuffer } from './utils.js';
import { AudioBoard } from '../AudioBoard.js';
/**
 * @param {String} name
 * @param {AudioContext} audioContext
 * @returns {Promise<AudioBoard>}
 */
export function loadSounds(name, audioContext) {
    const audioBoard = new AudioBoard();

    return loadDataSounds(name)
        .then(sounds => {
            // Format is like: 
            // {
            //     "jump": {
            //         "url": "audio/jump.ogg"
            //     },
            //     ...
            // }
            // load all sounds
            const promises = [];
            Object.keys(sounds).forEach(key => {
                const job = loadBuffer(sounds[key].url)
                    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                    .then(audioBuffer => audioBoard.add(key, audioBuffer))
                    .then(() => console.log('Loaded audio:', name, key));
                promises.push(job);
            });

            return Promise.all(promises);
        })
        .catch(console.log)
        .then(() => audioBoard);
}