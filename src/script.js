let cont = document.createElement("div");
let cont2 = document.createElement("div");
let main = document.querySelector("#main");
let category = document.querySelector(".filterCategory");

cont.className = "container container-main-libros";
cont2.className = "row content__cards";
main.append(cont);
cont.append(cont2);

class Inventario{
    constructor(id,name,category,price,img){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.img = img;
    }
}

const prods = [];

const cart = JSON.parse(localStorage.getItem("carrito")) || [];
renderCart();

const prod1 = new Inventario(1,"seras","fiction",1399,"../assets/media/libros/ficcion/ser%C3%A1s.png");
const prod2 = new Inventario(2,"bajo las estrellas","romance",1399,"../assets/media/libros/romantico/bajo-las-estrellas.jpg");
const prod3 = new Inventario(3,"las lunas de sartre","fantasy",1900,"../assets/media/libros/fantasia/las-lunas-de-sartre.jpg");
const prod4 = new Inventario(4,"lo poco que sabemos","fiction",2190,"../assets/media/libros/ficcion/lo-poco-que-sabemos.png");
const prod5 = new Inventario(5,"sabrina","fiction",1500,"../assets/media/libros/ficcion/sabrina.jpg");
const prod6 = new Inventario(6,"riverdale","fiction",1500,"../assets/media/libros/ficcion/riverdale.jpg");
const prod7 = new Inventario(7,"boulevard","fiction",1799,"../assets/media/libros/ficcion/boulevard.jpg");
prods.push(prod1,prod2,prod3,prod4,prod5,prod6,prod7);


for(const item of prods){
    let itemCard = document.createElement("div");
    itemCard.className = "itm card__body col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3"
    itemCard.innerHTML = `<img src="${item.img}" class="item-img"></img>
    <h2 class="item-name">${item.name}</h2>
    <p class="item-price">$${item.price}</p>
    <a id=${item.id} class="btn addToCartButton">Add Cart</a>`
    cont2.appendChild(itemCard);
    const addToCartButtons = document.getElementById(`${item.id}`).addEventListener("click",()=> addToShoppingCart(item));
}

function renderCart(){
    const totalCart = cart.reduce((acc, el)=> acc + el.price, 0);
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.innerHTML =`<h3>carrito de compras</h3>
                            <h4>cantidad: ${cart.length} | total: $${totalCart}</h4>`;
    cart.forEach(item =>{
        const cartContainerItem = document.createElement("div");
        cartContainerItem.innerHTML = `
        <p>Libro: ${item.name} | Precio:$ ${item.price}</p>
        `
        cartContainer.append(cartContainerItem);
        console.log("🚀 ~ file: script.js ~ line 58 ~ renderCart ~ totalCart", totalCart)
    }
    )
}

function addToShoppingCart(item){
    cart.push(item);
    renderCart();
    localStorage.setItem("carrito",JSON.stringify(cart));
}

localStorage.clear(); //! para q no se acumulen las cosas 