let label = document.getElementById('label');
let shoppingCart = document.getElementById('shoping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || []
let calculation = ()=>{
    let count=0;
    for(let x of basket){
        count+=x.item;
    }
    document.getElementById("cartAmount").innerHTML=count;
}
calculation();

let generateCartItems = ()=>{
    if (basket.length !==0) {
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id, item}=x;
            let search = shopItemsData.find((y)=>y.id==id) || [];
            return `
            <div class="cart-item">
                <img width="100" src="${search.img}" alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                    <h3>$ ${item*search.price}</h3>
                </div>
            </div>
            `;
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty<h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
}

generateCartItems();

let increment = (i) =>{
    let search = basket.find((x)=>x.id===i)
    if(search===undefined){
        basket.push({id: i,item:1});
        update(i,1);
    }
    else{
        search.item+=1;
        update(i,search.item);
    }
}
let decrement = (i) =>{
    let search = basket.find((x)=>x.id===i)
    if(search != undefined && search.item>0){
        search.item-=1;
        update(i,search.item);
        
    }
}

let totalCost = ()=>{
    if(basket.length!=0){
        let amount = basket.map((x)=>{
            let {item, id}=x;
            let search=shopItemsData.find((y)=>y.id==id) || [];
            return item*search.price;
        }).reduce((a,b)=>a+b);
        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="clearAll">Clear All</button>
        `;
    }
}


let update = (i=0,n=0) =>{
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem('data',JSON.stringify(basket));
    generateCartItems();
    totalCost();
    calculation();
    if(i!=0 && n!=0){
        document.getElementById(i).innerHTML=n;
    }
    
}
let clearCart =()=>{
    basket=[];
    update();
}

let removeItem = (id) =>{
    let search = basket.find((x)=>x.id===id);
    search.item=0;
    update(id,0);
}
totalCost();