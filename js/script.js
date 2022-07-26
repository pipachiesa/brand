function Producto(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

const producto1 = new Producto('green hoodie one', 'Green Hoodie One', 50, 20)
const producto2 = new Producto('green hoodie two', 'Green Hoodie Two', 20, 5)
const producto3 = new Producto('black hoodie three', 'Black Hoodie Three', 35, 10)
const producto4 = new Producto('blue hoodie four', 'Blue Hoodie Four', 60, 25)
const producto5 = new Producto('red hoodie five', 'Red Hoodie Five', 45, 15)

let listaProductos = [producto1, producto2, producto3, producto4, producto5]

let preciototal = 0

let cupon = "CODER"

let nombresProductos = listaProductos.map((producto) => producto.nombre)

let idProductos = listaProductos.map((producto) => producto.id)

let cantidadcompras = prompt("Cuantos productos distintos desea comprar? \n- " + nombresProductos.join('\n- '))

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

    const resultado = listaProductos.filter((producto) => producto.id.includes(buzo.toLowerCase()))

    const nombresResultado = resultado.map((producto) => producto.nombre)

    let busqueda = ''

    if(resultado.length > 1 || (resultado.length === 1 && buzo.toLowerCase() !== resultado[0].id)) {
    
    busqueda = prompt('Estos productos coinciden con tu busqueda: \n- ' + (nombresResultado.join('\n- ')))

    }

    let cantidad = prompt("Cuantos productos desea comprar?")

    if((buzo.toLowerCase() === producto1.nombre.toLowerCase()) || (busqueda.toLowerCase() === producto1.nombre.toLowerCase())) {
        calculostock(cantidad, producto1)
    }
    else if((buzo.toLowerCase() === producto2.nombre.toLowerCase()) || (busqueda.toLowerCase() === producto2.nombre.toLowerCase())) {
        calculostock(cantidad, producto2)
    }
    else if((buzo.toLowerCase() === producto3.nombre.toLowerCase()) || (busqueda.toLowerCase() === producto3.nombre.toLowerCase())) {
        calculostock(cantidad, producto3)
    }
    else if((buzo.toLowerCase() === producto4.nombre.toLowerCase()) || (busqueda.toLowerCase() === producto4.nombre.toLowerCase())) {
        calculostock(cantidad, producto4)
    }
    else if((buzo.toLowerCase() === producto5.nombre.toLowerCase()) || (busqueda.toLowerCase() === producto5.nombre.toLowerCase())) {
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

alert('Nro de ticket: ' + (Math.random()))