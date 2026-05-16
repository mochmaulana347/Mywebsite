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
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateUI();
    
    // Show cart count
    cartCount.classList.remove('hidden');
    
    // Auto open cart
    if (cartSidebar.classList.contains('translate-x-full')) {
        toggleCart();
    }
}

function updateUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    cartItemsCountText.innerText = `${totalItems} ITEM TERPILIH`;
    
    if (totalItems === 0) {
        cartCount.classList.add('hidden');
    }

    // Update Items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center">
                <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <i class="fa-solid fa-cart-flatbed text-slate-200 text-4xl"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900">Keranjang Kosong</h3>
                <p class="text-slate-400 text-sm mt-1">Ayo tambahkan aset digital pertamamu!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm font-bold text-blue-600">
                    <i class="fa-solid fa-file-code text-2xl"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-extrabold text-slate-900 text-sm truncate">${item.name}</h4>
                    <p class="text-xs font-bold text-blue-600 mt-0.5">Rp ${item.price.toLocaleString()} <span class="text-slate-400 font-medium ml-1">x ${item.quantity}</span></p>
                </div>
                <button onclick="removeFromCart(${index})" class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `Rp ${total.toLocaleString()}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateUI();
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Keranjang Anda masih kosong!");
        return;
    }
    checkoutModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeCheckout() {
    checkoutModal.classList.add('hidden');
    if (cartSidebar.classList.contains('translate-x-full')) {
        document.body.classList.remove('overflow-hidden');
    }
}

function handlePayment(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    
    // Calculate final total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Build order summary for WhatsApp
    let orderSummary = `*DIGITALPRO - KONFIRMASI PESANAN*\n`;
    orderSummary += `--------------------------------------\n`;
    orderSummary += `*Nama:* ${name}\n`;
    orderSummary += `*WhatsApp:* ${whatsapp}\n`;
    orderSummary += `*Email:* ${email}\n`;
    orderSummary += `--------------------------------------\n\n`;
    orderSummary += `*ITEM PESANAN:*\n`;
    
    cart.forEach((item, i) => {
        orderSummary += `${i+1}. ${item.name} (${item.quantity}x)\n`;
    });
    
    orderSummary += `\n*TOTAL BAYAR: Rp ${total.toLocaleString()}*\n`;
    orderSummary += `--------------------------------------\n`;
    orderSummary += `Mohon instruksi untuk metode pembayaran. Terima kasih.`;

    const encodedMsg = encodeURIComponent(orderSummary);
    const phoneNumber = "6283107894336"; // GANTI DENGAN NOMOR WA ANDA
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
    
    // Reset state
    cart = [];
    updateUI();
    closeCheckout();
    if (!cartSidebar.classList.contains('translate-x-full')) {
        toggleCart();
    }
    
    alert("Pesanan dikirim! Silakan selesaikan chat di WhatsApp untuk proses pembayaran.");
}
