import CONFIG from './config.js'

export function loadImage(name) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', () => rejecta(image));
        image.src = CONFIG.URL_IMAGES_PREFIX + name;
    });
}