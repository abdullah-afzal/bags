let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = ()=>{
    let count=0;
    for(let x of basket){
        count+=x.item;
    }
    document.getElementById("cartAmount").innerHTML=count;
}

let generateShop = () => {
    calculation();
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x)=>x.id == id) || [];
      return `
        <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
    `;
    })
    .join(""));
};

generateShop();

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
let update = (i,n) =>{
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem('data',JSON.stringify(basket));
    document.getElementById(i).innerHTML=n;
    calculation();
}