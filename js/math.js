export class Vec2D {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get(target, prop) {
        return this[prop] || 'MAGIC';
    }

    add(other) {
        // si other es una instancia de Vec2D
        if (other instanceof Vec2D) {
            //this.add(new Vec2D(other.x, other.y));
            this.x = this.x + other.x;
            this.y = this.y + other.y;
            // anyadir other a this como vector
            // si no,
        } else {
            // anyadir other a this como escalar
            //this.add();
            //console.log("error2");
            this.x =  this.x + other[0];
            this.y =  this.y + other[1];
        }
        return this;

        //
        // devolver this
    }

    _mul(other) {
        return new Vec2D(this.x * other,this.y * other );
        // devolver un nuevo vector igual a
        // this multiplicado por el escalar other
    }

    equals(other) {
        if (Vec2D.approx_equal(this, other, 0.1)==true){
            return true
        }else{
            return false
        }
        // devuelve true si this es aproximadamente igual a other (igual con una diferencia máxima de epsilon=0.1
    }

    static approx_equal(a, b, epsilon) {
        var diferenciaX = a.x -b.x;
        diferenciaX = Math.abs(diferenciaX);
        diferenciaX = Math.round(diferenciaX);
        var diferenciaY = a.y-b.y;
        diferenciaY = Math.abs(diferenciaY);
        diferenciaY = Math.round(diferenciaY);
        if(diferenciaX==epsilon && diferenciaY ==epsilon){
            return true;
        }else{
            return false;
        }
        // devuelve true si a aprox. igual a b
        // iguales salvo una diferencia absoluta
        // máxima de epsilon
    }
}

// clase Object2D. Representa un objeto 2D caracterizado por un vector size
// (diagonal del rectángulo que circunscribe el objeto) y una posición
// superior izquierda x,y.

export class Object2D {

    constructor(size, position) {
        this.size = size;
        this.position = position;
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    get width() {
        return this.size.x;
    }

    get height() {
        return this.size.y;
    }
}
