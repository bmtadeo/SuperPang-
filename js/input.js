import Keyboard from "./Keyboard.js";

export function setupKeyboard(buster){
    const input = new Keyboard();
    input.addMapping('Space', (keyState) => {
        if(keyState){
            buster.shoot(buster.x,buster.y);
        }
        var sound = new Howl({
            src: ['./audio/shoot.mp3' ]
        }).play();

        console.log("Disparo");
    });
    input.addMapping('ArrowUp', (keyState) => {
        console.log("ArrowUp");
    });
    input.addMapping('ArrowDown', (keyState) => {
        console.log("ArrowDown");
    });
    input.addMapping('ArrowRight', (keyState) => {
        console.log("Derecha");
        if(keyState){
            buster.direction.x+=1;
        }else{
            buster.direction.x=0;
        }

    });
    input.addMapping('ArrowLeft', (keyState) => {
        console.log("Izquierda");
        if(keyState){
            buster.direction.x-=1;
        }else{
            buster.direction.x=0;
        }
    });
    return input;
}