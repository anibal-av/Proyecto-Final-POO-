<<<<<<< HEAD
import { Camioneta } from './Camioneta.js';
import { Trailer } from './Trailer.js';
import { CentralLogistica } from './CentralLogistica.js';

const central = new CentralLogistica();

function cargarDatosIniciales() {
let datosGuardados = localStorage.getItem("flotilla_central");

if (datosGuardados != null) {
let lista = JSON.parse(datosGuardados);

for (let i = 0; i < lista.length; i++) {
let item = lista[i];
let vehiculo;

if (item.tipo == "camioneta") {
vehiculo = new Camioneta(
item.placas,
item.capacidadCarga,
item.kilometraje,
item.rendimientoGasolina,
item.precioGasolina
);
} else if (item.tipo == "trailer") {
vehiculo = new Trailer(
item.placas,
item.capacidadCarga,
item.kilometraje,
item.rendimientoDiesel,
item.precioDiesel,
item.peso
);
}

if (vehiculo != null) {
central.agregarVehiculo(vehiculo);
if (item.disponible == false) {
central.asignarViaje(item.placas, 1);
}
}
}
}
}

function guardarEnStorage(listaNueva) {
localStorage.setItem("flotilla_central", JSON.stringify(listaNueva));
}

function obtenerListaStorage() {
let datos = localStorage.getItem("flotilla_central");
if (datos == null) {
return [];
} else {
return JSON.parse(datos);
}
}

function actualizarSelectVehiculos(selectElemento) {
if (selectElemento == null) {
return;
}

selectElemento.innerHTML = "";
let disponibles = central.obtenerDisponibles();

if (disponibles.length == 0) {
let option = document.createElement("option");
option.value = "";
option.textContent = "No hay vehículos disponibles";
selectElemento.appendChild(option);
return;
}

for (let i = 0; i < disponibles.length; i++) {
let v = disponibles[i];
let option = document.createElement("option");
option.value = v.placas;
let tipoTexto = v instanceof Camioneta ? "Camioneta" : "Tráiler";
option.textContent = v.placas + " - " + tipoTexto + " (Cap: " + v.capacidadCarga + " kg)";
selectElemento.appendChild(option);
}
}

function renderizarTablaDisponibles(tbody) {
if (tbody == null) {
return;
}

tbody.innerHTML = "";
let disponibles = central.obtenerDisponibles();

for (let i = 0; i < disponibles.length; i++) {
let v = disponibles[i];
let fila = document.createElement("tr");
let tipoTexto = v instanceof Camioneta ? "Camioneta de Reparto" : "Tráiler de Carga";

fila.innerHTML =
"<td>" + v.placas + "</td>" +
"<td>" + tipoTexto + "</td>" +
"<td>" + v.capacidadCarga + " kg</td>" +
"<td>" + v.kilometraje + " km</td>" +
"<td>Disponible</td>";

tbody.appendChild(fila);
}
}

cargarDatosIniciales();

const formRegistro = document.getElementById("form-registro");
const selectTipo = document.getElementById("tipo-vehiculo");
const grupoPesoTrailer = document.getElementById("grupo-peso-trailer");
const mensajeRegistro = document.getElementById("mensaje-registro");
const tablaRegistrados = document.getElementById("tabla-unidades");

if (selectTipo != null) {
selectTipo.addEventListener("change", function () {
if (selectTipo.value == "trailer") {
grupoPesoTrailer.style.display = "block";
} else {
grupoPesoTrailer.style.display = "none";
}
});
}

