function calculateItemAmount(price, quantity) {
  return price * quantity;
}

function calculateDiscount(subtotal) {
  if (subtotal >= 5000) {
    return subtotal * 0.10;
  } else if (subtotal >= 3000) {
    return subtotal * 0.07;
  } else if (subtotal >= 1000) {
    return subtotal * 0.05;
  } else {
    return 0;
  }
}

function getDeliveryFee(option) {
  switch (Number(option)) {
    case 1: return 0;
    case 2: return 80;
    case 3: return 150;
    default: return 0;
  }
}

const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

productCountInput.addEventListener("input", () => {
  productsContainer.innerHTML = "";
  const count = Number(productCountInput.value);
  for (let i = 0; i < count; i++) {
    productsContainer.innerHTML += `
      <label for="productName-${i}">Product Name</label>
      <input type="text" id="productName-${i}"><br>
      <label for="productPrice-${i}">Price</label>
      <input type="number" id="productPrice-${i}" min="1"><br>
      <label for="productQuantity-${i}">Quantity</label>
      <input type="number" id="productQuantity-${i}" min="1"><br><br>
    `;
  }
});

calculateBtn.addEventListener("click", () => {
  validationMessage.textContent = "";
  orderSummary.innerHTML = "";

  const customerName = document.getElementById("customerName").value.trim();
  const productCount = Number(productCountInput.value);
  const deliveryOption = document.getElementById("deliveryOption").value;

  if (!customerName) {
    validationMessage.textContent = "Please enter customer name.";
    return;
  }
  if (productCount < 1) {
    validationMessage.textContent = "Please enter a valid number of products.";
    return;
  }

  let subtotal = 0;
  let productDetails = "";

  for (let i = 0; i < productCount; i++) {
    const name = document.getElementById(`productName-${i}`).value.trim();
    const price = Number(document.getElementById(`productPrice-${i}`).value);
    const qty = Number(document.getElementById(`productQuantity-${i}`).value);

    if (!name || price <= 0 || qty <= 0) {
      validationMessage.textContent = `Invalid input for Product ${i + 1}.`;
      return;
    }

    const amount = calculateItemAmount(price, qty);
    subtotal += amount;

    productDetails += `
      <p>${i + 1}. ${name}<br>
      Price: ₱${price.toFixed(2)}<br>
      Quantity: ${qty}<br>
      Amount: ₱${amount.toFixed(2)}</p>
    `;
  }

  const discount = calculateDiscount(subtotal);
  const deliveryFee = getDeliveryFee(deliveryOption);
  const finalAmount = subtotal - discount + deliveryFee;

  orderSummary.innerHTML = `
    <h3>ORDER SUMMARY</h3>
    <p><strong>Customer:</strong> ${customerName}</p>
    ${productDetails}
    <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
    <p><strong>Discount:</strong> ₱${discount.toFixed(2)}</p>
    <p><strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}</p>
    <p><strong>Final Amount:</strong> ₱${finalAmount.toFixed(2)}</p>
  `;
});