// Elements references
const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedbackElement = document.getElementById("feedback");
const totalPrice = document.getElementById("totalPrice");
const clearCartButton = document.getElementById("clearCart");
const sortByPriceButton = document.getElementById("sortByPrice");

// Default Products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];
// Empty Cart
const cart = [];

products.forEach(function (product) {
  const { id, name, price } = product;
  const productRow = `
      <div class="product-row">
      <p>${name} - Rs. ${price}</p>
      <button onclick="addToCart(${id})">Add to cart</button>
      </div>
      `;
  productsContainer.insertAdjacentHTML("beforeend", productRow);
  //   const divElement = document.createElement("div");
  //   divElement.className = "product-row";
  //   divElement.innerHTML = `
  // <p>${product.name} - Rs. ${product.price}</p>
  // <button>Add to cart</button>
  // `;
  //   productsContainer.appendChild(divElement);
});

function addToCart(id) {
  // check if the product is available in the cart

  const isProductAvailable = cart.some((product) => product.id === id);
  if (isProductAvailable) {
    updateUserFeedback(`Item already added to the cart`, "error");
    return;
  }
  // console.log(id);
  const productToAdd = products.find((product) => product.id === id);
  // console.log(productToAdd);
  cart.push(productToAdd);
  // console.log(cart);

  renderCartDetails();
  updateUserFeedback(`${productToAdd.name} is added to the cart`, "success");
}
function renderCartDetails() {
  cartContainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price } = product;
    const cartItemRow = `
        <div class="product-row">
          <p>${name} - Rs. ${price} </p>
          <button onclick="removeFromCart(${id})">Remove</button>
        </div>
        `;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });
  // let totalp = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   totalp += cart[i].price;
  // }
  const totalp = cart.reduce(function (acc, prod) {
    return acc + prod.price;
  }, 0);
  totalPrice.textContent = `Rs. ${totalp}`;
}

function removeFromCart(id) {
  console.log(id);
  const product = cart.find((product) => product.id === id);
  // updateUserFeedback(`${product.name} is removed from the cart`, "success");
  // const updatedCart = cart.filter(function (product) {
  //   return product.id !== id;
  // });
  const productIndex = cart.findIndex((product) => product.id === id);
  cart.splice(productIndex, 1);
  // console.log(updatedCart);
  // cart = updatedCart;
  updateUserFeedback(`${product.name} is removed from the cart`, "error");
  renderCartDetails();
}
let timerId;
function updateUserFeedback(msg, type) {
  clearTimeout(timerId);
  feedbackElement.style.display = "block";

  // type = successs(green) || error(red);
  if (type === "success") {
    feedbackElement.style.backgroundColor = "green";
  }
  if (type === "error") {
    feedbackElement.style.backgroundColor = "red";
  }
  feedbackElement.textContent = msg;
  timerId = setTimeout(function () {
    feedbackElement.style.display = "none";
  }, 3000);
}

clearCartButton.addEventListener("click", () => {
  cart.length = 0;
  renderCartDetails();
  updateUserFeedback("Cart is Cleard", "success");
});

sortByPriceButton.addEventListener("click", () => {
  cart.sort(function (item1, item2) {
    return item1.price - item2.price;
  });
  renderCartDetails();
});
