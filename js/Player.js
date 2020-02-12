import {Object2D, Vec2D} from "./math.js";
import Settings from "./Settings.js";

export default class Player extends Object2D {

    constructor(size, pos, spriteSheet) {
        super(size, pos);
        this.force = new Vec2D(0, 0);
        this.spriteSheet = spriteSheet;
        this.direction = new Vec2D(1,0);
    }

    // time respresenta el tiempo que ha pasado desde la última ejecución
    update(time) {
        
        /*
        Asume por el momento que Settings.SCREEN_HEIGHT y Settings.SCREEN_WIDTH indican el tamaño de
        la pantalla del juego. Settings tiene otras constantes definidas (échales un vistazo)
        El objeto player tiene una altura (height) y una anchura (width)
         */


        // si buster está cayendo (está por debajo de la altura de la pantalla)
        // fuerza = añadir fuerza vertical de gravedad * tiempo
        // position = añadir fuerza * tiempo al eje y

        // position = añadir dirección * tiempo * velocidad del jugador al eje x


        // si buster se sale por la izquierda de la pantalla
        // position = 0,y

        // sino, si buster se sale por la derecha
        // position =  lo más a la derecha sin salirse , y


        // si buster se sale por la parte inferior de la pantalla
        // position = x, lo más abajo sin salirse

    }

    draw(context) {
        // pintar this.sprite en el contexto (en posicion x,y)
    }
}