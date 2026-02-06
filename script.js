/* =========================
   LOGIN SYSTEM
========================= */

function signup() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (!email || !pass) {
    alert("Please enter email and password");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ email, pass }));
  alert("Account created!");
  location.href = "login.html";
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.pass === pass) {
    localStorage.setItem("loggedIn", "true");
    location.href = "index.html";
  } else {
    alert("Invalid login");
  }
}

function checkLogin() {
  if (!localStorage.getItem("loggedIn")) {
    alert("Login first!");
    location.href = "login.html";
    return false;
  }
  return true;
}

/* =========================
   CART SYSTEM
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) ?? [];


function addToCart(name, price, image) {
  if (!checkLogin()) return;

  const found = cart.find((item) => item.name === name);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  saveCart();

  // Show SweetAlert here instead of repeating in HTML
  Swal.fire({
    title: `${name} added to cart!`,
    icon: 'success',
    timer: 1200,
    showConfirmButton: false
  });
}


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Load Cart Page */
function loadCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <b>${item.name}</b><br>₦${item.price}
        </div>
        <div>
          <button onclick="changeQty(${index},-1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${index},1)">+</button>
        </div>
        <div>
          ₦${item.price * item.qty}
        </div>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "₦" + total;

  // Save summary for checkout
  let summary = cart
    .map((i) => `${i.name} x${i.qty} = ₦${i.price * i.qty}`)
    .join("\n");

  localStorage.setItem("orderSummary", summary);

  // Disable checkout button if cart empty
  const btn = document.querySelector(".checkout-btn");
  if (btn) {
    btn.disabled = cart.length === 0;
    btn.style.opacity = cart.length === 0 ? "0.5" : "1";
  }
}

/* Change Quantity */
function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  loadCart();
}

/* Remove Item */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
}

/* Load Checkout Page Summary */
function loadCheckout() {
  const box = document.getElementById("orderBox");
  if (box) {
    box.value = localStorage.getItem("orderSummary") || "";
  }
}

/* =========================
   CHECKOUT VALIDATION
========================= */
function goCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Cart is empty 🛒",
      text: "Please add items before checkout",
      confirmButtonColor: "#ff6b6b",
    });
    return;
  }

  window.location.href = "checkout.html";
}


// CONTACT MESSAGE HAS BEEN SENT USING SWEETALERT2
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  sendMessage();
});

function sendMessage() {  
  Swal.fire({
    title: 'Message Sent!',
    text: 'Thank you for contacting us. We will get back to you shortly.',
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
}
