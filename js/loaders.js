import SpriteSheet from "./SpriteSheet.js";
import {Vec2D} from "./math.js";
import Player from "./Player.js";
import {Ball} from "./Ball.js";
import {Hook, HookType} from "./Hook.js";
import Settings from "./Settings.js";

export const soundTrack = new Howl({
    src: ['./audio/soundtrack.mp3' ]
});
export function loadLevel(currentLevel){
    return fetch(`levels/${currentLevel}.json`).then(r => r.json());
}
export function loadHookManager(hookRopeImage,hookChainImage, hooks){
    let hookImages = new Map();
    hookImages.set(HookType.rope,hookRopeImage);
    hookImages.set(HookType.chain,hookChainImage);
    const hookManager = function(x,y,hookType){
        if(hooks.size<Settings.MAX_HOOKS) {
            hooks.add(new Hook(y, new Vec2D(x,y),hookType,hookImages.get(hookType)));
        }
        return hooks;
    };
    return hookManager;
}
export function loadImage(url){
    return new Promise( resolve => {
        const image = new Image();
        image.addEventListener('load', () =>{
            resolve(image);
        });
        image.src = url;
    })
}
export function loadBackground(backgrounds) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 192;
    // recortar super-sprite y dejarlo preparado en un buffer
    const context = buffer.getContext("2d");
    context.drawImage(backgrounds, 0, 0,
        buffer.width, buffer.height,
        0, 0, buffer.width, buffer.height,);
    return function (ctx) {
        ctx.drawImage(buffer,
            0, 0,
            buffer.width, buffer.height,
            0, 0,
            Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT);
    }
}
export function loadBuster(image, playerSpec){
    const spriteSheet = new SpriteSheet(image, 32, 32);
    spriteSheet.define('idle', 0, 1);
    spriteSheet.define('buster', 3, 0);
    spriteSheet.define('buster-1', 1, 0);
    spriteSheet.define('buster-2', 0, 0);
    spriteSheet.define('buster-3', 2, 0);


    const pos = new Vec2D(playerSpec.pos[0],playerSpec.pos[1]);
    const size = new Vec2D(32,32);
    soundTrack.play();
    return new Player(size, pos, spriteSheet);
}

export function loadBalls(ballSpec){
    var bolas= new Set();
    for(var i=0; i<ballSpec.length; i++){
        bolas.add(new Ball(ballSpec[i].radius, new Vec2D(ballSpec[i].pos[0],ballSpec[i].pos[1]), new Vec2D(ballSpec[i].force[0],ballSpec[i].force[1])));
    }
    return bolas;
}