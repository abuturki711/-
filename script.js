let cart = {};

function openSect(name, price, folder) {
    document.getElementById('mainGrid').style.display = 'none';
    document.getElementById('productView').style.display = 'block';
    document.getElementById('sectTitle').innerText = name;
    const slider = document.getElementById('productSlider');
    slider.innerHTML = '';

    // توليد 30 منتج داخل القسم المختار
    for (let i = 1; i <= 30; i++) {
        let id = `${name}-${i}`;
        let q = cart[id] ? cart[id].qty : "";
        slider.innerHTML += `
        <div class="p-card">
            <img src="${folder}/1 (${i}).jpg" onerror="this.src='logo.jpg'">
            <p>موديل رقم ${i}</p>
            <input type="number" placeholder="الكمية" value="${q}" oninput="updateCart('${id}', this.value, ${price})">
        </div>`;
    }
}

function updateCart(id, qty, price) {
    qty = parseInt(qty);
    if (qty > 0) {
        cart[id] = { qty, price };
    } else {
        delete cart[id];
    }

    // حساب الإجمالي
    let total = 0;
    for (let k in cart) {
        total += cart[k].qty * cart[k].price;
    }
    document.getElementById('totalVal').innerText = `$${total.toFixed(2)}`;
}

function closeSect() {
    document.getElementById('mainGrid').style.display = 'block';
    document.getElementById('productView').style.display = 'none';
}

function sendWhatsApp() {
    if (Object.keys(cart).length === 0) {
        return alert("السلة فارغة، يرجى اختيار بعض المنتجات أولاً");
    }

    let msg = `*طلب شراء من نوفارا بريميوم*\n---\n`;
    for (let k in cart) {
        msg += `▫️ ${k} | كمية: ${cart[k].qty}\n`;
    }
    msg += `---\n*الإجمالي:* ${document.getElementById('totalVal').innerText}`;

    // رقم الواتساب الخاص بك
    const phoneNumber = "96737551395";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`);
}