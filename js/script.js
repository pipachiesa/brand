function Producto(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

const producto1 = new Producto('Hoodie One', 50, 20)
const producto2 = new Producto('Hoodie Two', 20, 5)
const producto3 = new Producto('Hoodie Three', 35, 10)
const producto4 = new Producto('Hoodie Four', 60, 25)
const producto5 = new Producto('Hoodie Five', 45, 15)

let listaProductos = [producto1, producto2, producto3, producto4, producto5]

let preciototal = 0

let cupon = "CODER"

let nombresProductos = []

function listarproductos(){
    for(const producto of listaProductos) {
        nombresProductos.push(producto.nombre)
    }
    }
    listarproductos()

let cantidadcompras = prompt("Cuantos productos desea comprar? \n- " + nombresProductos.join('\n- '))

if(cantidadcompras > 5) {
    alert("Solo disponemos de 5 productos diferentes")
}

function calculoprecio(cantidad, precio) {

    preciototal += cantidad * precio
}

function descuento(calculoprecio) {
    return calculoprecio * 0.90
}

function calculostock(cantidad, producto) {
    if(cantidad <= producto.stock) {
        calculoprecio(cantidad, producto.precio)
        alert("El precio es de: $" + (cantidad * producto.precio))
    }
    else {
        alert("No disponemos de ese stock")
    }
}

for(let i = 0 ; i < cantidadcompras ; i++) {

    let buzo = prompt("Que producto/s desea comprar? \n- " + nombresProductos.join('\n- '))
    let cantidad = prompt("Cuantos productos desea comprar?")

    if(buzo === producto1.nombre) {
        calculostock(cantidad, producto1)
    }
    else if(buzo === producto2.nombre) {
        calculostock(cantidad, producto2)
    }
    else if(buzo === producto3.nombre) {
        calculostock(cantidad, producto3)
    }
    else if(buzo === producto4.nombre) {
        calculostock(cantidad, producto4)
    }
    else if(buzo === producto5.nombre) {
        calculostock(cantidad, producto5)
    }
    else {
        alert("No disponemos de ese producto")
    }
}
alert("El precio total es de $" + preciototal)

let ahorro = prompt("Introduzca un cupon de descuento")

if(ahorro === "CODER") {
alert("El precio total es de $" + descuento(preciototal))
}