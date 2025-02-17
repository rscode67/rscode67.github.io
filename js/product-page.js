console.log("product page connected");

const API_URL = "https://v2.api.noroff.dev/rainy-days/";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let cart = [];

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
          <button onClink="addToCart(${myProduct})" class="cta-small product_cta">Buy now</button>
        </div> `;
    }
  } catch (e) {
    console.error("Error fetching product:", e);
  }
}

function addToCart() {}

fetchProduct();
