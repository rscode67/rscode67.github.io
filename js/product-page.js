const API_URL = "https://v2.api.noroff.dev/rainy-days/";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let myOutsideProduct;

console.log(urlParams.get("name"));

async function fetchProduct() {
  try {
    const response = await fetch(API_URL + productId);

    if (response.ok) {
      const product = await response.json();

      const myProduct = product.data;
      myOutsideProduct = product.data;

      const container = document.getElementById("productContainer");

      container.innerHTML = `
          <div class="product_pic">
          <img
            src="${myProduct.image.url}"
            alt="${myProduct.image.alt}"
            class="product_image"
          />
        </div>
        <div class="product_details">
          <h1>${myProduct.title}</h1>
          <p>${myProduct.description}</p>
        </div>
        <div class="product_price">
          <p class="jacket_price">$ ${myProduct.price.toFixed(2)}</p>
          <button onClick="addToCart()" class="cta-small product_cta">Add to Cart</button>
        </div> `;
    }
  } catch (e) {}
}

function addToCart() {
  console.log(myOutsideProduct);

  if (!myOutsideProduct) {
    return;
  }

  const alreadyInCart = cart.some((item) => item.id === myOutsideProduct.id);

  if (alreadyInCart) {
    alert("This item is already in your cart.");
    return;
  }

  cart.push(myOutsideProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
}

function updateCount() {
  document.getElementById("counter").textContent = cart.length;
}

updateCount();
fetchProduct();
