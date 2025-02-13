//
const API_URL = "https://v2.api.noroff.dev/rainy-days";
let products = [];

//function definition
async function fetchProducts() {
    const response = await fetch(API_URL);
    console.log(response.ok);

    if (response.ok) {
        products = await response.json();//json javascropt object notation
        console.log(products);
        const newProducts = products.data;
        //we are getting the section element here
        const myProduct = document.getElementById('myProductContainer');

        newProducts.forEach(element => {
            const card = document.createElement('div');
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
          <a href="product-page.html"
            ><button class="cta-small">Product details</button></a
          >
        </figure>`
            myProduct.appendChild(card);
        });
    } else {
        throw new Error("failed to load products")
    }
}

//function call
fetchProducts();

//for if else
// if (2 === 4) {
//     //do this if true
//     console.log('equal')
// } else {
//     //do this if not true
//     console.log('not equal')
// }