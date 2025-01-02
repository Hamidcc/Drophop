const products = [
  { name: "Product 1", image: "https://via.placeholder.com/150", link: "#1" },
  { name: "Product 2", image: "https://via.placeholder.com/150", link: "#2" },
  { name: "Product 3", image: "https://via.placeholder.com/150", link: "#3" },
];

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("toggle-mode");
  modeToggle.addEventListener("click", toggleMode);
    if (document.body.contains(document.querySelector("#total-amount"))) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmountElement = document.getElementById("total-amount");
  const paypalAmountInput = document.getElementById("paypal-amount");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
  paypalAmountInput.value = total.toFixed(2);
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
    });
  }
});

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}
