
// Load products from LocalStorage or use defaults
const defaultProducts = [
    { id: 1, name: 'Premium SaaS Template', price: 150000, thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', desc: 'React 18 + Tailwind 3 + Framer Motion. SEO friendly & Light speed.', tag: 'Premium Code' },
    { id: 2, name: 'Social Media Bundle', price: 75000, thumb: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80', desc: '100+ Instagram Post & Story templates. Canva & Figma files included.', tag: 'Design Kit' },
    { id: 3, name: 'E-Book: Master Freelancing', price: 120000, thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', desc: 'Panduan lengkap berkarir di platform internasional dengan gaji 6-digit.', tag: 'Best Seller' }
];

let localData = JSON.parse(localStorage.getItem('digital_market_products'));
let displayProducts = localData && localData.length > 0 ? localData : defaultProducts;

// Render Products Dynamic
const productList = document.getElementById('product-list');
if(productList) {
    productList.innerHTML = displayProducts.map((p, index) => `
        <div class="product-card bg-white rounded-[2rem] p-3 border border-slate-100 group">
            <div class="aspect-video bg-blue-50 rounded-[1.5rem] flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <img src="${p.thumb || p.thumbnail}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 left-4">
                    <span class="badge bg-blue-600 text-white shadow-lg">${p.tag || 'Digital Asset'}</span>
                </div>
            </div>
            <div class="p-5">
                <div class="flex items-center gap-1 text-yellow-400 mb-3 text-sm">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
                <h3 class="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition">${p.name}</h3>
                <p class="text-slate-500 text-sm mt-3 leading-relaxed font-medium">${p.desc || p.description}</p>
                <div class="mt-8 flex justify-between items-center">
                    <div>
                        <span class="text-2xl font-extrabold text-slate-900 tracking-tighter">Rp ${parseInt(p.price).toLocaleString()}</span>
                    </div>
                    <button onclick="addToCart(${index}, '${p.name}', ${p.price})" class="w-12 h-12 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition duration-300 flex items-center justify-center shadow-xl">
                        <i class="fa-solid fa-plus text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const checkoutModal = document.getElementById('checkout-modal');
const cartItemsCountText = document.getElementById('cart-items-count-text');

function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

function addToCart(id, name, price) {
    const existing = cart.find(item => item.name === name); // Use name since ID might conflict with local storage index
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateUI();
    cartCount.classList.remove('hidden');
    if (cartSidebar.classList.contains('translate-x-full')) {
        toggleCart();
    }
}

function updateUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    if(cartItemsCountText) cartItemsCountText.innerText = `${totalItems} ITEM TERPILIH`;
    if (totalItems === 0) cartCount.classList.add('hidden');

    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-center"><h3 class="text-lg font-bold text-slate-900">Keranjang Kosong</h3></div>`;
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                <div class="flex-1 min-w-0">
                    <h4 class="font-extrabold text-slate-900 text-sm truncate">${item.name}</h4>
                    <p class="text-xs font-bold text-blue-600 mt-0.5">Rp ${item.price.toLocaleString()} <span class="text-slate-400 font-medium ml-1">x ${item.quantity}</span></p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-slate-300 hover:text-red-500"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `).join('');
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `Rp ${total.toLocaleString()}`;
}

function removeFromCart(index) { cart.splice(index, 1); updateUI(); }
function openCheckout() { if (cart.length === 0) return; checkoutModal.classList.remove('hidden'); }
function closeCheckout() { checkoutModal.classList.add('hidden'); }

function handlePayment(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let orderSummary = `*DIGITALPRO - ORDER*\nNama: ${name}\nTotal: Rp ${total.toLocaleString()}\n\nItems:\n`;
    cart.forEach((item, i) => { orderSummary += `${i+1}. ${item.name} (${item.quantity}x)\n`; });
    const phoneNumber = "6283107894336"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderSummary)}`, '_blank');
    cart = []; updateUI(); closeCheckout();
}
