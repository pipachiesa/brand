function Producto(id, nombre, precio, stock, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
}

const producto1 = new Producto('pink hoodie one', 'Pink Hoodie One', 50, 20, "./multimedia/imagenes/hoodie 2.jpg")
const producto2 = new Producto('green hoodie two', 'Green Hoodie Two', 20, 5, "./multimedia/imagenes/hoodie 3.jpeg")
const producto3 = new Producto('orange hoodie three', 'Orange Hoodie Three', 35, 10, "./multimedia/imagenes/151-fbbfb36c77118f8ca516387096049002-480-0.jpg")
const producto4 = new Producto('white hoodie four', 'White Hoodie Four', 60, 25, "./multimedia/imagenes/buzo-311-eb31f9107f1bdb8fef16433181181071-480-0.jpg")
const producto5 = new Producto('white hoodie five', 'White Hoodie Five', 45, 15, "./multimedia/imagenes/buzo-1011-7917b6b641fb4db03616433168665966-640-0.jpg")

const listaProductosGeneral = [producto1, producto2, producto3, producto4, producto5]

const listaProductos1 = [producto1, producto2, producto3]
const listaProductos2 = [producto4, producto5]

const seccion1 = document.getElementById('seccion1')
const seccion2 = document.getElementById('seccion2')

listaProductos1.forEach((producto) => {
        let cards1 = document.createElement("div")

        cards1.innerHTML = 
    `<main class="mt-5 mb-5 shop-container">
        <section class="shop d-flex justify-content-around">
            <div class="card animation" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="Hoodies">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <a href="#" class="btn btn-dark">$${producto.precio}</a>
                    </div>
            </div>
        </section>
    </main>`
        

        seccion1.appendChild(cards1)
                        }
)

listaProductos2.forEach((producto) => {
    let cards2 = document.createElement("div");

    cards2.innerHTML = 
`<main class="mt-5 mb-5 shop-container">
    <section class="shop d-flex justify-content-around">
        <div class="card animation" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="Hoodies">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <a href="#" class="btn btn-dark">$${producto.precio}</a>
                </div>
        </div>
    </section>
</main>`
    

    seccion2.appendChild(cards2)
                    }
)
let preciototal = 0

let cupon = "CODER"

let nombresProductos = listaProductosGeneral.map((producto) => producto.nombre)

let idProductos = listaProductosGeneral.map((producto) => producto.id)

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

    const resultado = listaProductosGeneral.filter((producto) => producto.id.includes(buzo.toLowerCase()))

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