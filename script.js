// Smooth scroll to menu
function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Contact form handler
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (name && email && message) {
    alert("Thank you, " + name + "! Your message has been sent.");
    document.getElementById("contactForm").reset();
  } else {
    alert("Please fill all fields!");
  }
});

// Shopping Cart Logic
let cart = [];

function addToCart(button) {
  const itemDiv = button.parentElement;
  const name = itemDiv.dataset.name;
  const price = parseInt(itemDiv.dataset.price);
  const qty = parseInt(itemDiv.querySelector(".qty").value);

  if(qty <= 0) {
    alert("Please enter a quantity!");
    return;
  }

  const existingItem = cart.find(i => i.name === name);
  if(existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({name, price, qty});
  }

  updateCart();
  itemDiv.querySelector(".qty").value = 0;
}

function updateCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `${item.name} x ${item.qty} = ₹${item.price * item.qty} <button onclick="removeItem('${item.name}')">Remove</button>`;
    cartItemsDiv.appendChild(div);
    total += item.price * item.qty;
  });
  document.getElementById("total-price").innerText = `Total: ₹${total}`;
  document.getElementById("cart-count").innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function checkout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! Total: ₹" + cart.reduce((sum, i) => sum + i.price * i.qty, 0));
  cart = [];
  updateCart();
}
