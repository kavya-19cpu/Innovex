let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCount() {

  const count = document.getElementById("count");

  if (count) {

    let total = cart.reduce((sum, item) => sum + item.qty, 0);

    count.innerText = total;
  }
}

updateCount();

/* =========================================================
   TOGGLE MENU
========================================================= */

function toggleMenu() {

  document.getElementById("sideMenu").classList.toggle("open");
}

/* =========================================================
   FETCH PRODUCTS FROM SERVER
========================================================= */

fetch("/products")

  .then(response => response.json())

  .then(data => {

    allProducts = data;

    showProducts(allProducts);
  })

  .catch(error => {

    console.log("Error loading products:", error);
  });

/* =========================================================
   SHOW PRODUCTS
========================================================= */

function showProducts(products) {

  const productsBox = document.getElementById("products");

  if (!productsBox) return;

  productsBox.innerHTML = "";

  if (products.length === 0) {

    productsBox.innerHTML = `
      <h2 style="margin-top:50px;">
        No products found
      </h2>
    `;

    return;
  }

  products.forEach(product => {

    productsBox.innerHTML += `

      <div class="card">

        <img 
          src="${product.image}"
          onerror="this.src='https://via.placeholder.com/220'"
        >

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>

      </div>

    `;
  });
}

/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts(category) {

  if (category === "All") {

    showProducts(allProducts);

  } else {

    let filteredProducts = allProducts.filter(product =>
      product.category === category
    );

    showProducts(filteredProducts);
  }

  document.getElementById("sideMenu").classList.remove("open");
}

/* =========================================================
   SEARCH PRODUCTS
========================================================= */

const search = document.getElementById("search");

if (search) {

  search.addEventListener("input", function () {

    let value = this.value.toLowerCase();

    let filtered = allProducts.filter(product =>

      product.name.toLowerCase().includes(value)

    );

    showProducts(filtered);
  });
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

  let product = allProducts.find(item => item.id === id);

  if (!product) return;

  let existing = cart.find(item => item.id === id);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...product,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCount();

  showToast(product.name + " added to cart");
}

/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2000);
}

/* =========================================================
   GO TO CART PAGE
========================================================= */

function goToCart() {

  window.location.href = "cart.html";
}
