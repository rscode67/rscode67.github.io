console.log('product page connected')

const API_URL = "https://v2.api.noroff.dev/rainy-days/";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id")

console.log(urlParams.get('name'));

async function fetchProduct() {
  // console.log(API_URL+productId)
  try {
      const response = await fetch(API_URL + productId);
      console.log(response);
      if (response.ok) {
          const product = await response.json();
          console.log(product.data);
          const myProduct = product.data;

          

          const container = document.getElementById('productContainer');
          container.innerHTML = `
          <div class="product_pic">
          <img
            src="${element.image.url}"
            alt="${element.image.alt}"
            class="product_image"
          />
        </div>
        <div class="product_details">
          <h1>${element.title}</h1>
          <p>${element.description}</p>
        </div>
        <div class="product_price">
          <p class="jacket_price">${element.price}</p>
          <a href="index.html"
            ><button class="cta-small product_cta">Buy now</button></a
          >
        </div> `

        displayProducts(myProduct);
          

          
      }
  } catch (e) {
    console.error('Error fetching product:', e);

  }
}




fetchProduct();

