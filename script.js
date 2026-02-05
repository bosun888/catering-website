// ===== LOGIN SYSTEM =====
function signup(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  localStorage.setItem("user", JSON.stringify({email,pass}));
  alert("Account created!");
  location.href="login.html";
}

function login(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if(user && user.email===email && user.pass===pass){
    localStorage.setItem("loggedIn","true");
    location.href="index.html";
  }else{
    alert("Invalid login");
  }
}

function checkLogin(){
  if(!localStorage.getItem("loggedIn")){
    alert("Login first!");
    location.href="login.html";
  }
}

// ===== CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name,price){
  checkLogin();
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Added to cart!");
}

function loadCart(){
  const container=document.getElementById("cartItems");
  let total=0;

  cart.forEach(item=>{
    total+=item.price;
    container.innerHTML+=`
      <div class="cart-item">
        ${item.name} - ₦${item.price}
      </div>
    `;
  });

  document.getElementById("total").innerText="₦"+total;
}
