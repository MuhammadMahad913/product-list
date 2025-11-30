let products = [];
let activeProducts = [];
let index = 0;

async function loadProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    products = data.map((p) => ({
      title: p.title,
      owner: p.category,
      price: p.price,
      image: p.image,
    }));

    activeProducts = [...products];
    index = 0;
    updateDisplay();
  } catch (err) {
    document.getElementById("productBox").innerHTML =
      "<h2>Failed to load products</h2>";
  }
}

function displayProduct(i) {
  const p = activeProducts[i];
  document.getElementById("productBox").innerHTML = `
      <img src="${p.image}" 
           style="width:150px; height:150px; object-fit:contain;
           margin-bottom:15px; border-radius:10px; background:#000;
           padding:10px; box-shadow:0 0 15px rgba(0,255,200,0.2);">
      <h2>${p.title}</h2>
      <p>Category: ${p.owner}</p>
      <p>Price: $${p.price}</p>
    `;
}

function filterProducts() {
  const priceFilter = document.getElementById("filterPrice").value;
  const ownerFilter = document.getElementById("filterOwner").value;

  activeProducts = products.filter((p) => {
    let priceOK =
      priceFilter === "all" ||
      (priceFilter === "low" && p.price < 50) ||
      (priceFilter === "mid" && p.price >= 50 && p.price <= 200) ||
      (priceFilter === "high" && p.price > 200);

    let ownerOK = ownerFilter === "all" || p.owner === ownerFilter;

    return priceOK && ownerOK;
  });

  if (activeProducts.length === 0) {
    document.getElementById("productBox").innerHTML =
      "<h2>No products found</h2>";
    return;
  }

  index = 0;
  updateDisplay();
}

function updateDisplay() {
  displayProduct(index);
}

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % activeProducts.length;
  updateDisplay();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + activeProducts.length) % activeProducts.length;
  updateDisplay();
});

document
  .getElementById("filterPrice")
  .addEventListener("change", filterProducts);
document
  .getElementById("filterOwner")
  .addEventListener("change", filterProducts);

loadProducts();
