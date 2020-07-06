
// debug utility
// 1. Reposition an entity to the clicked position when mouse Left button is pressed
// 2. Scroll the view when the RIGHT mouse button is pressed
export function setupMouseControl(entity, canvas, level) {
    let lastMouseEvent = null;
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                // reposition the entity to the desired position
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX + level._camera.pos.x, event.offsetY + level._camera.pos.y);
            } else if (event.buttons === 2 && lastMouseEvent &&
                lastMouseEvent.buttons === 2 && lastMouseEvent.type === 'mousemove') {
                // move the whole view
                level._camera.pos.x -= event.offsetX - lastMouseEvent.offsetX;
            }

            lastMouseEvent = event;
        });
    });

    // prevent the context menu appear on the canvas
    canvas.addEventListener('contextmenu', event => event.preventDefault());
}
