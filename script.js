const loggedUser =
JSON.parse(localStorage.getItem("loggedInUser"));

if(!loggedUser){

window.location.href="login.html";
}

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let allProducts = [];

function updateCount(){

const count =
document.getElementById("count");

let total =
cart.reduce((sum,item)=>sum+item.qty,0);

count.innerText = total;
}

updateCount();

/* MENU */

function toggleMenu(){

document
.getElementById("sideMenu")
.classList.toggle("open");
}

/* FETCH PRODUCTS */

fetch("/products")

.then(res => res.json())

.then(data => {

allProducts = data;

showProducts(allProducts);
});

/* SHOW PRODUCTS */

function showProducts(products){

const productsBox =
document.getElementById("products");

productsBox.innerHTML = "";

products.forEach(product => {

productsBox.innerHTML += `

<div class="card">

<img
src="${product.image}"
onerror="this.src='https://via.placeholder.com/300'"
>

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>
`;
});
}

/* FILTER */

function filterProducts(category){

if(category==="All"){

showProducts(allProducts);

}else{

let filtered =
allProducts.filter(product =>
product.category===category
);

showProducts(filtered);
}

document
.getElementById("sideMenu")
.classList.remove("open");
}

/* SEARCH */

const search =
document.getElementById("search");

search.addEventListener("input",function(){

let value =
this.value.toLowerCase();

let filtered =
allProducts.filter(product =>

product.name
.toLowerCase()
.includes(value)

);

showProducts(filtered);
});

/* ADD TO CART */

function addToCart(id){

let product =
allProducts.find(item => item.id===id);

let existing =
cart.find(item => item.id===id);

if(existing){

existing.qty++;

}else{

cart.push({
...product,
qty:1
});
}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCount();

showToast("Added To Cart");
}

/* TOAST */

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);
}
