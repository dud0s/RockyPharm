// ---------- ТОВАРЫ (14 штук, с описанием и составом) ----------
const products = [
    { id: 1, name: "Whey Gold Standard", category: "protein", price: 3490, unit: "900г", img: "WheyGoldStandard.jpg", description: "Сывороточный протеин высшего качества. Быстро усваивается, идеален после тренировки.", composition: "Концентрат сывороточного протеина, изолят, ароматизатор, эмульгатор." },
    { id: 2, name: "BCAA 2:1:1", category: "amino", price: 1890, unit: "250г", img: "BCAA211.jpg", description: "Аминокислоты с разветвлёнными цепями для защиты мышц от катаболизма.", composition: "Лейцин, изолейцин, валин (2:1:1), подсластитель." },
    { id: 3, name: "True Mass Gainer", category: "gainer", price: 2490, unit: "1.5кг", img: "MassGainerPro.jpg", description: "Высококалорийная смесь для набора массы. Содержит белки, углеводы и креатин.", composition: "Протеиновая смесь, мальтодекстрин, креатин, витамины группы B." },
    { id: 4, name: "Creatine Monohydrate", category: "creatine", price: 990, unit: "300г", img: "CreatineMonohydrate.jpg", description: "Креатин моногидрат для увеличения силы и выносливости.", composition: "100% креатин моногидрат." },
    { id: 5, name: "Omega-3", category: "vitamin", price: 1290, unit: "60 капс", img: "Omega-3.jpg", description: "Рыбий жир Омега-3 для сердца и суставов.", composition: "ЭПК и ДГК, желатин, глицерин." },
    { id: 6, name: "Protein Bar", category: "snack", price: 120, unit: "50г", img: "ProteinBar.jpg", description: "Протеиновый батончик без сахара. Отличный перекус после тренировки.", composition: "Сывороточный протеин, орехи, какао-масло." },
    { id: 7, name: "Isolate Zero", category: "protein", price: 3990, unit: "900г", img: "IsolateZero.jpg", description: "Изолят сывороточного протеина. Минимум жиров и углеводов.", composition: "Изолят сывороточного протеина, лецитин." },
    { id: 8, name: "L-Carnitine", category: "vitamin", price: 1590, unit: "300мл", img: "L-Carnitin.jpg", description: "Жидкий L-карнитин для жиросжигания и энергии.", composition: "L-карнитин тартрат, вода, ароматизатор." },
    { id: 9, name: "Amino Xplode", category: "amino", price: 2200, unit: "300г", img: "AminoXplode.jpg", description: "Комплекс аминокислот с электролитами. Внутритренировочная поддержка.", composition: "Гидролизат белка, лейцин, изолейцин, валин." },
    { id: 10, name: "Mass Gainer Pro", category: "gainer", price: 2990, unit: "2кг", img: "MassGainerPro.jpg", description: "Гейнер с повышенным содержанием белка и медленными углеводами.", composition: "Мультикомпонентный протеин, медленные углеводы, BCAA." },
    { id: 11, name: "ZMA Night", category: "vitamin", price: 1350, unit: "90 капс", img: "ZMANight.jpg", description: "Цинк-магний-В6 для качественного восстановления во сне.", composition: "Цинк, магний, витамин B6." },
    { id: 12, name: "Creatine Caps", category: "creatine", price: 1190, unit: "120 капс", img: "CreatineCaps.jpg", description: "Креатин в капсулах. Удобно пить без загрузки.", composition: "Креатин моногидрат, желатиновая оболочка." },
    { id: 13, name: "Vegan Protein", category: "protein", price: 3490, unit: "800г", img: "VeganProtein.jpg", description: "Растительный протеин из гороха и риса. Без лактозы.", composition: "Гороховый протеин, рисовый протеин, кокосовый сахар." },
    { id: 14, name: "Nut Bar", category: "snack", price: 90, unit: "40г", img: "NutBar.jpg", description: "Ореховый батончик с медом. Энергия и белок.", composition: "Арахис, миндаль, мед, сывороточный протеин." }
];

// ---------- ПЕРЕМЕННЫЕ состояния ----------
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentSearch = '';

// ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
function catName(cat) {
    const map = { protein:'ПРОТЕИНЫ', amino:'АМИНОКИСЛОТЫ', gainer:'ГЕЙНЕРЫ', snack:'СНЭКИ', vitamin:'ВИТАМИНЫ', creatine:'КРЕАТИН' };
    return map[cat] || cat;
}

