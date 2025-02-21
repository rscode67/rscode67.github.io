console.log("product page connected");

const API_URL = "https://v2.api.noroff.dev/rainy-days/";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let myOutsideProduct;

console.log(urlParams.get("name"));

async function fetchProduct() {
  console.log(API_URL + productId);
  try {
    const response = await fetch(API_URL + productId);
    console.log(response);
    if (response.ok) {
      const product = await response.json();
      console.log(product.data);
      const myProduct = product.data;
      myOutsideProduct = product.data;

      const container = document.getElementById("productContainer");
      console.log(container);
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
          <p class="jacket_price">${myProduct.price}</p>
          <button onClick="addToCart()" class="cta-small product_cta">Add to Cart</button>
        </div> `;
    }
  } catch (e) {
    console.error("Error fetching product:", e);
  }
}

function addToCart() {
  console.log(myOutsideProduct);
  cart.push(myOutsideProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
}

function updateCount() {
  document.getElementById("counter").textContent = cart.length;
}

updateCount();
fetchProduct();
