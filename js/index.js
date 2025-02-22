let cart = JSON.parse(localStorage.getItem("cart")) || [];
let myOutsideProduct;
const API_URL = "https://v2.api.noroff.dev/rainy-days";
let products = [];

function addToCart() {
  cart.push(myOutsideProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
}

function updateCount() {
  document.getElementById("counter").textContent = cart.length;
}

async function fetchProducts() {
  const response = await fetch(API_URL);
  console.log(response.ok);

  if (response.ok) {
    products = await response.json();
    console.log(products);
    let newProducts = products.data;

    const myProduct = document.getElementById("myProductContainer");

    let mynewFemaleProducts = newProducts.filter(
      (item) => item.gender === "Female"
    );
    let myNewMaleProducts = newProducts.filter(
      (item) => item.gender === "Male"
    );
    newProducts = [];

    for (let i = 0; i < 6; i++) {
      if (i < 3) {
        newProducts.push(mynewFemaleProducts[i]);
      } else {
        newProducts.push(myNewMaleProducts[i]);
      }
    }

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
          <p class="jacket_price">$ ${element.price.toFixed(2)}</p>
          <p>${element.gender}</p>
          <button class="cta-small" onClick="window.location.href='../product-page.html?id=${
            element.id
          }'">Product details</button>
        </figure>`;
      myProduct.appendChild(card);
    });
  } else {
    throw new Error("failed to load products");
  }
}

updateCount();
fetchProducts();
