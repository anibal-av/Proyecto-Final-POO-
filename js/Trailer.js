import { Vehiculo } from './Vehiculo.js';

export class Trailer extends Vehiculo {
    #rendimientoDiesel;
    #precioDiesel;
    #peso;

    constructor(placas, capacidadCarga, kilometraje, rendimientoDiesel, precioDiesel, peso) {
        super(placas, capacidadCarga, kilometraje);
        this.rendimientoDiesel = rendimientoDiesel;
        this.precioDiesel = precioDiesel;
        this.peso = peso;
    }

    get rendimientoDiesel() {
        return this.#rendimientoDiesel;
    }

    set rendimientoDiesel(nuevoRendimiento) {
        if (nuevoRendimiento <= 0) {
            console.log("Error: El rendimiento debe ser mayor a 0");
        } else {
            this.#rendimientoDiesel = nuevoRendimiento;
        }
    }

    get precioDiesel() {
        return this.#precioDiesel;
    }

    set precioDiesel(nuevoPrecio) {
        if (nuevoPrecio <= 0) {
            console.log("Error: El precio del diésel debe ser mayor a 0");
        } else {
            this.#precioDiesel = nuevoPrecio;
        }
    }

    get peso() {
        return this.#peso;
    }

    set peso(nuevoPeso) {
        if (nuevoPeso < 0) {
            console.log("Error: El peso no puede ser negativo");
        } else {
            this.#peso = nuevoPeso;
        }
    }

    calcularCostoViaje(km) {
        if (km <= 0) {
            console.log("Error: La distancia debe ser mayor a 0");
            return 0;
        } else {
            let litrosConsumidos = km / this.#rendimientoDiesel;
            let cuotaExtraPeso = this.#peso * 0.5;
            return (litrosConsumidos * this.#precioDiesel) + cuotaExtraPeso;
        }
    }
}