if (formRegistro != null) {
renderizarTablaDisponibles(tablaRegistrados);

formRegistro.addEventListener("submit", function (evento) {
evento.preventDefault();

let tipo = document.getElementById("tipo-vehiculo").value;
let placas = document.getElementById("placas").value;
let capacidad = parseFloat(document.getElementById("capacidad").value);
let kilometraje = parseFloat(document.getElementById("kilometraje").value);
let rendimiento = parseFloat(document.getElementById("rendimiento").value);
let precioCombustible = parseFloat(document.getElementById("precio-combustible").value);

if (placas == "" || capacidad <= 0 || kilometraje < 0 || rendimiento <= 0 || precioCombustible <= 0) {
mensajeRegistro.textContent = "Error: Verifica que los datos sean válidos y no negativos.";
return;
}

let nuevoVehiculo;
let listaStorage = obtenerListaStorage();

if (tipo == "camioneta") {
nuevoVehiculo = new Camioneta(placas, capacidad, kilometraje, rendimiento, precioCombustible);
listaStorage.push({
tipo: "camioneta",
placas: placas,
capacidadCarga: capacidad,
kilometraje: kilometraje,
rendimientoGasolina: rendimiento,
precioGasolina: precioCombustible,
disponible: true
});
} else {
let peso = parseFloat(document.getElementById("peso-trailer").value);
if (peso < 0) {
mensajeRegistro.textContent = "Error: El peso extra del tráiler no puede ser negativo.";
return;
}
nuevoVehiculo = new Trailer(placas, capacidad, kilometraje, rendimiento, precioCombustible, peso);
listaStorage.push({
tipo: "trailer",
placas: placas,
capacidadCarga: capacidad,
kilometraje: kilometraje,
rendimientoDiesel: rendimiento,
precioDiesel: precioCombustible,
peso: peso,
disponible: true
});
}

let respuesta = central.agregarVehiculo(nuevoVehiculo);
guardarEnStorage(listaStorage);
mensajeRegistro.textContent = respuesta;
formRegistro.reset();
renderizarTablaDisponibles(tablaRegistrados);
});
}


const formCalculo = document.getElementById("form-calculo");
const selectUnidadRuta = document.getElementById("select-unidad-ruta");
const resultadoCosto = document.getElementById("resultado-costo");

if (formCalculo != null) {
actualizarSelectVehiculos(selectUnidadRuta);

formCalculo.addEventListener("submit", function (evento) {
evento.preventDefault();

let placaSeleccionada = selectUnidadRuta.value;
let distancia = parseFloat(document.getElementById("distancia-km").value);

if (placaSeleccionada == "" || distancia <= 0) {
resultadoCosto.textContent = "Selecciona una unidad válida e ingresa una distancia mayor a 0.";
return;
}

let disponibles = central.obtenerDisponibles();
for (let i = 0; i < disponibles.length; i++) {
if (disponibles[i].placas == placaSeleccionada) {
let costoTotal = disponibles[i].calcularCostoViaje(distancia);
resultadoCosto.textContent = "Costo operativo estimado para " + distancia + " km: $" + costoTotal.toFixed(2);
break;
}
}
});
}

const formDespacho = document.getElementById("form-despacho");
const selectUnidadDespacho = document.getElementById("select-unidad-despacho");
const mensajeDespacho = document.getElementById("mensaje-despacho");
const tablaDisponibles = document.getElementById("tabla-disponibles");

if (formDespacho != null) {
actualizarSelectVehiculos(selectUnidadDespacho);
renderizarTablaDisponibles(tablaDisponibles);

formDespacho.addEventListener("submit", function (evento) {
evento.preventDefault();

let placa = selectUnidadDespacho.value;
let pesoCarga = parseFloat(document.getElementById("peso-carga").value);

if (placa == "") {
mensajeDespacho.textContent = "No hay vehículos seleccionados.";
return;
}

let resultado = central.asignarViaje(placa, pesoCarga);
mensajeDespacho.textContent = resultado;

if (resultado == "Viaje asignado correctamente.") {
let listaStorage = obtenerListaStorage();
for (let i = 0; i < listaStorage.length; i++) {
if (listaStorage[i].placas == placa) {
listaStorage[i].disponible = false;
}
}
guardarEnStorage(listaStorage);
actualizarSelectVehiculos(selectUnidadDespacho);
renderizarTablaDisponibles(tablaDisponibles);
formDespacho.reset();
}
});
}
=======
import { Camioneta } from './Camioneta.js';
import { Trailer } from './Trailer.js';
import { CentralLogistica } from './CentralLogistica.js';

