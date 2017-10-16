export function createAnimation(frames, frameRate = 1) {
    // the frameRate is used to reduce the 'progress' if needed as otherwise the frames
    // will be changing too fast

    // progress - this has varios meangings depending on the context
    // it could be distance when walking
    // or simple time (seconds)
    return function (progress) {
        const frameIndex = Math.floor(progress / frameRate) % frames.length;
        return frames[frameIndex];
    };
}