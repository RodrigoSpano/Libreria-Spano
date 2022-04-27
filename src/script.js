let cont = document.createElement("div");
let cont2 = document.createElement("div");
let main = document.querySelector("#main");
let category = document.querySelector(".filterCategory");
let restore = document.querySelector("#restoreCart")
let buyCartBtn = document.querySelector("#btn-buy-cartItems")
let searchNavbar = document.querySelector(".search-navbar");
let searchBtn = document.querySelector(".btn-search");
let inputSearch = document.querySelector("#search");
let cateFantasy = document.querySelector("#fantasy");
let cateFiction = document.querySelector("#fiction");
let cateRomance = document.querySelector("#romance");
let cateTerror = document.querySelector("#terror");
let formData = document.querySelector('#form-personalData');
let inputNamePersonalData = document.querySelector("#inputName-data");
let inputSelectPersonalData = document.querySelector("#cardType-data");
let inputAddressPersonalData = document.querySelector("#address-data");
let inputCardNumberData = document.querySelector("#cardNumber-data");

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
const prod8 = new Inventario(8, "heist", "romance", 1869, "../assets/media/libros/romantico/heist-1850.jpg");
const prod9 = new Inventario(9, "el dia que dejo de nevar en alaska", "romance", 2511, "../assets/media/libros/romantico/alaska.jpg");
const prod10 = new Inventario(10, "after", "romance", 2600, "../assets/media/libros/ficcion/after.jpg");
prods.push(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10);


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

//!filter
cateFantasy.onclick = (e) => {
    prods.forEach(item => {
        item.category === 'fantasy' && console.log(item);
    })
}
cateFiction.onclick = () => {
    prods.forEach(item => {
        item.category === 'fiction' && console.log(item);
    })
}
cateRomance.onclick = () => {
    prods.forEach(item => {
        item.category === 'romance' && console.log(item);
    })
}
cateTerror.onclick = () => {
    swal.fire({
        icon: 'error',
        text: 'aun no hay libros de este tipo..'
    })
} //todo => logarar q se muestre en pantalla

//!renderizado de carro
function renderCart() {
    const totalCart = cart.reduce((acc, el) => acc + el.price, 0);
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.innerHTML = `
    <h4>amount: ${cart.length} | total price: $${totalCart}</h4>`;
    cart.forEach(item => {
        const cartContainerItem = document.createElement("div");
        cartContainerItem.className = "cartContainerItem d-flex mt-2"
        cartContainerItem.innerHTML = `
        <img class="mx-2" style="width: 50px;" src="${item.img}"></img>
        <p><strong>Libro</strong>: ${item.name} | <br><strong> Precio</strong>: $${item.price} </p>
        `
        cartContainer.append(cartContainerItem);
        console.log("🚀 ~ file: script.js ~ line 58 ~ renderCart ~ totalCart", totalCart);
    })
}

function addToShoppingCart(item) {
    cart.push(item);
    renderCart();
    localStorage.setItem("carrito", JSON.stringify(cart));
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'Added successfully'
    })
}

//!personal data
// inputNamePersonalData 
// inputSelectPersonalData 
// inputAddressPersonalData 
// inputCardPersonalData 
// formData
// class PersonalData {
//     constructor(fullName, card, cardNumber, address){
//         this.fullName= fullName,
//         this.card = card,
//         this.cardNumber = cardNumber,
//         this.address = address
//     }
// }



//! boton para vaciar carro
restore.addEventListener('click', () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    if (cart.length > 0) {
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
                    'Your bag is empty!.✔',
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
//!boton para proceder a comprar el carrito 
buyCartBtn.onclick = () => {
    if (cart.length > 0) {
        let timerInterval
        Swal.fire({
            title: 'thanks for trust!',
            html: 'processing information... <b></b>',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
                localStorage.setItem('postCart', JSON.stringify(cart));
                localStorage.removeItem('carrito')
                cart.splice(length);
                renderCart();
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {}
        })
    }
};


inputSearch.onchange = (e) => {
    const inputVal = e.target.value.toLowerCase();
    searchNavbar.onsubmit = (e) => {
        e.preventDefault();
        prods.forEach(item => {
            item.name == inputVal && Swal.fire({
                title: "DATOS DE PRODUCTO:",
                text: `${item.name} | categoria: ${item.category} |  $${item.price}`,
                imageUrl: item.img,
                imageHeight: 400,
                imageAlt: 'A tall image',
                confirmButtonText: 'exit',
                confirmButtonColor: '#b61928',
            });
        })
    }
}
