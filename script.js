const products = [
    { id: 1, name: "Max Burger & Fri", rest: "MaxWay", category: "fastfood", price: 45000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.8, isFav: false, discount: true },
    { id: 2, name: "Choyxona Palov", rest: "Besh Qozon", category: "milliy", price: 35000, img: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.9, isFav: false, discount: false },
    { id: 3, name: "Pepperoni Pitsa", rest: "Bellissimo", category: "pizza", price: 65000, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.7, isFav: false, discount: false },
    { id: 4, name: "Filadelfiya Sushi", rest: "Yapona Mama", category: "sushi", price: 85000, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.6, isFav: false, discount: false },
    { id: 5, name: "Shokoladli Keks", rest: "Safia", category: "shirinlik", price: 25000, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.5, isFav: false, discount: true },
    { id: 6, name: "Qarsildoq Jo'ja", rest: "KFC", category: "fastfood", price: 55000, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.8, isFav: false, discount: false },
    { id: 7, name: "Qozon Kabob", rest: "Rayhon", category: "milliy", price: 75000, img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.9, isFav: false, discount: false },
    { id: 8, name: "Margarita Pitsa", rest: "Chopar", category: "pizza", price: 50000, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.4, isFav: false, discount: true },
    { id: 9, name: "Tovuqli Lavash", rest: "Oqtepa Lavash", category: "fastfood", price: 28000, img: "https://images.unsplash.com/photo-1626804475297-4160cb1bc4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.5, isFav: false, discount: false },
    { id: 10, name: "Manti (5 dona)", rest: "Milliy Taomlar", category: "milliy", price: 30000, img: "https://images.unsplash.com/photo-1560159858-45e064e626e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", rating: 4.7, isFav: false, discount: false }
];

let cart = [];
let currentFilter = "all";
let searchQuery = "";
let currentSort = "popular";

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = "";
    
    let filtered = products.filter(p => {
        const matchCat = currentFilter === "all" || p.category === currentFilter;
        const matchSearch = p.name.toLowerCase().includes(searchQuery) || p.rest.toLowerCase().includes(searchQuery);
        return matchCat && matchSearch;
    });

    if (currentSort === "price_asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price_desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else {
        filtered.sort((a, b) => b.rating - a.rating); // popular
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 2rem;">Hech narsa topilmadi...</p>`;
        return;
    }
    
    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-img-wrap">
                    ${p.discount ? '<span class="discount-badge">-20%</span>' : ''}
                    <button class="fav-btn ${p.isFav ? 'active' : ''}" onclick="toggleFav(${p.id})">
                        <i class="${p.isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                </div>
                <div class="product-info">
                    <div class="restaurant-name"><i class="fas fa-store"></i> ${p.rest}</div>
                    <h3 class="product-title">${p.name}</h3>
                    <div class="product-meta">
                        <span><i class="fas fa-star"></i> ${p.rating}</span>
                        <div class="delivery-meta">
                            <span><i class="fas fa-motorcycle" style="color:var(--text-muted)"></i> Bepul</span>
                            <span><i class="fas fa-clock" style="color:var(--text-muted)"></i> 30-40 daq</span>
                        </div>
                    </div>
                    <div class="product-bottom">
                        <span class="product-price">${p.price.toLocaleString()} so'm</span>
                        <button class="add-to-cart" onclick="addToCart(${p.id})"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filterMenu(cat, btn) {
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = cat;
    renderProducts();
}

function sortProducts() {
    currentSort = document.getElementById("sortSelect").value;
    renderProducts();
}

function searchMenu(query) {
    searchQuery = query.toLowerCase();
    renderProducts();
}

function toggleFav(id) {
    const p = products.find(p => p.id === id);
    if(p) {
        p.isFav = !p.isFav;
        renderProducts();
        showToast(p.isFav ? "Sevimli taomlarga qo'shildi!" : "Sevimli taomlardan olib tashlandi.", "info");
        
        let favCount = products.filter(p => p.isFav).length;
        document.getElementById("favCount").innerText = favCount;
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateCart();
    document.getElementById("cartSidebar").classList.add("active");
    showToast(`${product.name} savatga qo'shildi!`, "success");
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCart();
}

function updateQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
        else updateCart();
    }
}

