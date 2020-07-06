/**
 * @param {String} url
 * @return {Promise<Object>}
 */
const loadJson = url => {
    return fetch(url).then(r => r.json());
};

/**
 * @param {String} name
 * @return {Promise<Object>}
 */
export function loadDataLevel(name) {
    return loadData(`levels/${name}`);
}

/**
 * @param {String} name
 * @return {Promise<Object>}
 */
export function loadDataPatterns(name) {
    return loadData(`sprites/patterns/${name}`);
}

/**
 * @param {String} name
 * @return {Promise<Object>}
 */
export function loadDataSounds(name) {
    return loadData(`sounds/${name}`);
}

/**
 * @param {String} name
 * @return {Promise<Object>}
 */
export function loadDataMusic(name) {
    return loadData(`music/${name}`);
}

/**
 * @param {String} name
 * @return {Promise<Object>}
 */
export function loadData(name) {
    return loadJson(`data/${name}.json`);
}

/**
 * @param {String} url
 * @return {Promise<ArrayBuffer>}
 */
export function loadBuffer(url) {
    return fetch(url).then(r => r.arrayBuffer());
}

/**
 * @param {String} name
 * @return {Promise<Image>}
 */
export function loadImage(name) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", () => reject(image));
        image.src = name;
    });
}
