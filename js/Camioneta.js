<<<<<<< HEAD
//Camioneta.js
import { Vehiculo } from './Vehiculo.js'

export class Camioneta extends Vehiculo{
  #costoGasolina

  constructor(placas, capacidadCarga, kilometraje, costoGasolina){
    super(placas, capacidadCarga, kilometraje)
    this.costoGasolina = costoGasolina
  }
  
  get costoGasolina(){
    return this.#costoGasolina
  }
  
  set costoGasolina(nuevoCosto){
    if(nuevoCosto <= 0){
      console.log("Error: El costo de gasolina debe ser mayor a 0")
    }else{
      this.#costoGasolina = nuevoCosto
    }
  }
  
  calcularCostoViaje(km){
    if (km <= 0){
      console.log("Error: Los kilómetros deben ser mayores a 0")
      return 0
    }else{
      return km * this.#costoGasolina;
    }
  }
}
=======
//Camioneta.js
import { Vehiculo } from './Vehiculo.js';

export class Camioneta extends Vehiculo{
    #rendimientoGasolina
    #precioGasolina

    constructor(placas, capacidadCarga, kilometraje, rendimientoGasolina, precioGasolina){
        super(placas, capacidadCarga, kilometraje)
        this.rendimientoGasolina = rendimientoGasolina
        this.precioGasolina = precioGasolina
    }

    get rendimientoGasolina(){
        return this.#rendimientoGasolina
    }

    set rendimientoGasolina(nuevoRendimiento){
        if (nuevoRendimiento <= 0){
            console.log("Error: El rendimiento debe ser mayor a 0")
        } else {
            this.#rendimientoGasolina = nuevoRendimiento
        }
    }

    get precioGasolina(){
        return this.#precioGasolina
    }

    set precioGasolina(nuevoPrecio){
        if (nuevoPrecio <= 0){
            console.log("Error: El precio de la gasolina debe ser mayor a 0")
        } else {
            this.#precioGasolina = nuevoPrecio
        }
    }

    calcularCostoViaje(km){
        if (km <= 0){
            console.log("Error: La distancia debe ser mayor a 0")
            return 0
        } else {
            let litrosConsumidos = km / this.#rendimientoGasolina
            return litrosConsumidos * this.#precioGasolina
        }
    }
}
>>>>>>> 37cf9abd2b8e749504d9f5f44d14b9edd98ac4ab
