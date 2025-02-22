let cart = JSON.parse(localStorage.getItem("cart")) || [];
let myOutsideProduct;

function addToCart() {
  cart.push(myOutsideProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
}

function updateCount() {
  document.getElementById("counter").textContent = cart.length;
}

updateCount();
