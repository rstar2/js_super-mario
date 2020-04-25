export class MusicController {

    /**
     * @param {MusicPlayer}
     */
    constructor(musicPlayer) {
        this._musicPlayer = musicPlayer;
    }

    playThemeMain(speed = 1) {
        // this._musicPlayer.play('main', { speed });

        this._musicPlayer.play('silence', { speed });
    }

    playThemeHurry() {
        this._musicPlayer.play('hurry', {
            loop: false,
            onEnd: () => {
                this.playThemeMain(1.3);
            }
        });
    }
}