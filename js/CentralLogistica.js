<<<<<<< HEAD
import { Vehiculo } from './Vehiculo.js';

export class CentralLogistica {
    #vehiculos;
    constructor(){
        this.#vehiculos = []
    }

    agregarVehiculo(vehiculo){
        if(vehiculo instanceof Vehiculo) {
            this.#vehiculos.push({
                unidad: vehiculo,
                disponible: true
            });
            return "Vehículo registrado en la central.";
        }else{
            return "Error: El objeto no pertenece a la clase Vehiculo.";
        }
    }

    asignarViaje(placa, peso){
        for (let i = 0; i < this.#vehiculos.length; i++){
            let registro = this.#vehiculos[i];

            if (registro.unidad.placas == placa){
                if (registro.disponible == true && peso > 0 && peso <= registro.unidad.capacidadCarga){
                    registro.disponible = false;
                    return "Viaje asignado correctamente :)";
                } else{
                    return "Vehículo no disponible o el peso excede la capacidad.";
                }
            }
        }
        return "Vehículo no encontrado :/";
    }

    obtenerDisponibles(){
        let disponibles = []
        for (let i = 0; i < this.#vehiculos.length; i++){
            if (this.#vehiculos[i].disponible == true) {
                disponibles.push(this.#vehiculos[i].unidad);
            }
        }
        return disponibles;
    }
}
=======
import { Vehiculo } from './Vehiculo.js';

export class CentralLogistica {
    #vehiculos;
    constructor(){
        this.#vehiculos = []
    }

    agregarVehiculo(vehiculo){
        if(vehiculo instanceof Vehiculo) {
            this.#vehiculos.push({
                unidad: vehiculo,
                disponible: true
            });
            return "Vehículo registrado en la central.";
        }else{
            return "Error: El objeto no pertenece a la clase Vehiculo.";
        }
    }

    asignarViaje(placa, peso){
        for (let i = 0; i < this.#vehiculos.length; i++){
            let registro = this.#vehiculos[i];

            if (registro.unidad.placas == placa){
                if (registro.disponible == true && peso > 0 && peso <= registro.unidad.capacidadCarga){
                    registro.disponible = false;
                    return "Viaje asignado correctamente :)";
                } else{
                    return "Vehículo no disponible o el peso excede la capacidad.";
                }
            }
        }
        return "Vehículo no encontrado :/";
    }

    obtenerDisponibles(){
        let disponibles = []
        for (let i = 0; i < this.#vehiculos.length; i++){
            if (this.#vehiculos[i].disponible == true) {
                disponibles.push(this.#vehiculos[i].unidad);
            }
        }
        return disponibles;
    }
}
>>>>>>> 37cf9abd2b8e749504d9f5f44d14b9edd98ac4ab
