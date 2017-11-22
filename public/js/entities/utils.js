/**
 * Common utility function that will be used when creating each entity.
 * It creates a 'draw' method that will be attached to each entity.
 * @param {SpriteSheet} sprites 
 * @param {String} defaultTile 
 * @param {Function} [preAnimate]
 */
export function createDraw(sprites, defaultTile, preAnimate) {

    // the real draw function that will bve attached the entities
    return function draw(context, level) {
        let drawn;
        if (preAnimate instanceof Function) {
            drawn = preAnimate(this);
        }
        if (!drawn) {
            drawn = this.animate(level);
        }
        const { tile, mirrored } = drawn;
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]
        const tileSize = sprites.draw(tile || defaultTile, context, 0, 0, mirrored);

        // TODO: The drawn tile size is not necessary the "real" size of the entity
        // set the size of the entity to the size of the real drawn tile
        // this.size.set(...tileSize);
    };

}