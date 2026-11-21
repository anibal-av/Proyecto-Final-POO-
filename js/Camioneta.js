import { Vehiculo } from './Vehiculo.js';

export class Camioneta extends Vehiculo {
    #rendimientoGasolina;
    #precioGasolina;

    constructor(placas, capacidadCarga, kilometraje, rendimientoGasolina, precioGasolina) {
        super(placas, capacidadCarga, kilometraje);
        this.rendimientoGasolina = rendimientoGasolina;
        this.precioGasolina = precioGasolina;
    }

    get rendimientoGasolina() {
        return this.#rendimientoGasolina;
    }

    set rendimientoGasolina(nuevoRendimiento) {
        if (nuevoRendimiento <= 0) {
            console.log("Error: El rendimiento debe ser mayor a 0");
        } else {
            this.#rendimientoGasolina = nuevoRendimiento;
        }
    }

    get precioGasolina() {
        return this.#precioGasolina;
    }

    set precioGasolina(nuevoPrecio) {
        if (nuevoPrecio <= 0) {
            console.log("Error: El precio de la gasolina debe ser mayor a 0");
        } else {
            this.#precioGasolina = nuevoPrecio;
        }
    }

    calcularCostoViaje(km) {
        if (km <= 0) {
            console.log("Error: La distancia debe ser mayor a 0");
            return 0;
        } else {
            let litrosConsumidos = km / this.#rendimientoGasolina;
            return litrosConsumidos * this.#precioGasolina;
        }
    }
}
