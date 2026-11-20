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
