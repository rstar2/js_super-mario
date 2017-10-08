import CONFIG from './config.js'

export function loadImage(name) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', () => rejecta(image));
        image.src = CONFIG.URL_PREFIX_IMAGE + name;
    });
}

const loadJson = (url) => {
    return fetch(url).then(r => r.json());
}

export function loadLevel(level) {
    return loadJson(CONFIG.URL_PREFIX_LEVEL + level + '.json');
}

export function loadData(name) {
    return loadJson(CONFIG.URL_PREFIX_DATA + name);
}