function updateCart() {
    const container = document.getElementById("cartItemsContainer");
    const countBadge = document.getElementById("cartCount");
    const totalSum = document.getElementById("cartTotalSum");
    const subtotalEl = document.getElementById("cartSubtotal");
    const summary = document.getElementById("cartSummary");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const freeDeliveryHint = document.getElementById("freeDeliveryHint");
    const deliveryFeeEl = document.getElementById("deliveryFee");
    
    let count = 0;
    let sum = 0;
    container.innerHTML = "";
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color: var(--text-muted); margin-top: 2rem;">Savatingiz bo'sh. Mazali taomlar qo'shing!</p>`;
        summary.style.display = "none";
        totalSum.innerText = "0 so'm";
        checkoutBtn.disabled = true;
    } else {
        summary.style.display = "block";
        checkoutBtn.disabled = false;
        
        cart.forEach(item => {
            count += item.qty;
            sum += item.qty * item.price;
            
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${(item.price * item.qty).toLocaleString()} so'm</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
        });

        subtotalEl.innerText = sum.toLocaleString() + " so'm";
        let deliveryFee = sum >= 100000 ? 0 : 15000;
        
        if (deliveryFee === 0) {
            deliveryFeeEl.innerText = "Bepul!";
            deliveryFeeEl.style.color = "#10b981";
            freeDeliveryHint.style.display = "none";
        } else {
            deliveryFeeEl.innerText = "15,000 so'm";
            deliveryFeeEl.style.color = "var(--text-dark)";
            freeDeliveryHint.style.display = "block";
            let diff = 100000 - sum;
            freeDeliveryHint.innerText = `Yana ${diff.toLocaleString()} so'mlik taom qo'shing va yetkazib berish bepul!`;
        }

        totalSum.innerText = (sum + deliveryFee).toLocaleString() + " so'm";
        document.getElementById("modalTotalSum").innerText = (sum + deliveryFee).toLocaleString();
    }
    
    countBadge.innerText = count;
}

// Toasts
function showToast(msg, type="success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${msg}`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modals
function openCheckout() {
    if(cart.length === 0) return;
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("checkoutModal").classList.add("active");
}
function closeCheckout() {
    document.getElementById("checkoutModal").classList.remove("active");
}

function openAddressModal() {
    document.getElementById("addressModal").classList.add("active");
}
function closeAddressModal() {
    document.getElementById("addressModal").classList.remove("active");
}

function saveAddress() {
    const val = document.getElementById("newAddressInput").value;
    if(val.trim() !== "") {
        document.getElementById("currentAddress").innerHTML = val + ' <i class="fas fa-chevron-down"></i>';
        document.getElementById("checkoutAddress").value = val;
        closeAddressModal();
        showToast("Manzil saqlandi!", "success");
    }
}

// Payment Select
document.querySelectorAll(".pay-opt").forEach(opt => {
    opt.addEventListener("click", function() {
        document.querySelectorAll(".pay-opt").forEach(o => o.classList.remove("active"));
        this.classList.add("active");
        this.querySelector("input").checked = true;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    
    document.getElementById("openCartBtn").addEventListener("click", () => {
        document.getElementById("cartSidebar").classList.add("active");
    });
    
    document.getElementById("closeCartBtn").addEventListener("click", () => {
        document.getElementById("cartSidebar").classList.remove("active");
    });

    // Search events
    const s1 = document.getElementById("searchInput");
    if(s1) s1.addEventListener("input", (e) => searchMenu(e.target.value));
    const s2 = document.getElementById("mobileSearchInput");
    if(s2) s2.addEventListener("input", (e) => searchMenu(e.target.value));

    // Form submit
    document.getElementById("checkoutForm").addEventListener("submit", (e) => {
        e.preventDefault();
        closeCheckout();
        cart = [];
        updateCart();
        
        showToast("Buyurtma rasmiylashtirildi!", "success");
        setTimeout(() => {
            startOrderSimulation();
        }, 800);
    });
});

// Login Modal
function openLogin() {
    document.getElementById("loginModal").classList.add("active");
}
function closeLogin() {
    document.getElementById("loginModal").classList.remove("active");
}
function fillLogin() {
    document.getElementById("loginUsername").value = "User";
    document.getElementById("loginPassword").value = "user1234";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if(loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = document.getElementById("loginUsername").value;
            const pass = document.getElementById("loginPassword").value;
            
            if(user === "User" && pass === "user1234") {
                closeLogin();
                document.getElementById("userProfileName").innerText = "User";
                showToast("Tizimga muvaffaqiyatli kirdingiz!", "success");
            } else {
                showToast("Login yoki parol noto'g'ri!", "error");
            }
        });
    }
});

// Order Tracking Simulation
let trackingInterval;

function openTracking() {
    document.getElementById("trackingModal").classList.add("active");
}
function closeTracking() {
    document.getElementById("trackingModal").classList.remove("active");
}

function startOrderSimulation() {
    openTracking();
    const steps = [1, 2, 3, 4];
    let currentStep = 1;
    
    // Reset
    steps.forEach(s => {
        document.getElementById("step" + s).className = "timeline-step";
        document.getElementById("time" + s).innerText = "";
    });
    
    // Set initial step
    document.getElementById("step1").classList.add("active");
    
    clearInterval(trackingInterval);
    trackingInterval = setInterval(() => {
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
        
        document.getElementById("step" + currentStep).classList.remove("active");
        document.getElementById("step" + currentStep).classList.add("completed");
        document.getElementById("time" + currentStep).innerText = timeStr;
        
        currentStep++;
        
        if (currentStep <= 4) {
            document.getElementById("step" + currentStep).classList.add("active");
        } else {
            clearInterval(trackingInterval);
            showToast("Buyurtmangiz yetkazildi. Yoqimli ishtaha!", "success");
        }
    }, 4000); // Har 4 soniyada keyingi bosqichga o'tadi (test uchun)
}
