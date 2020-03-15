import SpriteSheet from "./SpriteSheet.js";
import {Vec2D} from "./math.js";
import Player from "./Player.js";
import {Ball} from "./Ball.js";

export function loadLevel(currentLevel){
    return fetch(`levels/${currentLevel}.json`).then(r => r.json());
}
export function loadImage(url){
    return new Promise( resolve => {
        const image = new Image();
        image.addEventListener('load', () =>{
            resolve(image);
        })
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
        bolas.push(new Ball(ballSpec[i].radius, ballSpec[i].pos,ballSpec[i].force));
    }
    return bolas;
}