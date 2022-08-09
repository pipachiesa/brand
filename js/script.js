let preciototal = 0

let cupon = "CODER"

const tienda = document.getElementById('tienda')

const carritoCompra = document.getElementById('carrito')

let carrito = []

let compraFinalizada = false

function Producto(id, name, price, stock, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.image = image;
}

let listaProductos = [
    new Producto(1, 'Pink Hoodie One', 50, 20, "./multimedia/imagenes/hoodie 2.jpg"), 
    new Producto(2, 'Green Hoodie Two', 20, 5, "./multimedia/imagenes/hoodie 3.jpeg"), 
    new Producto(3, 'Orange Hoodie Three', 35, 10, "./multimedia/imagenes/151-fbbfb36c77118f8ca516387096049002-480-0.jpg"), 
    new Producto(4, 'White Hoodie Four', 60, 25, "./multimedia/imagenes/buzo-311-eb31f9107f1bdb8fef16433181181071-480-0.jpg"), 
    new Producto(5, 'White Hoodie Five', 45, 15, "./multimedia/imagenes/buzo-1011-7917b6b641fb4db03616433168665966-640-0.jpg")
]

let nombresProductos = listaProductos.map((product) => product.nombre)

let idProductos = listaProductos.map((product) => product.id)

const carritoDeCompras = () => {
    let iconCarrito = document.createElement('div')
    iconCarrito.innerHTML = 

    carrito.appendChild(carrito)
}

const visualizarProductos = () => {
    tienda.innerHTML = ''

    listaProductos.forEach((product, index) => {
        let cards = document.createElement('div')
        cards.innerHTML = 
    `<main class="mt-5 mb-5 shop-container">
        <section class="shop d-flex justify-content-around">
            <div class="card animation" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="Hoodies">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <button href="#" class="btn btn-dark" onClick="agregarAlCarrito(${index})">$${product.price}</button>
                    </div>
            </div>
        </section>
    </main>`
        

        tienda.appendChild(cards)
                        }
)   
}

mayor.onclick = () =>{
    listaProductos = sortArray(listaProductos, 'price')
    visualizarProductos()
}

menor.onclick = () =>{
    listaProductos = sortArray(listaProductos, 'price', 'desc')
    visualizarProductos()
}

const sortArray = (array, column, direction = 'asc') => {
    if (direction === 'asc') {
        array.sort((a, b) => parseFloat(a[column]) - parseFloat(b[column]))
    } else {
        array.sort((a, b) => parseFloat(b[column]) - parseFloat(a[column]))
    }

    return array
}

const arrayOrdenado = sortArray(listaProductos, 'price', 'desc')

const agregarAlCarrito = (index) => {
    const indiceProducto = carrito.findIndex(({id}) => {
        return id === listaProductos[index].id
    });

    if (indiceProducto > -1) {
        carrito[indiceProducto].cantidad += 1
        actualizarStorage(carrito);
        imprimirCarrito();
    } 
    else {
        const agregarProducto = listaProductos[index];
        agregarProducto.cantidad = 1;
        carrito.push(agregarProducto);
        actualizarStorage(carrito);
        imprimirCarrito();
    }
}

const finalizarCompra = () => {
    localStorage.removeItem('carrito')
    compraFinalizada = true
    imprimirCarrito()
}



const imprimirCarrito = () => {
    let total = 0;
    carritoCompra.innerHTML = "";
    carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];

    const footer = document.getElementById("modal-footer");
    const footerContent =  `<button type="button" class="btn btn-danger" onClick="vaciarCarrito()">Vaciar Carrito</button>`;
    const footerContentLeft = carrito.length ?  `<button type="button" class="btn btn-dark" onClick=finalizarCompra()>Comprar</button>` : '';
    
    
    if (carrito.length > 0) {
        carrito.forEach((product, index) => {
            total = total + product.price * product.cantidad;
            const listaCarrito = document.createElement("div");
            listaCarrito.className = "text-center";
            listaCarrito.innerHTML = 
            `<div class="row">
                <table>
                    <td>
                        <div class=" d-flex align-items-center">
                            <div class="px-3 pb-3"><a><img src="${product.image}" alt="${product.name}" width="48"></a></div>
                            <div class="d-sm-flex"></div>
                            <div class="align-middle px-sm-5"><h2 class="lead my-1">${product.name}</h2></div>
                            <div class="align-middle">Cant. ${product.cantidad}</div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="px-4"><h2 class="lead my-1">$${product.price}</h2></div>
                            <div class="">
                                <span>
                                    <div class="p-2"> <a onClick="removeProduct(${index})"><i class="fa-solid fa-trash-can"></i></a></div>
                                </span>
                            </div>
                        </div>
                    </td>
                </table>
            </div>`

            carritoCompra.appendChild(listaCarrito);
        });

const imprimirTotal = document.createElement("div");
        imprimirTotal.innerHTML = 
        `<div class="p-5"> TOTAL $${total.toFixed(2)}</div>`;

        carritoCompra.appendChild(imprimirTotal);
    } else if(!compraFinalizada) {
        carritoCompra.classList.remove("carrito")
        carritoCompra.innerHTML =
        `<div class="alert alert-light" role="alert">
        El carrito está vacío
        </div>`;
    } else {
        carritoCompra.classList.remove("carrito")
        carritoCompra.innerHTML =
        `<div class="alert alert-light" role="alert">
        La compra se ha realizado con exito!
        </div>`;
    }


    footer.innerHTML = `${footerContentLeft} ${footerContent}`;
};


const removeProduct = (index) => {
    carrito.splice (index, 1);
    actualizarStorage(carrito);
    imprimirCarrito();
}

const actualizarStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const calcularCantProductos = () => {
    return carrito.reduce((total, elemento) => total + elemento.cantidad, 0);
}

vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    imprimirCarrito()
};

visualizarProductos()
imprimirCarrito(); 

