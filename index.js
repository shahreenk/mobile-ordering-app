import { menuArray } from './data.js';
const orderSummary = [];
let orderTotal;

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add);
    }
    else if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove);
    }
    else if(e.target.id === 'order-btn'){
        handleOrderBtn();
    }
    else if(e.target.id == 'pay-btn'){
        e.preventDefault();
        handlePayBtn();
    } 
})

function handleAddBtn(itemId){
    const targetItemObj = menuArray.filter(function(item){ 
        return item.id === +itemId; 
    })[0];
    orderSummary.push(targetItemObj);
    renderOrder();
    updateTotal();
}

function handleRemoveBtn(orderItemIndex){
    orderSummary.splice(orderItemIndex, 1);
    renderOrder();
    updateTotal();
}

function handleOrderBtn(){
    document.querySelector('.payment-form-modal').style.display = "block";
}

function handlePayBtn(){
    const nameInput = document.getElementById('name-input');
    
    document.querySelector('.order-summary').innerHTML = 
    `
    <p class="order-complete-msg">Thanks, ${nameInput.value}! Your order is on its way!</p>
    `;
    document.querySelector('.payment-form-modal').style.display = "none";
    render();
}

function getOrderHtml(){
    let orderHtml = '';
    orderSummary.forEach(function(orderItem, index){
        orderHtml +=
        `
            <div class="order-item">
            <h3>${orderItem.name}</h2>
            <button class="remove-btn" data-remove="${index}">remove</button>
            <p class="price">$${orderItem.price}</p>
            </div>
        `
    })
   return orderHtml;
}

function renderOrder(){
    document.querySelector('.order-items').innerHTML = getOrderHtml();
}

function updateTotal(){
    orderTotal = 0;
    orderSummary.forEach(function(orderItem){
        orderTotal += orderItem.price;
    })
    document.querySelector('.total-price').innerHTML = "$" + orderTotal;
    render();
    // controlOrderVisibility();
}

// function controlOrderVisibility() {
//     if (orderTotal > 0) {
//         document.querySelector('.order-summary').style.display = 'block';
//     } else {
//         document.querySelector('.order-summary').style.display = 'none';
//     }
// }

function getMenuHtml(){
    let menuHtml = '';
    menuArray.forEach(function(item){
        menuHtml += 
        `
        <div class="shop-menu-item">
            <img src="images/${item.image}" alt="${item.alt}" />
            <div class="item-details">
            <h2>${item.name}</h2>
            <p class="description">${item.description}</p>
            <p class="price">$${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>
        `
})
    return menuHtml;
}

function render(){
    document.querySelector('.shop-menu').innerHTML = getMenuHtml();
    if (orderSummary.length < 1){
        document.querySelector('.order-summary').style.display = "none";
    }
    else {
        document.querySelector('.order-summary').style.display = "block";
    }
}

render();