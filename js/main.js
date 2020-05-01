import Settings from "./Settings.js";
import {setupKeyboard} from "./input.js";
import {loadBackground, loadBalls, loadBuster, loadHookManager, loadImage, loadLevel} from "./loaders.js";
import {CollisionManager} from "./collisions.js";
import {soundTrack} from './loaders.js';
const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Settings.SCREEN_HEIGHT = canvas.height;
Settings.SCREEN_WIDTH= canvas.width;

Promise.all([loadImage('img/backgrounds.png'),
    loadImage('img/hookRope.png'),
    loadImage('img/hookChain.png'),
    loadImage('img/sprites.png'),
    loadLevel('1')])
    .then(([backgrounds,hookRopeImage,hookChainImage,playerImage, levelSpec])=>{
        const drawBackground = loadBackground(backgrounds);
        const hooks = new Set();
        const hookManager = loadHookManager(hookRopeImage, hookChainImage, hooks);
        const buster = loadBuster(playerImage, levelSpec.player);
        buster.setHookManager(hookManager);
        var balls = loadBalls(levelSpec.balls);
        let deltaTime = 0;
        let lastTime = 0;
        function update(time) {
            deltaTime = time - lastTime;
            drawBackground(context);
            //context.clearRect(0, 0, canvas.width, canvas.height);
            buster.draw(context);
            buster.update(deltaTime/1000);
            balls.forEach(bola=>{
                bola.draw(context);
                bola.update(deltaTime/1000);
            });
            hooks.forEach(hook=>{
                hook.draw(context);
                hook.update(deltaTime/1000);
            });
            const collisionManager = new CollisionManager(hooks, balls,buster);
            collisionManager.checkCollisions();
            collisionManager.mataBuster();
            const win = new Howl({
                src: ['./audio/win.mp3' ]
            });
            console.log(balls);
            if(balls.size==0){
                soundTrack.pause();
                win.play();
                balls = loadBalls(levelSpec.balls);
            }
            lastTime = time;
            requestAnimationFrame(update);

        }
        const input = setupKeyboard(buster);
        input.listenTo(window);
        update(0);

    });