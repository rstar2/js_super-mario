export class MusicPlayer {

    constructor() {
        this._tracks = new Map();

        /**
         * @type {Audio}
         */
        this._playingAudio = null;
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
     * @param {Number} speed
     * @param {Boolean} loop
     * @param {Function} onEnd
     */
    play(name, { speed = 1, loop = true, onEnd } = {}) {
        const /*Audio*/audio = this._tracks.get(name);
        if (audio) {
            this.pause();
            
            this._playingAudio = audio;
            audio.loop = loop;
            audio.playbackRate = speed;
            if (onEnd) {
                audio.addEventListener('ended', onEnd, { once : true });
            }
            audio.play();
        } else {
            // eslint-disable-next-line no-console
            console.error('No track with name', name);
        }
    }

    pause() {
        if (this._playingAudio) {
            this._playingAudio.pause();
        }
    }
}