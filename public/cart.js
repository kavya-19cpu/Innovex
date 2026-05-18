let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  let box = document.getElementById("cartBox");
  let checkoutBox = document.getElementById("checkoutBox");
  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerHTML = "<p style='font-size: 18px; color: #666;'>Your Innovex Cart is empty.</p>";
    checkoutBox.style.display = "none";
    document.getElementById("total").innerText = "Total: ₹0";
    return;
  }

  checkoutBox.style.display = "inline-block";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    box.innerHTML += `
      <div style="background: white; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 5px #eee; display: flex; align-items: center; justify-content: space-between; text-align: left;">
        <img src="${item.image}" width="80" style="border-radius: 5px; object-fit: cover;">
        <div style="flex: 1; margin-left: 20px;">
          <h3 style="margin: 0 0 5px 0; font-size: 16px;">${item.name}</h3>
          <p style="margin: 0; font-weight: bold; color: #B12704;">₹${item.price}</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #555;">Qty: ${item.qty}</p>
        </div>
        <div style="display: flex; gap: 5px;">
          <button onclick="increase(${i})" style="padding: 5px 10px; background: #e7e9ec; color: black; border: 1px solid #adb1b8;">+</button>
          <button onclick="decrease(${i})" style="padding: 5px 10px; background: #e7e9ec; color: black; border: 1px solid #adb1b8;">-</button>
          <button onclick="removeItem(${i})" style="padding: 5px 10px; background: #cc0000;">Delete</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Subtotal: ₹" + total;
}

function increase(i) {
  cart[i].qty++;
  save();
}

function decrease(i) {
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  save();
}

function removeItem(i) {
  cart.splice(i, 1);
  save();
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* CASH ON DELIVERY ACTION */
function placeCODOrder() {
  alert("🎉 Order Placed Successfully!\nYour Innovex package will be delivered via Cash on Delivery (COD).");
  cart = [];
  save();
}

renderCart();
