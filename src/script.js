let booksContainer = document.querySelector('.content__cards');
const formSearch = document.querySelector('.formSearch');
const inputSearch = document.querySelector('.form-control');
const modalCart = document.querySelector('.cart-container');

let prods = [];
let cart = [];

window.addEventListener('load', async () => {
    const resp = await fetch("https://6271666fc455a64564b27e22.mockapi.io/prods");
    prods = await resp.json();

    await prods.forEach(item => {
        let itemCard = document.createElement('div');
        itemCard.classList = 'card__body col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3';
        itemCard.innerHTML = `
        <img src="${item.img}" alt="${item.name}"></img>
        <h2 title="${item.name}">${item.name}</h2>
        <p>$${item.price}</p>
        <a id="${item.id}" class="btn">add +</a>
        `
        booksContainer.appendChild(itemCard);
        let addCartButton = document.getElementById(`${item.id}`).addEventListener('click', () => addToCart(item));
    });
});

//*render cart products
function renderCart(){
    cart.forEach(prod=>{
        let divProd = document.createElement('div');
        divProd.classList = "d-flex align-items-center"
        divProd.innerHTML = `
        <img class="w-25 mx-3" src="${prod.img}">
        <h3 class="small" >Book: ${prod.name} </br>| ${prod.category} | $${prod.price}
        `
        modalCart.appendChild(divProd);
    })
}

//*add to cart function
function addToCart(item) {
    cart.push(item);
    renderCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

//*navbar function
inputSearch.onchange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    formSearch.onsubmit = (e) => {
        e.preventDefault();
        prods.forEach(item => {
            searchValue === item.name.toLowerCase() &&
                Swal.fire({
                    title: 'Found!',
                    text: `${item.name} | ${item.category} | $${item.price}`,
                    imageUrl: `${item.img}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: `${item.name}`
                })
        })
    }
}