const products = [
  { name: "Product 1", image: "https://via.placeholder.com/150", link: "#1" },
  { name: "Product 2", image: "https://via.placeholder.com/150", link: "#2" },
  { name: "Product 3", image: "https://via.placeholder.com/150", link: "#3" },
];

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmountElement = document.getElementById("total-amount");
  const paypalAmountInput = document.getElementById("paypal-amount");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
  paypalAmountInput.value = total.toFixed(2);
});

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}