const central = new CentralLogistica();

function cargarDatosIniciales() {
let datosGuardados = localStorage.getItem("flotilla_central");

if (datosGuardados != null) {
let lista = JSON.parse(datosGuardados);

for (let i = 0; i < lista.length; i++) {
let item = lista[i];
let vehiculo;

if (item.tipo == "camioneta") {
vehiculo = new Camioneta(
item.placas,
item.capacidadCarga,
item.kilometraje,
item.rendimientoGasolina,
item.precioGasolina
);
} else if (item.tipo == "trailer") {
vehiculo = new Trailer(
item.placas,
item.capacidadCarga,
item.kilometraje,
item.rendimientoDiesel,
item.precioDiesel,
item.peso
);
}

if (vehiculo != null) {
central.agregarVehiculo(vehiculo);
if (item.disponible == false) {
central.asignarViaje(item.placas, 1);
}
}
}
}
}

function guardarEnStorage(listaNueva) {
localStorage.setItem("flotilla_central", JSON.stringify(listaNueva));
}

function obtenerListaStorage() {
let datos = localStorage.getItem("flotilla_central");
if (datos == null) {
return [];
} else {
return JSON.parse(datos);
}
}

function actualizarSelectVehiculos(selectElemento) {
if (selectElemento == null) {
return;
}

selectElemento.innerHTML = "";
let disponibles = central.obtenerDisponibles();

if (disponibles.length == 0) {
let option = document.createElement("option");
option.value = "";
option.textContent = "No hay vehículos disponibles";
selectElemento.appendChild(option);
return;
}

for (let i = 0; i < disponibles.length; i++) {
let v = disponibles[i];
let option = document.createElement("option");
option.value = v.placas;
let tipoTexto = v instanceof Camioneta ? "Camioneta" : "Tráiler";
option.textContent = v.placas + " - " + tipoTexto + " (Cap: " + v.capacidadCarga + " kg)";
selectElemento.appendChild(option);
}
}

function renderizarTablaDisponibles(tbody) {
if (tbody == null) {
return;
}

tbody.innerHTML = "";
let disponibles = central.obtenerDisponibles();

for (let i = 0; i < disponibles.length; i++) {
let v = disponibles[i];
let fila = document.createElement("tr");
let tipoTexto = v instanceof Camioneta ? "Camioneta de Reparto" : "Tráiler de Carga";

fila.innerHTML =
"<td>" + v.placas + "</td>" +
"<td>" + tipoTexto + "</td>" +
"<td>" + v.capacidadCarga + " kg</td>" +
"<td>" + v.kilometraje + " km</td>" +
"<td>Disponible</td>";

tbody.appendChild(fila);
}
}

cargarDatosIniciales();

const formRegistro = document.getElementById("form-registro");
const selectTipo = document.getElementById("tipo-vehiculo");
const grupoPesoTrailer = document.getElementById("grupo-peso-trailer");
const mensajeRegistro = document.getElementById("mensaje-registro");
const tablaRegistrados = document.getElementById("tabla-unidades");

if (selectTipo != null) {
selectTipo.addEventListener("change", function () {
if (selectTipo.value == "trailer") {
grupoPesoTrailer.style.display = "block";
} else {
grupoPesoTrailer.style.display = "none";
}
});
}

