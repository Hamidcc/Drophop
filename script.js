const products = [
  { name: "Product 1", image: "https://via.placeholder.com/150", link: "#1", price: 10.00 },
  { name: "Product 2", image: "https://via.placeholder.com/150", link: "#2", price: 20.00 },
  { name: "Product 3", image: "https://via.placeholder.com/150", link: "#3", price: 30.00 },
];

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("toggle-mode");
  modeToggle.addEventListener("click", toggleMode);

  // Load cart data from localStorage and display total amount
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmountElement = document.getElementById("total-amount");
  const paypalAmountInput = document.getElementById("paypal-amount");

  updateTotalAmount(cartItems, totalAmountElement, paypalAmountInput);

  // Render products in the product grid
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

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  
  cartContainer.innerHTML = ''; // Clear current cart display

  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="remove-from-cart" data-name="${item.name}">Remove</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);

    // Add event listener for removing from the cart
    const removeButton = cartItem.querySelector(".remove-from-cart");
    removeButton.addEventListener("click", () => removeFromCart(item.name));
  });
}

function removeFromCart(productName) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cartItems.filter(item => item.name !== productName);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Re-render the cart and update total
  renderCart();
  const totalAmountElement = document.getElementById("total-amount");
  const paypalAmountInput = document.getElementById("paypal-amount");
  updateTotalAmount(updatedCart, totalAmountElement, paypalAmountInput);
}

// Call renderCart when the page is loaded to show the current cart items
if (document.body.contains(document.querySelector("#cart-items"))) {
  renderCart();
}
