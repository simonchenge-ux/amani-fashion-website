// Product data for the website
const fashionProducts = [
    {
        id: 1,
        name: "Kente Print Dress",
        price: "$89.99",
        category: "fashion",
        icon: "👗"
    },
    {
        id: 2,
        name: "African Print Jacket",
        price: "$75.50",
        category: "fashion",
        icon: "🧥"
    },
    {
        id: 3,
        name: "Ankara Skirt Set",
        price: "$65.00",
        category: "fashion",
        icon: "👘"
    },
    {
        id: 4,
        name: "Embroidered Blouse",
        price: "$55.25",
        category: "fashion",
        icon: "👚"
    }
];

const jewelryProducts = [
    {
        id: 5,
        name: "Gold Beaded Necklace",
        price: "$45.99",
        category: "jewelry",
        icon: "📿"
    },
    {
        id: 6,
        name: "Silver Tribal Earrings",
        price: "$32.50",
        category: "jewelry",
        icon: "💍"
    },
    {
        id: 7,
        name: "Beaded Bracelet Set",
        price: "$28.75",
        category: "jewelry",
        icon: "🔗"
    },
    {
        id: 8,
        name: "Statement Waist Beads",
        price: "$39.99",
        category: "jewelry",
        icon: "✨"
    }
];

// Cart functionality
let cart = [];

// Display products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts('fashion', fashionProducts);
    displayProducts('jewelry', jewelryProducts);
    setupEventListeners();
});

function displayProducts(sectionId, products) {
    const section = document.getElementById(sectionId);
    const productGrid = section.querySelector('.product-grid');
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-img">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">${product.price}</div>
                <button class="buy-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            alert('Added to cart!');
        }
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some items first!');
        } else {
            // In a real implementation, this would redirect to payment gateway
            alert(`Proceeding to checkout with ${cart.length} items. Total: $${calculateTotal()}`);
            
            // Simulate payment process (replace with real payment integration)
            simulatePayment();
        }
    });
    
    // Cart button
    document.querySelector('.cart-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty');
        } else {
            const itemList = cart.map(item => `• ${item.name} - ${item.price}`).join('\n');
            alert(`Cart Items:\n${itemList}\n\nTotal: $${calculateTotal()}`);
        }
    });
}

function addToCart(productId) {
    const allProducts = [...fashionProducts, ...jewelryProducts];
    const product = allProducts.find(p => p.id === productId);
    
    if (product) {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace('$', ''))
        });
        updateCartDisplay();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

function updateCartDisplay() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> Cart (${cart.length})`;
}

// Simulated payment function (for demonstration)
function simulatePayment() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const originalText = checkoutBtn.textContent;
    
    checkoutBtn.textContent = 'Processing Payment...';
    checkoutBtn.disabled = true;
    
    // Simulate API call to payment gateway
    setTimeout(() => {
        alert('Payment Successful! Thank you for your purchase.');
        cart = [];
        updateCartDisplay();
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
    }, 2000);
}
