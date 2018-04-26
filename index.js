const APP_STATE = {
    products: [
        {
            id: 0,
            name: 'Zapato',
            price: 150.50
        },
        {
            id: 1,
            name: 'Pantalon',
            price: 488
        },
        {
            id: 2,
            name: 'Polo',
            price: 99.9
        }
    ],
    carrito: {
        isShow: false,
        items: []
    }
};

/// COMPONENTS

const productComponent = (product) =>
    `
        <li class="product card">
            <button data-id="${product.id}" class="borrarBtn">X</button>
            <img src="https://placeimg.com/150/150/tech" alt="">
            
            <div class="product-details">
                <span class="product-name">${product.name}</span>
                <span class="product-price">${currency(product.price)}</span>    
            </div>
                        
            <button data-id="${product.id}" class="comprarBtn">Comprar</button>
         </li>
    `;

const productCartComponent = (product) =>
    `
        <li class="product-cart card">
            <button data-id="${product.id}" class="removeBtn">X</button>
            <img src="https://placeimg.com/150/150/tech" alt="">
            
            <div class="product-details">
                <span class="product-name">${product.name}</span>
                <span class="product-price">${currency(product.price)}</span>    
            </div>
         </li>
    `;

const productListComponent = (products, isCart = false) =>
    `
        <h5 class="totals">${products.length} Item</h5>
        <ul class="product-list">${isCart ? 
            products.map(productCartComponent).join('') : products.map(productComponent).join('')}
        </ul>
    `;

function getTotal(products) {
    return products.reduce((total, product) => total + product.price, 0);
}

const cartComponent = () =>
    `
        <div class="carritoPopup card card-1 ${APP_STATE.carrito.isShow ? 'active' : ''}">
            <h2>Carrito</h2>
            <h5>Total: ${currency(getTotal(APP_STATE.carrito.items))}</h5>
            
            ${productListComponent(APP_STATE.carrito.items, true)}
        </div>  
    `;

const appComponent = () =>
    `
        <div class="admin">
            <h4>Admin</h4>
            <hr>
            <h5>Create Product</h5>
            <input placeholder="Product Name" type="text" id="productNameInput"/>
            <input placeholder="Product Price" type="number" id="productPriceInput"/>
            <button id="addUser">Add User</button>
        </div>

        ${productListComponent(APP_STATE.products)}
                
        ${cartComponent()};
    `;

/// EVENT HANDLERS

function addProductHandler (e) {
    const name = document.getElementById('productNameInput').value;
    const price = document.getElementById('productPriceInput').value;
    const lastId = APP_STATE.products.length - 1;

    APP_STATE.products.push({
        name,
        price,
        id: lastId + 1
    });

    render();
}

function deleteProductHandler (e) {
    const productId = e.currentTarget.dataset.id;

    APP_STATE.products = APP_STATE.products.filter(product => {
        return product.id != productId;
    });

    render();
}

function deleteProductCartHandler (e) {
    const productId = e.currentTarget.dataset.id;

    APP_STATE.carrito.items = APP_STATE.carrito.items.filter(product => {
        return product.id != productId;
    });

    render();
}

function buyProductHandler (e) {
    const productId = e.currentTarget.dataset.id;
    const product = APP_STATE.products.find(product => product.id == productId);

    APP_STATE.carrito.items.push(product);
    render();
}

function carritoHandler () {
    APP_STATE.carrito.isShow = !APP_STATE.carrito.isShow;

    /*if (carrito.classList.contains('active')) {
        carrito.classList.remove('active');
    } else {
        carrito.classList.add('active');
    }*/

    render();
}


/// EVENT LISTENERS

function addProductListener () {
    document.getElementById('addUser').addEventListener('click', addProductHandler);
}

function deleteProductListener () {
    const btns = document.getElementsByClassName('borrarBtn');

    for (let btn of btns) {
        btn.addEventListener('click', deleteProductHandler);
    }
}

function deleteProductCartListener () {
    const btns = document.getElementsByClassName('removeBtn');

    for (let btn of btns) {
        btn.addEventListener('click', deleteProductCartHandler);
    }
}

function buyProductListener () {
    const btns = document.getElementsByClassName('comprarBtn');

    for (let btn of btns) {
        btn.addEventListener('click', buyProductHandler);
    }
}

function carritoListener () {
    document.getElementsByClassName('carritoBtn')[0].addEventListener('click', carritoHandler);
}


/// RENDER

function render(state) {
    let root = document.getElementsByClassName('root')[0];

    root.innerHTML = appComponent(state);
    addProductListener();
    deleteProductListener();
    buyProductListener();
    deleteProductCartListener();
}

(function() {
    render();
    carritoListener();
})();



/// HELPERS

function currency (number) {
    return `$ ${parseFloat(Math.round(number * 100) / 100).toFixed(2)}`;
}