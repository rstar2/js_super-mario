import { Scene } from './Scene.js';

export class SceneRunner {
    constructor() {
        /* Scene[] */ this._scenes = [];
        /* Scene */ this._currentScene = null;
    }

    /**
     * 
     * @param {Scene} scene 
     */
    addScene(scene) {
        // when the scene is "complete" go to next one
        scene.addListener(Scene.EVENT_COMPLETE, () => this.next());

        this._scenes.push(scene);
    }

    next() {
        if (this._currentScene) {
            // pause current scene, for instance for a Level this could mean pausing the music and etc...
            this._currentScene.pause();

            const currentSceneInx = this._scenes.findIndex(scene => scene === this._currentScene);
            this._currentScene = this._scenes[currentSceneInx + 1]; // can again be invalid (if no such scene)
        } else {
            this._currentScene = this._scenes[0]; // can again be invalid (if no such scene)
        }
    }


    /**
     * @param {GameContext} gameContext
     */
    update(gameContext) {
        if (this._currentScene) {
            // update all level entities (including Mario)
            this._currentScene.update(gameContext);

            // draw next frame
            this._currentScene.draw(gameContext);
        }
    }
}