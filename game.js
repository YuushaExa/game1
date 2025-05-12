function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('pointsDisplay');
    if (pointsDisplay) {
        pointsDisplay.style.transition = 'all 0.3s ease-out';
        pointsDisplay.textContent = `You currently have ${gameState.points} points in your adventure.`;
    }
}
const gameState = {
    points: 0,
    pointsPerClick: 1,
    pointsPerSecond: 0,
    upgrades: {
        click: { cost: 10, increase: 1 },
        auto: { cost: 50, increase: 1 },
        mega: { cost: 200, increase: 5 }
    },
    currentScene: "start_screen",
    previousScene: null,
    language: "en",
    volume: 1.0
};

const gameData = {

    scenes: {
        start_screen: {
            html: `
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                background: linear-gradient(135deg, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);
                                color: white;
                                font-family: Arial, sans-serif;
                                text-align: center;
                            }
                            .title {
                                font-size: 3em;
                                margin-bottom: 20px;
                                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                            }
                            .start-btn {
                                padding: 15px 30px;
                                background-color: #ff6b6b;
                                color: white;
                                border: none;
                                border-radius: 5px;
                                font-size: 1.2em;
                                cursor: pointer;
                                transition: all 0.3s;
                            }
                            .start-btn:hover {
                                background-color: #ff8e8e;
                                transform: scale(1.05);
                            }
                        </style>
                        <div>
                            <div class="title">Visual Novel</div>
                            <button class="start-btn" next_scene="block_1">Start Game</button>
                         <button class="start-btn" next_scene="block_2">Start 2</button>
                                                     <button class="start-btn" next_scene="block_3">Start Game3</button>
                    <button class="options-btn" next_scene="options">Options</button>
<p id="pointsDisplay">You currently have points in your adventure.</p>
                        </div>
            `,
            next_scene: "block_1"
        },
        block_1: {
            background: {
                type: "image",
                source: "background1.jpg"
            },
             dialog: [
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "avatar2.jpg",
                    text: "This is the third dialogue."
                }
            ],
            scene: {
                time: "25", // in seconds
                next_scene: "block_2" // scene to transition to after 5 seconds
            },
        },
        block_2: {
            background: {
                type: "color",
                source: "#f0f0f0"
            },
        html: `<button id="colorButton">Click me to change color</button>`,
onRender: function() {
    const button = document.getElementById("colorButton");
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let currentColorIndex = 0;
    let counter = 0;

    // Display counter (you might want to add this element to your HTML)
    const counterDisplay = document.createElement("div");
    counterDisplay.id = "counterDisplay";
    counterDisplay.textContent = `Counter: ${counter}`;
    button.parentNode.insertBefore(counterDisplay, button.nextSibling);

    // Click handler for color change
    button.addEventListener("click", function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        button.style.backgroundColor = colors[currentColorIndex];
        button.style.color = "white";
    });

    // Auto-increment counter every 2 seconds
    setInterval(function() {
        counter++;
        counterDisplay.textContent = `Counter: ${counter}`;
    }, 2000); // 2000 milliseconds = 2 seconds
},
                      next_scene: "block_1"
        },
            block_3: {
            background: {
                type: "color",
                source: "#f0f0f0"
            },
        html: `    <div id="game-container">
        <h1>Clicker Game</h1>
        <div class="stats">Points: <span id="points">0</span></div>
        <div class="stats">Points Per Click: <span id="points-per-click">1</span></div>
        <div class="stats">Points Per Second: <span id="points-per-second">0</span></div>
        
        <button id="click-button">Click Me!</button>
                                    <button class="start-btn" next_scene="start_screen">Start screen</button>

        <div id="upgrades">
            <h2>Upgrades</h2>
            <button class="upgrade" id="upgrade-click">
                Better Clicks (Cost: 10) - +1 point per click
            </button>
            <button class="upgrade" id="upgrade-auto">
                Auto Clicker (Cost: 50) - +1 point per second
            </button>
            <button class="upgrade" id="upgrade-mega">
                Mega Click (Cost: 200) - +5 points per click
            </button>
        </div>
    </div>`,
    onRender: function() {


        // DOM elements
        const pointsElement = document.getElementById('points');
        const pointsPerClickElement = document.getElementById('points-per-click');
        const pointsPerSecondElement = document.getElementById('points-per-second');
        const clickButton = document.getElementById('click-button');
        const upgradeClickButton = document.getElementById('upgrade-click');
        const upgradeAutoButton = document.getElementById('upgrade-auto');
        const upgradeMegaButton = document.getElementById('upgrade-mega');

        // Event listeners
        clickButton.addEventListener('click', handleClick);
        upgradeClickButton.addEventListener('click', () => buyUpgrade('click'));
        upgradeAutoButton.addEventListener('click', () => buyUpgrade('auto'));
        upgradeMegaButton.addEventListener('click', () => buyUpgrade('mega'));

        // Game loop for passive income
        setInterval(passiveIncome, 1000);

        // Update UI initially
        updateUI();

        // Functions
         function handleClick() {
            gameState.points += gameState.pointsPerClick;
             updatePointsDisplay();
            updateUI();
        }

        function passiveIncome() {
            gameState.points += gameState.pointsPerSecond;
            updatePointsDisplay();
            updateUI();
        }

        function buyUpgrade(type) {
            const upgrade = gameState.upgrades[type];
            
            if (gameState.points >= upgrade.cost) {
                gameState.points -= upgrade.cost;
                
                if (type === 'click' || type === 'mega') {
                    gameState.pointsPerClick += upgrade.increase;
                } else if (type === 'auto') {
                    gameState.pointsPerSecond += upgrade.increase;
                }
                
                // Increase cost for next purchase
                upgrade.cost = Math.floor(upgrade.cost * 1.5);
                
                updateUI();
            }
        }

        function updateUI() {
            pointsElement.textContent = gameState.points;
            pointsPerClickElement.textContent = gameState.pointsPerClick;
            pointsPerSecondElement.textContent = gameState.pointsPerSecond;
            
            // Update upgrade buttons
            upgradeClickButton.textContent = `Better Clicks (Cost: ${gameState.upgrades.click.cost}) - +${gameState.upgrades.click.increase} point per click`;
            upgradeAutoButton.textContent = `Auto Clicker (Cost: ${gameState.upgrades.auto.cost}) - +${gameState.upgrades.auto.increase} point per second`;
            upgradeMegaButton.textContent = `Mega Click (Cost: ${gameState.upgrades.mega.cost}) - +${gameState.upgrades.mega.increase} points per click`;
            
            // Disable buttons if can't afford
            upgradeClickButton.disabled = gameState.points < gameState.upgrades.click.cost;
            upgradeAutoButton.disabled = gameState.points < gameState.upgrades.auto.cost;
            upgradeMegaButton.disabled = gameState.points < gameState.upgrades.mega.cost;
        }
    },
                      next_scene: "block_1"
        },
      options: {
            html: `
                <style>
                    .options-menu {
                        background: rgba(0,0,0,0.8);
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        margin: auto;
                    }
                    .back-btn {
                        padding: 10px 20px;
                        background-color: #ff6b6b;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                </style>
                <div class="options-menu">
                    <h2>Options</h2>
                    <div id="language-switcher">
                        <button data-lang="en">English</button>
                        <button data-lang="ru">Русский</button>
                    </div>
                    <div>Volume controls would go here</div>
                    <button class="back-btn" next_scene="previous_scene">Back</button>
                </div>
            `
        },
    }
};
