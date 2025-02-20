console.log("connected");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function fetchProduct() {
  const cartContainer = document.getElementById("cartProduct");
  const cartDetails = document.getElementById("cartDetails");

  if (cart.length === 0) {
    cartContainer.innerHTML = `<h1>Cart Empty</h1>`;
    return;
  }

  let bill = 0;
  cartContainer.innerHTML = cart.map((item) => {
    bill = bill + item.price;
    return `
    <div>
    <p>${item.title}</p>
    <button onClick="removeFromCart('${item.id}')">Remove Item</button>
    </div>

    `;
  });
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  fetchProduct();
}

fetchProduct();
