/**
 * @param {TileCollisionContext} tileContext 
 */
function handle({entity, match, tileResolver}) {
    if (entity.player) {
        //remove the current "coin" 
        tileResolver.deleteByIndex(match.indexX, match.indexY);

        entity.player.addCoins(1);
    }

}

export const handlers = [
    handle, handle
];
