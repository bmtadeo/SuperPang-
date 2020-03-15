import Settings from "./Settings.js";
import {setupKeyboard} from "./input.js";
import {loadBalls, loadBuster, loadImage, loadLevel} from "./loaders.js";
const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

Settings.SCREEN_HEIGHT = canvas.height;
Settings.SCREEN_WIDTH= canvas.width;

Promise.all([loadImage('img/sprites.png'),loadLevel('1')])
    .then(([imageSprites, levelSpec])=>{
        const buster = loadBuster(imageSprites, levelSpec.player);
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
                balls[i].update(deltaTime);
            }

            lastTime = time;
            requestAnimationFrame(update);
        }
        const input = setupKeyboard(buster);
        input.listenTo(window);

        update(0);
    });