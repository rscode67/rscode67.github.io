//
const API_URL = "https://v2.api.noroff.dev/rainy-days"; // Stores the URL to fetch the products data.
let products = []; // Empty array that will later hold the data returned from the API.

// Function definition
// Asynchronous function retrieves product data from the APi and display it
async function fetchProducts() {
    const response = await fetch(API_URL); // Initiates network request to the API URL. Await pauses the function execution until the promise resolves.
    console.log(response.ok);

    if (response.ok) {
        products = await response.json();// JSON - Javascript Object Notation. Converts the JSON response to a javascript object. Parses the JSON body of the response. Parsed data is then stored in the products variable. 
        console.log(products);
        const newProducts = products.data; // Assumes that the API response contains a property called 'data' which holds an array of product objects. This array is stored in newProducts variable.
        
        // Section element
        
      displayProducts(newProducts); // Calls the displayProducts function to render the products on the page. Responsible for updating the UI in later stage. 
      // Moved it to display products function for reusability
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

function filterProduct(){
  const gender = document.getElementById('genderFilter').value;
  // made a new array using spread operator and stored it in a new variable
  let myProduct = [...products.data];
  // gender = "" ==> false
  // gender = "male"|| "female"  ===> true

  if (gender) {
    myProduct = myProduct.filter((item) => item.gender === gender);
    console.log('my filtered array', myProduct);
  }
  displayProducts(myProduct);
}

function displayProducts(newProducts) {
  const myProduct = document.getElementById('myProductContainer');
  myProduct.innerHTML = '';

  newProducts.forEach(element => {
    const card = document.createElement('div');
    // onClick event on button directly 
    // and added a functionality to move to new screen using window.location.href
    // <button class="cta-small" onClick="window.location.href='../product-page.html?id=${element.id}'">Product details</button>
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
        </figure>`
    myProduct.appendChild(card);
  });
}



document.getElementById('genderFilter').addEventListener('change', filterProduct)
// document.getElementById('genderFilter').addEventListener('change',function(){

// })




//function call
fetchProducts();

 
