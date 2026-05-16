
// 1. Data Logic
const defaultProducts = [
    { name: 'Premium SaaS Template', price: 150000, thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', desc: 'React 18 + Tailwind 3. Full SEO.', tag: 'Flash Sale' },
    { name: 'Social Media Bundle', price: 75000, thumb: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80', desc: '100+ Instagram Post & Story templates.', tag: 'Best Seller' },
    { name: 'E-Book: Master Freelancing', price: 120000, thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', desc: 'Panduan lengkap karir internasional.', tag: 'Design' }
];

let localData = JSON.parse(localStorage.getItem('digital_market_products'));
let displayProducts = localData && localData.length > 0 ? localData : defaultProducts;

const productList = document.getElementById('product-list');
if(productList) {
    productList.innerHTML = displayProducts.map((p, index) => `
        <div class="product-card bg-white rounded-[2.5rem] p-4 border border-slate-100 group">
            <div class="aspect-video bg-blue-50 rounded-[2rem] relative overflow-hidden mb-6">
                <img src="${p.thumb}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                <div class="absolute top-4 left-4 flex gap-2">
                    <span class="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">${p.tag}</span>
                </div>
            </div>
            <div class="px-2">
                <div class="flex items-center gap-1 text-yellow-400 mb-2 text-[10px]">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
                <h3 class="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition tracking-tight">${p.name}</h3>
                <p class="text-slate-400 text-sm mt-2 leading-relaxed font-medium line-clamp-2">${p.desc}</p>
                <div class="mt-8 flex justify-between items-center">
                    <div>
                        <span class="text-slate-300 text-[10px] block font-bold line-through">Rp ${(p.price * 1.5).toLocaleString()}</span>
                        <span class="text-2xl font-black text-slate-900 tracking-tighter">Rp ${parseInt(p.price).toLocaleString()}</span>
                    </div>
                    <button onclick="addToCart(${index}, '${p.name}', ${p.price})" class="w-12 h-12 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition shadow-xl flex items-center justify-center">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 2. Cart & UI Logic
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const checkoutModal = document.getElementById('checkout-modal');

function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

function addToCart(id, name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) { existing.quantity += 1; } else { cart.push({ name, price, quantity: 1 }); }
    updateUI();
    cartCount.classList.remove('hidden');
    if (cartSidebar.classList.contains('translate-x-full')) toggleCart();
}

function updateUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    if (totalItems === 0) cartCount.classList.add('hidden');
    cartItems.innerHTML = cart.length === 0 ? '<div class="text-center mt-20 text-slate-400 font-bold">KOSONG</div>' : 
        cart.map((item, index) => `
            <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl group">
                <div class="flex-1">
                    <h4 class="font-bold text-slate-900 text-sm truncate">${item.name}</h4>
                    <p class="text-xs font-bold text-blue-600 mt-1">Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-slate-300 hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `Rp ${total.toLocaleString()}`;
}

function removeFromCart(index) { cart.splice(index, 1); updateUI(); }
function openCheckout() { if (cart.length === 0) return; checkoutModal.classList.remove('hidden'); }
function closeCheckout() { checkoutModal.classList.add('hidden'); }

function handlePayment(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let order = `*ORDER BARU - DIGITALPRO*\nNama: ${name}\nTotal: Rp ${total.toLocaleString()}\n\nItems:\n`;
    cart.forEach((it, i) => order += `${i+1}. ${it.name} (${it.quantity}x)\n`);
    window.open(`https://wa.me/6283107894336?text=${encodeURIComponent(order)}`, '_blank');
    cart = []; updateUI(); closeCheckout();
}

// 3. Marketing Gimmicks (CUAN)
// Countdown Timer
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (--timer < 0) timer = duration;
    }, 1000);
}
startTimer(14400, document.getElementById('countdown'));

// Social Proof
const sales = ["Ahmad (Jakarta)", "Siti (Bandung)", "Budi (Surabaya)", "Rian (Medan)", "Dewi (Bali)"];
const products = ["Premium SaaS", "E-Book Freelance", "Social Media Bundle", "AI Script"];
const proofEl = document.getElementById('social-proof');
const proofTxt = document.getElementById('proof-text');

setInterval(() => {
    const s = sales[Math.floor(Math.random() * sales.length)];
    const p = products[Math.floor(Math.random() * products.length)];
    proofTxt.innerText = `${s} baru saja membeli ${p}...`;
    proofEl.style.transform = "translateX(0)";
    setTimeout(() => { proofEl.style.transform = "translateX(-150%)"; }, 4000);
}, 15000);