if (formRegistro != null) {
renderizarTablaDisponibles(tablaRegistrados);

formRegistro.addEventListener("submit", function (evento) {
evento.preventDefault();

let tipo = document.getElementById("tipo-vehiculo").value;
let placas = document.getElementById("placas").value;
let capacidad = parseFloat(document.getElementById("capacidad").value);
let kilometraje = parseFloat(document.getElementById("kilometraje").value);
let rendimiento = parseFloat(document.getElementById("rendimiento").value);
let precioCombustible = parseFloat(document.getElementById("precio-combustible").value);

if (placas == "" || capacidad <= 0 || kilometraje < 0 || rendimiento <= 0 || precioCombustible <= 0) {
mensajeRegistro.textContent = "Error: Verifica que los datos sean válidos y no negativos.";
return;
}

let nuevoVehiculo;
let listaStorage = obtenerListaStorage();

if (tipo == "camioneta") {
nuevoVehiculo = new Camioneta(placas, capacidad, kilometraje, rendimiento, precioCombustible);
listaStorage.push({
tipo: "camioneta",
placas: placas,
capacidadCarga: capacidad,
kilometraje: kilometraje,
rendimientoGasolina: rendimiento,
precioGasolina: precioCombustible,
disponible: true
});
} else {
let peso = parseFloat(document.getElementById("peso-trailer").value);
if (peso < 0) {
mensajeRegistro.textContent = "Error: El peso extra del tráiler no puede ser negativo.";
return;
}
nuevoVehiculo = new Trailer(placas, capacidad, kilometraje, rendimiento, precioCombustible, peso);
listaStorage.push({
tipo: "trailer",
placas: placas,
capacidadCarga: capacidad,
kilometraje: kilometraje,
rendimientoDiesel: rendimiento,
precioDiesel: precioCombustible,
peso: peso,
disponible: true
});
}

let respuesta = central.agregarVehiculo(nuevoVehiculo);
guardarEnStorage(listaStorage);
mensajeRegistro.textContent = respuesta;
formRegistro.reset();
renderizarTablaDisponibles(tablaRegistrados);
});
}


const formCalculo = document.getElementById("form-calculo");
const selectUnidadRuta = document.getElementById("select-unidad-ruta");
const resultadoCosto = document.getElementById("resultado-costo");

if (formCalculo != null) {
actualizarSelectVehiculos(selectUnidadRuta);

formCalculo.addEventListener("submit", function (evento) {
evento.preventDefault();

let placaSeleccionada = selectUnidadRuta.value;
let distancia = parseFloat(document.getElementById("distancia-km").value);

if (placaSeleccionada == "" || distancia <= 0) {
resultadoCosto.textContent = "Selecciona una unidad válida e ingresa una distancia mayor a 0.";
return;
}

let disponibles = central.obtenerDisponibles();
for (let i = 0; i < disponibles.length; i++) {
if (disponibles[i].placas == placaSeleccionada) {
let costoTotal = disponibles[i].calcularCostoViaje(distancia);
resultadoCosto.textContent = "Costo operativo estimado para " + distancia + " km: $" + costoTotal.toFixed(2);
break;
}
}
});
}

const formDespacho = document.getElementById("form-despacho");
const selectUnidadDespacho = document.getElementById("select-unidad-despacho");
const mensajeDespacho = document.getElementById("mensaje-despacho");
const tablaDisponibles = document.getElementById("tabla-disponibles");

if (formDespacho != null) {
actualizarSelectVehiculos(selectUnidadDespacho);
renderizarTablaDisponibles(tablaDisponibles);

formDespacho.addEventListener("submit", function (evento) {
evento.preventDefault();

let placa = selectUnidadDespacho.value;
let pesoCarga = parseFloat(document.getElementById("peso-carga").value);

if (placa == "") {
mensajeDespacho.textContent = "No hay vehículos seleccionados.";
return;
}

let resultado = central.asignarViaje(placa, pesoCarga);
mensajeDespacho.textContent = resultado;

if (resultado == "Viaje asignado correctamente.") {
let listaStorage = obtenerListaStorage();
for (let i = 0; i < listaStorage.length; i++) {
if (listaStorage[i].placas == placa) {
listaStorage[i].disponible = false;
}
}
guardarEnStorage(listaStorage);
actualizarSelectVehiculos(selectUnidadDespacho);
renderizarTablaDisponibles(tablaDisponibles);
formDespacho.reset();
}
});
}
>>>>>>> 37cf9abd2b8e749504d9f5f44d14b9edd98ac4ab
