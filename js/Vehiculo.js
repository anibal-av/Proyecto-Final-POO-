export class Vehiculo {
    #placas;
    #capacidadCarga;
    #kilometraje;

    constructor(placas, capacidadCarga, kilometraje) {
        this.placas = placas;
        this.capacidadCarga = capacidadCarga;
        this.kilometraje = kilometraje;
    }

    get placas(){
        return this.#placas;
    }

    set placas(nuevasPlacas){
        if (nuevasPlacas == "" || nuevasPlacas == null){
            console.log("Error. Las placas estan vacías");
        }else{
            this.#placas = nuevasPlacas;
        }
    }

    get capacidadCarga(){
        return this.#capacidadCarga;
    }

    set capacidadCarga(nuevaCapacidad){
        if (nuevaCapacidad <= 0){
            console.log("Error: La capacidad de carga debe ser mayor a 0");
        }else{
            this.#capacidadCarga = nuevaCapacidad;
        }
    }

    get kilometraje(){
        return this.#kilometraje;
    }

    set kilometraje(nuevoKilometraje){
        if (nuevoKilometraje < 0) {
            console.log("Error: El kilometraje no puede ser negativo");
        } else 
            this.#kilometraje = nuevoKilometraje;
        }
    }
}