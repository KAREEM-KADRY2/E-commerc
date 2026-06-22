// Data
const categories = [
    { id: 'mens', name: "Men's Clothing", icon: 'shirt', count: '5,240 products', image: 'https://images.unsplash.com/photo-1550614000-4b95d4ed798a?w=400&q=80' },
    { id: 'womens', name: "Women's Clothing", icon: 'shopping-bag', count: '4,340 products', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80' },
    { id: 'shoes', name: "Shoes", icon: 'footprints', count: '970 products', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { id: 'watches', name: "Watches", icon: 'watch', count: '432 products', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80' },
    { id: 'electronics', name: "Electronics", icon: 'smartphone', count: '5,540 products', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80' },
    { id: 'audio', name: "Audio", icon: 'headphones', count: '462 products', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
    { id: 'laptops', name: "Laptops", icon: 'laptop', count: '432 products', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80' }
];

const products = [
    { id: 1, name: 'Galaxy Z Fold 5', category: 'electronics', price: 79199, oldPrice: 89999, cashback: 7920, discount: '-22%', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80' },
    { id: 2, name: 'Premium Hoodie', category: 'mens', price: 1199, oldPrice: 1499, cashback: 120, discount: '-20%', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
    { id: 3, name: 'Wireless Headphones', category: 'audio', price: 3825, oldPrice: 4500, cashback: 383, discount: '-15%', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80' },
    { id: 4, name: 'Air Force Sneakers', category: 'shoes', price: 2880, oldPrice: 3600, cashback: 288, discount: '-20%', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
    { id: 5, name: 'Chronograph Watch', category: 'watches', price: 4358, oldPrice: 6225, cashback: 437, discount: '-30%', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80' },
    { id: 6, name: 'Smartphone Pro Max', category: 'electronics', price: 46800, oldPrice: 52000, cashback: 4680, discount: '-10%', image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&q=80' },
    { id: 7, name: 'Leather Jacket', category: 'mens', price: 3432, oldPrice: 4038, cashback: 343, discount: '-15%', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
    { id: 8, name: 'Ultrabook 14"', category: 'laptops', price: 36960, oldPrice: 41000, cashback: 3696, discount: '-10%', image: 'https://images.unsplash.com/photo-1531297172864-45dc60645900?w=400&q=80' },
    { id: 9, name: 'Cotton Crew Tee', category: 'mens', price: 449, oldPrice: 599, cashback: 45, discount: '-25%', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
    { id: 10, name: 'Leather Dress Shoes', category: 'shoes', price: 2040, oldPrice: 2400, cashback: 204, discount: '-15%', image: 'https://images.unsplash.com/photo-1614252235316-2313d11b22e1?w=400&q=80' }
];

// State
let cart = [];
let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const categoriesGrid = document.getElementById('categoriesGrid');
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCashback = document.getElementById('cartCashback');
const cartBadge = document.getElementById('cartBadge');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Squad Simulator Elements
const startSquadBtn = document.getElementById('startSquadBtn');
const squadModalOverlay = document.getElementById('squadModalOverlay');
const squadModal = document.getElementById('squadModal');
const closeSquadModalBtn = document.getElementById('closeSquadModalBtn');
const simulateInviteBtn = document.getElementById('simulateInviteBtn');
const squadMembersList = document.getElementById('squadMembersList');
const squadProgressFill = document.getElementById('squadProgressFill');
const squadCashbackText = document.getElementById('squadCashbackText');
const squadSuccessMsg = document.getElementById('squadSuccessMsg');

// Helpers
const formatPrice = (num) => new Intl.NumberFormat('en-AE').format(num) + ' AED';

// Initialize
function init() {
    renderCategories();
    renderProducts();
    setupEventListeners();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Render Categories
function renderCategories() {
    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" data-id="${cat.id}">
            <div class="category-img-wrapper">
                <img src="${cat.image}" alt="${cat.name}">
                <div class="category-icon">
                    <i data-lucide="${cat.icon}"></i>
                </div>
            </div>
            <div class="category-info">
                <h3>${cat.name}</h3>
                <p>${cat.count}</p>
            </div>
        </div>
    `).join('');
    
    // Add "More Categories" card
    categoriesGrid.innerHTML += `
        <div class="category-card category-card-more">
            <div class="more-content">
                <i data-lucide="layout-grid" style="width: 32px; height: 32px;"></i>
                <span>More Categories</span>
            </div>
        </div>
    `;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Category click listeners
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            if (id) {
                currentCategory = id;
                renderProducts();
                showToast(`Showing ${categories.find(c => c.id === id).name}`);
                
                // Scroll to products
                document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Render Products
function renderProducts() {
    let filteredProducts = products;
    
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }
    
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
                <i data-lucide="search-X" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or category filter</p>
                <button class="btn btn-outline" style="color: var(--primary-color); border-color: var(--primary-color); margin-top: 16px;" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-badge-discount">${product.discount}</div>
            <button class="product-share-btn" onclick="shareProduct('${product.name}')">
                <i data-lucide="share-2"></i>
            </button>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-row">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <span class="product-old-price">${formatPrice(product.oldPrice)}</span>
                </div>
                <div class="product-cashback">
                    <i data-lucide="zap"></i> +${formatPrice(product.cashback)} cashback
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary w-full" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.resetFilters = function() {
    currentCategory = 'all';
    searchQuery = '';
    searchInput.value = '';
    renderProducts();
}

window.shareProduct = function(name) {
    showToast(`Link for ${name} copied!`);
}

// Cart Logic
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showToast(`${product.name} added to cart`);
    openCart();
}

window.updateQuantity = function(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    updateCartUI();
}

window.removeFromCart = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Update Items List
    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        cartItemsContainer.querySelectorAll('.cart-item').forEach(el => el.remove());
    } else {
        emptyCart.classList.add('hidden');
        
        // Retain empty cart element, remove items
        const itemsHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Remove existing items and prepend new ones
        cartItemsContainer.querySelectorAll('.cart-item').forEach(el => el.remove());
        cartItemsContainer.insertAdjacentHTML('beforeend', itemsHTML);
    }
    
    // Update Summary
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCashback = cart.reduce((sum, item) => sum + (item.cashback * item.quantity), 0);
    
    cartSubtotal.textContent = formatPrice(subtotal);
    cartCashback.textContent = '+' + formatPrice(totalCashback);
}

// Drawer Controls
function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('open');
}

function closeCart() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('open');
}

// Toast
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Squad Simulator
let squadCount = 1;
const squadMembers = [
    { name: 'Ali', color: 'bg-green' },
    { name: 'Sara', color: 'bg-orange' },
    { name: 'Omar', color: 'bg-primary' },
    { name: 'Nour', color: 'bg-teal' }
];

function openSquadModal() {
    squadModalOverlay.classList.add('active');
}

function closeSquadModal() {
    squadModalOverlay.classList.remove('active');
}

function simulateInvite() {
    if (squadCount > 4) return;
    
    const newMember = squadMembers[squadCount - 1];
    const memberHTML = `
        <div class="squad-member slide-in">
            <div class="avatar" style="background-color: var(--primary-color)">${newMember.name.substring(0, 2).toUpperCase()}</div>
            <span>${newMember.name} joined</span>
        </div>
    `;
    squadMembersList.insertAdjacentHTML('beforeend', memberHTML);
    
    squadCount++;
    
    // Update progress
    const progressPercent = Math.min((squadCount / 5) * 100, 100);
    squadProgressFill.style.width = `${progressPercent}%`;
    
    // Update text
    const cashbackVal = 5 + (squadCount - 1) * 1.25; // Simple simulation calculation
    squadCashbackText.textContent = `${cashbackVal}% Cashback`;
    
    // Success state
    if (squadCount > 4) {
        simulateInviteBtn.classList.add('hidden');
        squadSuccessMsg.classList.remove('hidden');
        squadProgressFill.style.width = `100%`;
        squadCashbackText.textContent = `10% Cashback (MAX)`;
        
        // Trigger confetti or success toast
        showToast("Squad completed! You earned the max 10% cashback tier.");
    }
}

// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });
    
    // Cart
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    document.getElementById('startShoppingBtn').addEventListener('click', () => {
        closeCart();
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Squad Simulator
    startSquadBtn.addEventListener('click', openSquadModal);
    closeSquadModalBtn.addEventListener('click', closeSquadModal);
    squadModalOverlay.addEventListener('click', (e) => {
        if (e.target === squadModalOverlay) closeSquadModal();
    });
    simulateInviteBtn.addEventListener('click', simulateInvite);
}

// Run
document.addEventListener('DOMContentLoaded', init);
