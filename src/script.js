let cont = document.createElement("div");
let cont2 = document.createElement("div");
let main = document.querySelector("#main");
let category = document.querySelector(".filterCategory");
let restore = document.querySelector("#restoreCart")

cont.className = "container container-main-libros";
cont2.className = "row content__cards";
main.append(cont);
cont.append(cont2);

class Inventario {
    constructor(id, name, category, price, img) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.img = img;
    }
}

const prods = [];
console.log("🚀 ~ file: script.js ~ line 22 ~ prods", prods)

const cart = JSON.parse(localStorage.getItem("carrito")) || [];
renderCart();

const prod1 = new Inventario(1, "seras", "fiction", 1399, "../assets/media/libros/ficcion/ser%C3%A1s.png");
const prod2 = new Inventario(2, "bajo las estrellas", "romance", 1399, "../assets/media/libros/romantico/bajo-las-estrellas.jpg");
const prod3 = new Inventario(3, "las lunas de sartre", "fantasy", 1900, "../assets/media/libros/fantasia/las-lunas-de-sartre.jpg");
const prod4 = new Inventario(4, "lo poco que sabemos", "fiction", 2190, "../assets/media/libros/ficcion/lo-poco-que-sabemos.png");
const prod5 = new Inventario(5, "sabrina", "fiction", 1500, "../assets/media/libros/ficcion/sabrina.jpg");
const prod6 = new Inventario(6, "riverdale", "fiction", 1500, "../assets/media/libros/ficcion/riverdale.jpg");
const prod7 = new Inventario(7, "boulevard", "fiction", 1799, "../assets/media/libros/ficcion/boulevard.jpg");
const prod8 = new Inventario(8, "heist","romance",1869,"../assets/media/libros/romantico/heist-1850.jpg");
const prod9 = new Inventario(9, "el dia que dejo de nevar en alaska","romance",2511,"../assets/media/libros/romantico/alaska.jpg");
const prod10 = new Inventario(10, "after","romance",2600,"../assets/media/libros/ficcion/after.jpg");
prods.push(prod1, prod2, prod3, prod4, prod5, prod6, prod7,prod8,prod9,prod10);


for (const item of prods) {
    let itemCard = document.createElement("div");
    itemCard.className = "itm card__body col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3"
    itemCard.innerHTML = `<img src="${item.img}" class="item-img"></img>
    <h2 class="item-name">${item.name}</h2>
    <p class="item-price">$${item.price}</p>
    <a id=${item.id} class="btn addToCartButton">Add Cart</a>`
    cont2.appendChild(itemCard);
    const addToCartButtons = document.getElementById(`${item.id}`).addEventListener("click", () => addToShoppingCart(item));
}

//!renderizado de carro
function renderCart() {
    const totalCart = cart.reduce((acc, el) => acc + el.price, 0);
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.innerHTML = `
    <h4>cantidad: ${cart.length} | total: $${totalCart}</h4>`;
    cart.forEach(item => {
        const cartContainerItem = document.createElement("div");
        cartContainerItem.className = "cartContainerItem"
        cartContainerItem.innerHTML = `
        <p><strong>Libro</strong>: ${item.name} | <strong> Precio</strong>: $${item.price} </p>
        `
        cartContainer.append(cartContainerItem);
        console.log("🚀 ~ file: script.js ~ line 58 ~ renderCart ~ totalCart", totalCart);
    })
}

function addToShoppingCart(item) {
    cart.push(item);
    renderCart();
    localStorage.setItem("carrito", JSON.stringify(cart));
}
//! boton para vaciar carro
restore.addEventListener('click', () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    if(cart.length > 0) {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your bag is empty!.',
                    'success'
                    )
                    localStorage.removeItem('carrito');
                    cart.splice(length);
                    renderCart();
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your bag is safe 😁🥳',
                    'error'
                )
            }
        })
    }
})

//TODO => agregar mensajes de agregado al carro && mover el boton para acceder al carrito && order libros según categoria(fiction,romance,etc...)
