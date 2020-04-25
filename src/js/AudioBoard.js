export class AudioBoard {
    constructor() {
        this._buffers = new Map();
    }

    /**
     * @param {String} name
     * @param {AudioBuffer} buffer 
     */
    add(name, buffer) {
        this._buffers.set(name, buffer);
    }

    /**
     * @param {String} name 
     * @param {AudioContext} audioContext 
     */
    play(name, audioContext) {
        const buffer = this._buffers.get(name);

        if (buffer) {
            const audioSource = audioContext.createBufferSource();
            audioSource.buffer = buffer;
            audioSource.connect(audioContext.destination);

            audioSource.start(0);
        }
    }

}