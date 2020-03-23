import {Object2D, Vec2D} from "./math.js";
import Settings from "./Settings.js";
import {HookType} from "./Hook.js";

const frames = ['buster','buster-1','buster-2','buster-3'];
export default class Player extends Object2D {
    routeFrame(){
        if(this.direction.x!==0){
            const frameIndex=Math.floor(this.distance/10) % frames.length;
            const frameName = frames[frameIndex];
            return frameName;
        }
        return 'buster';
    }

    constructor(size, pos, spriteSheet) {
        super(size, pos);
        this.force = new Vec2D(0, 0);
        this.spriteSheet = spriteSheet;
        this.direction = new Vec2D(0, 0);
        this.distance =0;
        this.hookManager = null;
    }

    // time respresenta el tiempo que ha pasado desde la última ejecución
    update(time) {
        if (this.direction.x!=0){
            this.distance += time * Settings.PLAYER_SPEED;
        }else{
            this.distance=0;
        }
        /*
        Asume por el momento que Settings.SCREEN_HEIGHT y Settings.SCREEN_WIDTH indican el tamaño de
        la pantalla del juego. Settings tiene otras constantes definidas (échales un vistazo)
        El objeto player tiene una altura (height) y una anchura (width)
         */
        // si buster está cayendo (está por debajo de la altura de la pantalla)
        if (this.y < Settings.SCREEN_HEIGHT - this.height) {
            // fuerza = añadir fuerza vertical de gravedad * tiempo
            // position = añadir fuerza * tiempo al eje y
            // position = añadir dirección * tiempo * velocidad del jugador al eje x
            this.force.add([0, Settings.GRAVITY * time]);
            this.position.add([0, this.force.y * time]);
        }
        //FUERA DEL IF
        this.position.add([this.direction.x * time * Settings.PLAYER_SPEED, 0]);

        // si buster se sale por la izquierda de la pantalla
        if (this.x < 0) {
            //this.position.y = this.y;
            this.position = new Vec2D(0, this.y);
            // position = 0,y
        } else if (this.x > Settings.SCREEN_WIDTH - this.width) { //HAY QUE RESTAR EL WIDTH
            // sino, si buster se sale por la derecha
            // position =  lo más a la derecha sin salirse , y
            //this.position.x = Settings.SCREEN_WIDTH;
            this.position = new Vec2D(Settings.SCREEN_WIDTH - this.width, this.y);
        }
        // si buster se sale por la parte inferior de la pantalla
        if (this.y > Settings.SCREEN_HEIGHT - this.height) {
            //this.position.y = Settings.SCREEN_HEIGHT;
            this.position = new Vec2D(this.x, Settings.SCREEN_HEIGHT - this.height);
            // position = x, lo más abajo sin salirse
        }


    }

    draw(context) {
        context.drawImage(this.spriteSheet.get(this.routeFrame()), this.x, this.y);
        // pintar this.sprite en el contexto (en posicion x,y)
    }

    setHookManager(hookManager){
        this.hookManager = hookManager;
    }
    shoot(x,y) {

        //console.log(this.hookManager);
        this.hookManager(x, y,HookType.rope);
    }

}