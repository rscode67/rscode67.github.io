//
const API_URL = "https://v2.api.noroff.dev/rainy-days";
let products = [];

async function fetchProducts() {
  const response = await fetch(API_URL);
  console.log(response.ok);

  if (response.ok) {
    products = await response.json();
    console.log(products);
    const newProducts = products.data;

    displayProducts(newProducts);
    const myProduct = document.getElementById("myProductContainer");
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
}

document
  .getElementById("genderFilter")
  .addEventListener("change", filterProduct);

fetchProducts();
