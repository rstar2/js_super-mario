export class LayerManager {
    constructor() {
        this._layers = [];
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */
    add(layer) {
        this._layers.push(layer);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {View} view 
     */
    draw(context, view) {
        this._layers.forEach(layer => layer(context, view));
    }
}