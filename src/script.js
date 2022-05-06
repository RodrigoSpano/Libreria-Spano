let booksContainer = document.querySelector(".content__cards");
const formSearch = document.querySelector(".formSearch");
const inputSearch = document.querySelector(".form-control");
let restore = document.querySelector(".restoreBtn");
let buyBtn = document.querySelector(".buyBtn");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
renderCart();

let itemCard;
let prods = [];
window.addEventListener("load", async () => {
    const resp = await fetch("https://6271666fc455a64564b27e22.mockapi.io/prods");
    prods = await resp.json();

    prods.forEach(item => {
        itemCard = document.createElement("div");
        itemCard.classList = "card__body col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3";
        itemCard.innerHTML = `
        <img src="${item.img}" alt="${item.name}"></img>
        <h2 title="${item.name}">${item.name}</h2>
        <p>$${item.price}</p>
        <a id="${item.id}" class="btn">add +</a>
        `
        booksContainer.appendChild(itemCard);
        const addCartButton = document.getElementById(`${item.id}`).addEventListener("click", () => addToCart(item));
    });
});

//*render cart products
function renderCart() {
    const totalCart = cart.reduce((acc, el) => acc + el.price, 0);
    const modalCart = document.querySelector(".cart-container");
    modalCart.innerHTML = `Amount: ${cart.length} | Total price:$${totalCart}`
    cart.forEach(prod => {
        const divProd = document.createElement("div");
        divProd.classList = "d-flex align-items-center mt-3 mb-3"
        divProd.innerHTML = `
        <img class="mx-3" style="width:60px" src="${prod.img}">
        <h3 class="small" >Book: ${prod.name} </br>| ${prod.category} | $${prod.price}
        `
        modalCart.appendChild(divProd);
    })
}

//*add to cart function
function addToCart(item) {
    cart.push(item);
    renderCart();
    localStorage.setItem("cart", JSON.stringify(cart));
    const Toast = Swal.mixin({ //? toast add to cart
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
    })
}


//*modal account
let cloudAccount = []; //? account data is save
function saveData() { //? collect inf
    let nameAcc = document.querySelector(".nameAcc").value.toLowerCase();
    let addressAcc = document.querySelector(".addressAcc").value.toLowerCase();
    let cardAcc = document.querySelector(".cardAcc").value.toLowerCase();
    let cardNumAcc = document.querySelector(".cardNumAcc").value.toLowerCase();
    cloudAccount = [nameAcc, addressAcc, cardAcc, cardNumAcc];
}
//?confirm button => account data
const confirmAccount = document.querySelector(".confirmAcc").onclick = () => {
    saveData();
    cloudAccount.length > 0 &&
        localStorage.setItem("account", JSON.stringify(cloudAccount));
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'information saved'
    })
}
//? restore button => account data
const restoreAccount = document.querySelector(".restoreAcc").onclick = () => {
    cloudAccount = [];
    localStorage.removeItem("account");
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'info',
        title: 'information restored'
    })
}

//*restore cart func
restore.onclick = () => {
    cart.length > 0 &&
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cart.splice(length);
                localStorage.removeItem("cart");
                renderCart();
                Swal.fire(
                    'Deleted!',
                    'Your bag is empty!',
                    'success'
                )
            }
        })
}

//*buy cart button
buyBtn.onclick = () => {
    if (cart.length > 0 && cloudAccount.length > 0) {
        let timerInterval
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
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
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                localStorage.setItem("toDeliver", JSON.stringify(cart));
                localStorage.removeItem("cart");
                cart.splice(length);
                renderCart();
            }
        })
    }
    cloudAccount.length == 0 && Swal.fire('you have to complete the account data')
}

//*navbar function
inputSearch.onchange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    formSearch.onsubmit = (e) => {
        e.preventDefault();
        prods.forEach(item => {
            searchValue === item.name.toLowerCase() &&
                Swal.fire({
                    title: "Found!",
                    text: `${item.name} | ${item.category} | $${item.price}`,
                    imageUrl: `${item.img}`,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: `${item.name}`
                })
        })
    }
}

let filterButtons = document.querySelectorAll('.cateFilt');
let filterBooksCont = document.querySelector('.filterNames');
filterBooksCont.classList = 'd-flex justify-content-space-between'
for(const btn of filterButtons){
    btn.onclick=(e)=>{
        let btnData = e.target.dataset.category;
        const showItem = prods.filter((el)=> el.category == btnData);
        let contList = document.createElement('div');
        contList.innerHTML = `${btnData.toUpperCase()}`
        showItem.forEach(i=>{
            console.log(i.name)
            let nameLi = document.createElement('p');
            nameLi.innerText = `➲${i.name}`
            contList.append(nameLi)
        })
        filterBooksCont.append(contList)
    }
}