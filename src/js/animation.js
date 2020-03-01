export function createAnimation(frames, frameRate = 5) {
    // the frameRate is used to reduce the 'progress' if needed as otherwise the frames
    // will be changing too fast

    if (frames instanceof Array) {
        // progress - this has various meanings depending on the context
        // it could be distance when walking
        // or simple time (seconds)
        return function (progress) {
            const frameIndex = Math.floor(progress / frameRate) % frames.length;
            return frames[frameIndex];
        };
    }

    // if just a single frame specified then return a "fixed" function
    return function (/*progress*/) {
        return frames;
    };

}