window.addEventListener("load", function () {
    const loader = document.getElementById("loader-wrapper");
    loader.style.display = "none";
});

// Obtener referencias a elementos del DOM
const productList = document.getElementById('products');
const cartButton = document.getElementById('cart-button');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const purchaseModal = document.getElementById('purchase-modal');
const modalBuyButton = document.getElementById('modal-buy-button');
const modalCancelButton = document.getElementById('modal-cancel-button');

let cart = [];
let cartVisible = false;

// Función para renderizar los productos
function renderProducts(products) {
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        
        productList.appendChild(productItem);
    });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
        updateCartButton();
    }
}

// Función para quitar un producto del carrito
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
        updateCartButton();
    }
}

// Función para renderizar el carrito
function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name}: $${item.price}
            <button onclick="removeFromCart(${item.id})">Quitar</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });
    
    cartTotal.textContent = total;
}

// Función para actualizar el botón del carrito con la cantidad de productos
function updateCartButton() {
    const itemCount = cart.length;
    cartButton.textContent = `Carrito (${itemCount})`;
}

// Event listeners
cartButton.addEventListener('click', () => {
    cartVisible = !cartVisible;
    cartButton.classList.toggle('show-cart', cartVisible);
});

modalBuyButton.addEventListener('click', () => {
    alert('¡Gracias por tu compra!');
    cart = [];
    renderCart();
    updateCartButton();
    purchaseModal.style.display = 'none';
});

modalCancelButton.addEventListener('click', () => {
    purchaseModal.style.display = 'none';
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de realizar la compra.');
    } else {
        purchaseModal.style.display = 'block';
    }
});

// Cargar los productos desde los archivos JSON
let products = [];

fetch('ropa.json')
    .then(response => response.json())
    .then(ropaProducts => {
    fetch('belleza.json')
        .then(response => response.json())
        .then(bellezaProducts => {
        products = [...ropaProducts, ...bellezaProducts];
        renderProducts(products);
        });
    })
    .catch(error => console.error('Error loading products:', error));

    // Función para aplicar filtros de categoría
function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === 'all') {
        renderProducts(products); // Mostrar todos los productos si se selecciona 'Todas'
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        renderProducts(filteredProducts); // Mostrar productos de la categoría seleccionada
    }
}
