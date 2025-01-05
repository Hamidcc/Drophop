const products = [
  { name: "Product 1", image: "https://via.placeholder.com/150", link: "#1", price: 10.00 },
  { name: "Product 2", image: "https://via.placeholder.com/150", link: "#2", price: 20.00 },
  { name: "Product 3", image: "https://via.placeholder.com/150", link: "#3", price: 30.00 },
];

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("toggle-mode");
  modeToggle.addEventListener("click", toggleMode);

  if (document.body.contains(document.querySelector("#total-amount"))) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmountElement = document.getElementById("total-amount");
    const paypalAmountInput = document.getElementById("paypal-amount");

    updateTotalAmount(cartItems, totalAmountElement, paypalAmountInput);
  }

  if (document.body.contains(document.querySelector(".product-grid"))) {
    const productGrid = document.querySelector(".product-grid");
    products.forEach((product) => {
      const productBox = document.createElement("div");
      productBox.className = "product-box";
      productBox.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productGrid.appendChild(productBox);

      // Add event listener for the "Add to Cart" button
      const addToCartButton = productBox.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => addToCart(product));
    });
  }
});

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Check if product is already in the cart
  const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

  if (existingProductIndex !== -1) {
    // If product is already in the cart, increase quantity
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // If product is not in the cart, add it with quantity 1
    product.quantity = 1;
    cartItems.push(product);
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Update the total amount and display
  const totalAmountElement = document.getElementById("total-amount");
  const paypalAmountInput = document.getElementById("paypal-amount");
  updateTotalAmount(cartItems, totalAmountElement, paypalAmountInput);
}

function updateTotalAmount(cartItems, totalAmountElement, paypalAmountInput) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
  paypalAmountInput.value = total.toFixed(2);
}
