let cart = JSON.parse(localStorage.getItem("cart")) || [];

function fetchProduct() {
  const cartContainer = document.getElementById("cartProduct");
  const cartDetails = document.getElementById("cartDetails");

  if (cart.length === 0) {
    cartContainer.innerHTML = `<h2>Cart Empty</h2>`;
    return;
  }

  // let bill = 0;
  // cartContainer.innerHTML = cart.map((item) => {
  //   bill = bill + item.price;
  //   return `
  //   <div>
  //   <p class="productName">${item.title}</p>
  //   <img src="${item.image.url}" alt="Product" class="product-image-checkout">

  //   <button onclick="removeFromCart('${item.id}')" class="cta-small">Remove Item</button>
  //   </div>

  //   `;
  // });

  // cartDetails.innerHTML = `
  // <h2>Cart Total</h2>
  // <p>${bill}</p>
  // <button onClick="proceed()" class="cta-small">Proceed to checkout</button>
  // `;

  let bill = 0;
  cartContainer.innerHTML = cart
    .map((item) => {
      bill += item.price;
      const formattedPrice = formatPrice(item.price, item.currency || "USD");
      return `
      <div>
        <p class="productName">${item.title}</p>
        <img src="${item.image.url}" alt="Product" class="product-image-checkout">
        <p class="productPrice">${formattedPrice}</p> 
        <button onclick="removeFromCart('${item.id}')" class="cta-small">Remove Item</button>
      </div>
    `;
    })
    .join("");

  const formattedTotal = formatPrice(bill, cart[0]?.currency || "USD");

  cartDetails.innerHTML = `
    <h2>Cart Total</h2>
    <p>${formattedTotal}</p>
    <button onClick="proceed()" class="cta-small">Proceed to checkout</button>
  `;
}

function formatPrice(price, currencyCode = "USD", locale = "en-us") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(price);
}

function proceed() {
  localStorage.removeItem("cart");
  window.location.href = "checkoutConfirm.html";
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length === 0) {
    document.getElementById("cartDetails").style.display = "none";
  }

  fetchProduct();
}

fetchProduct();
