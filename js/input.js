import Keyboard from "./Keyboard.js";

export function setupKeyboard(buster){
    const input = new Keyboard();
    input.addMapping('Space', (keyState) => {
        console.log("space");
    });
    input.addMapping('ArrowUp', (keyState) => {
        console.log("ArrowUp");
    });
    input.addMapping('ArrowDown', (keyState) => {
        console.log("ArrowDown");
    });
    input.addMapping('ArrowRight', (keyState) => {
        console.log("Derecha");
        buster.direction.x+=1;
    });
    input.addMapping('ArrowLeft', (keyState) => {
        console.log("Izquierda");
        buster.direction.x -=1;
    });
    return input;
}