// ---------- ОТРИСОВКА ТОВАРОВ НА ГЛАВНОЙ ----------
function renderProducts() {
    let filtered = products.filter(p => {
        if (currentCategory !== 'all' && p.category !== currentCategory) return false;
        if (currentSearch && !p.name.toLowerCase().includes(currentSearch.toLowerCase())) return false;
        return true;
    });
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    if (!filtered.length) {
        grid.innerHTML = '<div style="text-align:center; grid-column:1/-1;">Нет товаров</div>';
        return;
    }
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-img">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="product-info">
                <div class="product-category">${catName(p.category)}</div>
                <div class="product-title">${p.name}</div>
                <div class="product-price">${p.price.toLocaleString()} ₽ <span>/${p.unit}</span></div>
                <button class="btn add-to-cart">В корзину</button>
                <a href="product.html?id=${p.id}" class="btn-outline" style="margin-top:0.5rem; display:inline-block;">Подробнее</a>
            </div>
        </div>
    `).join('');
    
    // обработчики кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.product-card');
            const id = parseInt(card.dataset.id);
            const product = products.find(p => p.id === id);
            const existing = cart.find(i => i.id === id);
            if (existing) existing.quantity++;
            else cart.push({ id, name: product.name, price: product.price, quantity: 1 });
            saveCart();
            updateCartUI();
        });
    });
}

// ---------- КОРЗИНА ----------
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}
function updateCartCounter() {
    const total = cart.reduce((s,i) => s + i.quantity, 0);
    const span = document.getElementById('cartCount');
    if (span) span.innerText = total;
}
function updateCartUI() {
    updateCartCounter();
    const container = document.getElementById('cartItemsList');
    const totalSpan = document.getElementById('cartTotal');
    if (!cart.length) {
        if (container) container.innerHTML = '<div style="text-align:center;">Корзина пуста</div>';
        if (totalSpan) totalSpan.innerText = 'Итого: 0 ₽';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        html += `
            <div class="cart-item">
                <div><strong>${item.name}</strong><br>${item.price} ₽ × ${item.quantity}</div>
                <div class="cart-item-actions">
                    <button class="cart-inc" data-id="${item.id}">+</button>
                    <button class="cart-dec" data-id="${item.id}">-</button>
                    <button class="cart-del" data-id="${item.id}">🗑</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    totalSpan.innerText = `Итого: ${total} ₽`;
    
    document.querySelectorAll('.cart-inc').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item) item.quantity++;
            saveCart(); updateCartUI();
        };
    });
    document.querySelectorAll('.cart-dec').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item && item.quantity > 1) item.quantity--;
            else if (item && item.quantity === 1) cart = cart.filter(i => i.id !== id);
            saveCart(); updateCartUI();
        };
    });
    document.querySelectorAll('.cart-del').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            cart = cart.filter(i => i.id !== id);
            saveCart(); updateCartUI();
        };
    });
}
function checkout() {
    if (!cart.length) { alert('Корзина пуста'); return; }
    const total = cart.reduce((s,i) => s + i.price*i.quantity, 0);
    alert(`Заказ оформлен! Сумма: ${total} ₽. Спасибо за покупку!`);
    cart = [];
    saveCart();
    updateCartUI();
    document.getElementById('cartModal').classList.remove('active');
}

// ---------- ИНИЦИАЛИЗАЦИЯ ГЛАВНОЙ СТРАНИЦЫ ----------
function initMain() {
    renderProducts();
    updateCartUI();

    // Категории (фильтрация)
    const catLinks = document.querySelectorAll('.category-link');
    catLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = link.getAttribute('data-category');
            currentCategory = cat;
            catLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderProducts();
        });
    });

    // Поиск
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const doSearch = () => {
        currentSearch = searchInput.value;
        renderProducts();
    };
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') doSearch(); });

    // Модалка корзины
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCartBtn');
    cartIcon.onclick = () => cartModal.classList.add('active');
    closeCart.onclick = () => cartModal.classList.remove('active');
    cartModal.onclick = (e) => { if (e.target === cartModal) cartModal.classList.remove('active'); };
    document.getElementById('checkoutBtn').onclick = checkout;

    // Кнопка "В каталог" в hero
    const heroBtn = document.getElementById('heroBtn');
    if (heroBtn) {
        heroBtn.onclick = () => document.querySelector('.products-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// ---------- СТРАНИЦА ТОВАРА (product.html) ----------
function initProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    const container = document.getElementById('productDetail');
    if (!container) return;
    if (product) {
        container.innerHTML = `
            <div class="product-detail-content">
                <div class="product-detail-image">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <h1 class="product-detail-title">${product.name}</h1>
                    <div class="product-detail-category">${catName(product.category)}</div>
                    <div class="product-detail-price">${product.price.toLocaleString()} ₽ <span style="font-size:1rem;">/${product.unit}</span></div>
                    <div class="product-detail-description"><strong>Описание:</strong><br>${product.description}</div>
                    <div class="product-detail-composition"><strong>Состав:</strong><br>${product.composition}</div>
                    <button class="btn add-to-cart-detail" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">В корзину</button>
                    <br><br>
                    <a href="catalog.html" class="back-link">← Назад в каталог</a>
                </div>
            </div>
        `;
        const addBtn = document.querySelector('.add-to-cart-detail');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const id = parseInt(addBtn.dataset.id);
                const name = addBtn.dataset.name;
                const price = parseInt(addBtn.dataset.price);
                const existing = cart.find(i => i.id === id);
                if (existing) existing.quantity++;
                else cart.push({ id, name, price, quantity: 1 });
                saveCart();
                updateCartUI();
                alert('Товар добавлен в корзину');
            });
        }
    } else {
        container.innerHTML = '<p>Товар не найден</p><a href="index.html">Вернуться в каталог</a>';
    }
    updateCartUI();
    // Навесить обработчики корзины на этой странице
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCartBtn');
    if (cartIcon && cartModal && closeCart) {
        cartIcon.onclick = () => cartModal.classList.add('active');
        closeCart.onclick = () => cartModal.classList.remove('active');
        cartModal.onclick = (e) => { if (e.target === cartModal) cartModal.classList.remove('active'); };
    }
    document.getElementById('checkoutBtn').onclick = checkout;
}

// ---------- ОПРЕДЕЛЯЕМ, КАКУЮ СТРАНИЦУ ОТКРЫЛИ ----------
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('product.html')) {
        initProduct();
    } else {
        initMain();
    }
});