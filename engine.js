class VisualNovelEngine {
    constructor() {
        this.currentScene = null;
        this.scenesData = {};
        this.mainDiv = document.getElementById('main');
        this.activeIntervals = []; // Track active intervals
        this.setupEventDelegation();
    }

    // Add this method to clear all active intervals
    clearAllIntervals() {
        this.activeIntervals.forEach(interval => clearInterval(interval));
        this.activeIntervals = [];
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
        this.clearAllIntervals(); // Clear intervals before rendering new scene
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
