import SpriteSheet from "./SpriteSheet.js";
import {Vec2D} from "./math.js";
import Player from "./Player.js";
import {Ball} from "./Ball.js";
import {Hook, HookType} from "./Hook.js";

export function loadLevel(currentLevel){
    return fetch(`levels/${currentLevel}.json`).then(r => r.json());
}
export function loadHookManager(hookRopeImage, hooks){
    let hookImages = new Map();
    hookImages.set(HookType.rope,hookRopeImage);
    const hookManager = function(x,y,hookType){
        hooks.push(new Hook(y, new Vec2D(x,y),HookType.rope,hookImages.get(hookType)));
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
export function loadBuster(image, playerSpec){
    const spriteSheet = new SpriteSheet(image, 32, 32);
    spriteSheet.define('buster', 3, 0);
    spriteSheet.define('buster-1', 1, 0);
    spriteSheet.define('buster-2', 0, 0);
    spriteSheet.define('buster-3', 2, 0);


    const pos = new Vec2D(playerSpec.pos[0],playerSpec.pos[1]);
    const size = new Vec2D(32,32);

    return new Player(size, pos, spriteSheet);
}

export function loadBalls(ballSpec){
    var bolas= [];
    for(var i=0; i<ballSpec.length; i++){
        bolas.push(new Ball(ballSpec[i].radius, new Vec2D(ballSpec[i].pos[0],ballSpec[i].pos[1]), new Vec2D(ballSpec[i].force[0],ballSpec[i].force[1])));
    }
    return bolas;
}