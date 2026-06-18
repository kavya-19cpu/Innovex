let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){

let box =
document.getElementById("cartBox");

let checkoutBox =
document.getElementById("checkoutBox");

box.innerHTML = "";

if(cart.length===0){

box.innerHTML = `
<h2>
Your Cart Is Empty
</h2>
`;

checkoutBox.style.display="none";

return;
}

checkoutBox.style.display="block";

let total = 0;

cart.forEach((item,i)=>{

total += item.price * item.qty;

box.innerHTML += `

<div class="cart-card">

<img
src="${item.image}"
class="cart-image"
>

<div class="cart-details">

<h3>${item.name}</h3>

<p class="price">
₹${item.price}
</p>

<p class="qty">
Quantity: ${item.qty}
</p>

<div class="cart-buttons">

<button onclick="increase(${i})">
+
</button>

<button onclick="decrease(${i})">
-
</button>

<button
class="delete-btn"
onclick="removeItem(${i})">

Delete

</button>

</div>

</div>

</div>
`;
});

document.getElementById("total")
.innerText =
"Subtotal: ₹" + total;
}

function increase(i){

cart[i].qty++;

save();
}

function decrease(i){

cart[i].qty--;

if(cart[i].qty<=0){

cart.splice(i,1);
}

save();
}

function removeItem(i){

cart.splice(i,1);

save();
}

function save(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();
}

function placeCODOrder(){

alert(
"Order Placed Successfully"
);

cart=[];

save();
}

renderCart();
