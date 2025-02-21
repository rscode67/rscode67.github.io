const API_URL = "https://v2.api.noroff.dev/rainy-days";
let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let myOutsideProduct;

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

async function fetchProducts() {
  showLoader();
  const response = await fetch(API_URL);
  console.log(response.ok);

  if (response.ok) {
    products = await response.json();
    console.log(products);
    const newProducts = products.data;
    const myProduct = document.getElementById("myProductContainer");

    myProduct.innerHTML = "";

    newProducts.forEach((element) => {
      const card = document.createElement("div");
      card.innerHTML = `
            <figure class="product-item">
          <img
            src="${element.image.url}"
            class="jacket_image"
            alt="${element.image.alt}"
          />
          <figcaption class="jacket_name">${element.title}</figcaption>
          <p class="jacket_description">${element.description}</p>
          <p class="jacket_price">${element.price}</p>
          <button class="cta-small" onClick="window.location.href='../product-page.html?id=${element.id}'">Product details</button>
        </figure>`;
      myProduct.appendChild(card);
    });
    hideLoader();
  } else {
    throw new Error("failed to load products");
  }
}

function filterProduct() {
  const gender = document.getElementById("genderFilter").value;
  let myProduct = [...products.data];

  if (gender) {
    myProduct = myProduct.filter((item) => item.gender === gender);
    console.log("my filtered array", myProduct);
  }
  displayProducts(myProduct);
}

function displayProducts(newProducts) {
  const myProduct = document.getElementById("myProductContainer");

  myProduct.innerHTML = "";

  newProducts.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
            <figure class="product-item">
          <img
            src="${element.image.url}"
            class="jacket_image"
            alt="${element.image.alt}"
          />
          <figcaption class="jacket_name">${element.title}</figcaption>
          <p class="jacket_description">${element.description}</p>
          <p class="jacket_price">${element.price}</p>
          <button class="cta-small" onClick="window.location.href='../product-page.html?id=${element.id}'">Product details</button>
        </figure>`;

    myProduct.appendChild(card);
  });
}

document
  .getElementById("genderFilter")
  .addEventListener("change", filterProduct);

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

fetchProducts();
