export function loadImage(name) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', () => reject(image));
        image.src = name;
    });
}

const loadJson = (url) => {
    return fetch(url).then(r => r.json());
};

export function loadDataLevel(name) {
    return loadData(`levels/${name}`);
}

export function loadData(name) {
    return loadJson(`/data/${name}.json`);
}