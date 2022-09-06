let preciototal = 0

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

let listaProductos = []

let nombresProductos = listaProductos.map((product) => product.nombre)

let idProductos = listaProductos.map((product) => product.id)

const getProducts = async () => {
    const res = await fetch('./js/data.json');
    listaProductos = await res.json() 
    visualizarProductos(listaProductos);
}

const badgeCarrito = () => {
    const iconoCarrito = document.getElementById("iconoCarrito");
    const badge  = 
    `<button type="button" class="btn btn-dark position-relative" data-bs-toggle="modal" data-bs-target="#staticBackdrop">                      
        <a class="text-decoration-none" target="_blank">
            <i class="fa-solid fa-cart-shopping iconocarrito"></i>
        </a> 
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger zIndex">
            ${calcularCantProductos()}
            <span class="visually-hidden">unread messages</span>
        </span>
    </button>`

    iconoCarrito.innerHTML = badge
}

const visualizarProductos = () => {
    tienda.innerHTML = ''

    listaProductos.forEach((product, index) => {
        let cards = document.createElement('div')
        cards.innerHTML = 
    `<main class="mt-5 mb-5 shop-container">
        <section class="shop d-flex justify-content-around">
            <div class="card animation" style="width: 18rem;">
                <img src="${product.img}" class="card-img-top" alt="Hoodies">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <button href="#" class="btn btn-dark" onClick="agregarAlCarrito(${index})">$${product.precio}</button>
                    </div>
            </div>
        </section>
    </main>`
        

        tienda.appendChild(cards)
                        }
)   
}

mayor.onclick = () =>{
    listaProductos = sortArray(listaProductos, 'precio')
    visualizarProductos()
}

menor.onclick = () =>{
    listaProductos = sortArray(listaProductos, 'precio', 'desc')
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
        actualizarStorage(carrito)
        imprimirCarrito()
        badgeCarrito()
    } 
    else {
        const agregarProducto = listaProductos[index];
        agregarProducto.cantidad = 1;
        carrito.push(agregarProducto)
        actualizarStorage(carrito)
        imprimirCarrito()
        badgeCarrito()
    }

    Toastify({
        text: `${listaProductos[index].nombre} ha sido agregado al carrito.`,
        className: "info",
        style: {
        background: "black"
        },
        gravity: "bottom",
        position: "right", 
    }).showToast();
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
            total = total + product.precio * product.cantidad;
            const listaCarrito = document.createElement("div");
            listaCarrito.className = "text-center";
            listaCarrito.innerHTML = 
            `<div class="row">
                <table>
                    <td>
                        <div class=" d-flex align-items-center">
                            <div class="px-3 pb-3"><a><img src="${product.img}" alt="${product.nombre}" width="48"></a></div>
                            <div class="d-sm-flex"></div>
                            <div class="align-middle px-sm-5"><h2 class="lead my-1">${product.nombre}</h2></div>
                            <div class="align-middle">Cant. ${product.cantidad}</div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="px-4"><h2 class="lead my-1">$${product.precio}</h2></div>
                            <div class="">
                                <span>
                                    <div class="p-2"> <a onClick="removerProduct(${index})"><i class="fa-solid fa-trash-can"></i></a></div>
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


const removerProduct = (index) => {
    carrito.splice (index, 1);
    actualizarStorage(carrito)
    imprimirCarrito()
    badgeCarrito()
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
}

console.log(badgeCarrito)

visualizarProductos()
imprimirCarrito()
getProducts()
badgeCarrito()


