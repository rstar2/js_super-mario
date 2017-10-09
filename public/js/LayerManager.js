export default class LayerManager {
    constructor() {
        this._layers = [];
    }

    add(layer) {
        this._layers.push(layer);
    }

    draw(context) {
        this._layers.forEach(layer => layer(context));
    }
}