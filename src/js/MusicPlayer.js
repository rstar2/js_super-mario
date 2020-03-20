export class MusicPlayer {

    constructor() {
        this._tracks = new Map();
    }
    /**
     * 
     * @param {String} name 
     * @param {{url: String}} track 
     */
    add(name, track) {
        this._tracks.set(name, new Audio(track.url));
    }

    /**
     * 
     * @param {String} name 
     */
    play(name) {
        const audio = this._tracks.get(name);
        if (audio) {
            audio.play();
        } else {
            // eslint-disable-next-line no-console
            console.error('No track with name', name);
        }
    }
}