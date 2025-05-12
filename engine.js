class VisualNovelEngine {
    constructor() {
        this.currentScene = null;
        this.scenesData = {};
        this.mainDiv = document.getElementById('main');
        this.setupEventDelegation();
    }

    init(gameData) {
        this.scenesData = gameData.scenes;
        this.startVisualNovel();
    }

    setupEventDelegation() {
        this.mainDiv.addEventListener('click', (e) => {
            const elementWithNextScene = e.target.closest('[next_scene]');
            if (elementWithNextScene) {
                const targetScene = elementWithNextScene.getAttribute('next_scene');
                this.renderScene(targetScene);
            }
        });
    }

    startVisualNovel() {
        this.renderScene('start_screen');
    }

    renderScene(sceneId) {
        const scene = this.scenesData[sceneId];
        this.currentScene = sceneId;
        this.mainDiv.innerHTML = scene.html || '';
updatePointsDisplay();
         if (scene.onRender) {
            scene.onRender();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.vnEngine = new VisualNovelEngine();
    vnEngine.init(gameData);
});
