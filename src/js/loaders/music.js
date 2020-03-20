/* eslint-disable no-console */

import { MusicPlayer } from '../MusicPlayer.js';
import { loadDataMusic } from './utils.js';
/**
 * @param {String} name
 * @returns {Promise<MusicPlayer>}
 */
export function loadMusic(name) {
    const musicPlayer = new MusicPlayer();

    if (!name) return Promise.resolve(musicPlayer);
    
    return loadDataMusic(name)
        .then(music => {
            // Format is like: 
            // {
            //     "main": {
            //         "url": "audio/music/xxx.ogg"
            //     },
            //     ...
            // }
            // load all music tracks
            
            for (const [name, track] of Object.entries(music)) {
                musicPlayer.add(name, track);
            }
            return musicPlayer;
        })
        .catch(error => console.error(`Failed to load music for ${name} : ${error}`))
        .then(() => musicPlayer);
}