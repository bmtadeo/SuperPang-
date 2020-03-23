import Settings from "./Settings.js";
import {setupKeyboard} from "./input.js";
import {loadBalls, loadBuster, loadHookManager, loadImage, loadLevel} from "./loaders.js";
import {CollisionManager} from "./collisions.js";
const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Settings.SCREEN_HEIGHT = canvas.height;
Settings.SCREEN_WIDTH= canvas.width;

Promise.all([loadImage('img/hookRope.png'),
    loadImage('img/sprites.png'),
    loadLevel('1')])
    .then(([hookImage,playerImage, levelSpec])=>{
        const hooks = [];
        const hookManager = loadHookManager(hookImage, hooks);
        const buster = loadBuster(playerImage, levelSpec.player);
        buster.setHookManager(hookManager);
        const balls = loadBalls(levelSpec.balls);
        let deltaTime = 0;
        let lastTime = 0;
        function update(time) {
            deltaTime = time - lastTime;
            context.clearRect(0, 0, canvas.width, canvas.height);
            buster.draw(context);
            buster.update(deltaTime/1000);
            for(var i=0; i<balls.length;i++){
                balls[i].draw(context);
                balls[i].update(deltaTime/1000);
            }
            for(var j=0; j<hooks.length;j++){
                hooks[j].draw(context);
                hooks[j].update(deltaTime/1000);
            }
            const collisionManager = new CollisionManager(hooks, balls);
            collisionManager.checkCollisions();
            lastTime = time;
            requestAnimationFrame(update);
        }
        const input = setupKeyboard(buster);
        input.listenTo(window);

        update(0);
    });