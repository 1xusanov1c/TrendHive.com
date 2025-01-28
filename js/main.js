let hero = document.querySelector('#hero')
let count = document.querySelector('#count')
let shop = document.querySelector('#shop')
let cards = document.querySelector('#cards') 
let name_add = document.querySelector('#name_add')
let Image = document.querySelector('#image')
let price = document.querySelector('#price')
let quantity = document.querySelector('#quantity')
let addbut = document.querySelector('#addbut')
let product = document.querySelector('#product')


function renderApp(){
    hero.innerHTML = null
    shopping.forEach((item , i )=>{
        let div = document.createElement('div')
        div.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4')

        let images = document.createElement('img')
        images.classList.add('w-full', 'h-60', 'object-cover', 'md-4', 'rounded')
        images.src = item.Image
        images.alt = item.name_add

        let h2= document.createElement('h2')
        h2.classList.add('text-lg', 'font-bold', 'text-gray-800', 'mt-3')
        h2.textContent = item.name_add

        let hero_p = document.createElement('p')
        hero_p.classList.add('text-lg', 'fond-bold', 'text-gray-600' , 'mt-3')
        hero_p.textContent = item.quantity 

        let shop_div = document.createElement('div')
        shop_div.classList.add('flex', 'justify-between', 'mt-4', 'text-center')
        
        let p = document.createElement('p')
        p.classList.add('text-gray-600', 'mb-2', 'font-bold','text-center')
        p.textContent = item.price + "$"

        let button = document.createElement('button')
        button.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-blue-600')
        button.textContent = "Sotib olish"

        button.setAttribute('onclick', `sotibOlish(${i})`)


        shop_div.appendChild(p)
        shop_div.appendChild(button)

        div.appendChild(images)
        div.appendChild(h2)
        div.appendChild(hero_p)
        div.appendChild(shop_div)


        hero.appendChild(div)


    });
}

renderApp()



let savatcha = []

function sotibOlish(i){
    if(savatcha.length == 0){
        let new_prod = {...shopping[i] , count: 1};
        savatcha.push(new_prod);
    }else{
        let finded = savatcha.find((item) => {
            return item.id == shopping[i].id;
        });
        if(!finded){
            let new_prod = {...shopping[i] , count :1};
            savatcha.push(new_prod);
        }else{
            finded.count += 1;
        }
    }

    shopping[i].quantity -= 1;
    if(shopping[i].quantity == 0){
        shopping.splice(i , 1)
    }

    renderApp()
    renderCards()
    count.textContent = savatcha.length
}


function showApp(params){
    if(params =="show"){
        shop.classList.remove('translate-x-[450px]')
        shop.classList.add('translate-x-[0px]')
        renderCards()
    }else if(params == "hide"){
        shop.classList.add('translate-x-[450px]')
        shop.classList.remove('translate-x-[0px]')
    }
}

function renderCards(){
    cards.innerHTML = null
    let totalPrice = 0;
    savatcha.forEach((item , i)=>{
        let div =document.createElement('div');
        let box = `
        <div class="flex gap-4 items-center mt-5 ">
            <img class="w-[180px] h-[150px] object-cover rounded-[15px] " src="${item.Image}" alt="">
            <div >
                <p>${item.name_add}</p>
                <p>${item.price}$</p>
                <div>
                    <button class="border py-1 px-2 rounded-lg" onclick="decr(${i})"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.count}</span>
                    <button class="border py-1 px-2 rounded-lg" onclick="incr(${i})"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
        `;
        div.innerHTML = box
        cards.appendChild(div)

        totalPrice += item.price * item.count;
    });
    let footerDiv = document.createElement('div');
    footerDiv.classList.add(
        'sticky', 
        'bottom-[1px]',
        'left-0',
        'w-full',
        'bg-white',
        'shadow-lg',
        'p-4',
        'flex',
        'justify-between',
        'items-center',
        'z-10',
        'rounded-lg'
    );

    let totalText = document.createElement('div');
    totalText.classList.add('text-xl', 'font-bold', 'text-gray-800');
    totalText.textContent = `Umumiy narx: ${totalPrice}$`;

    let checkoutButton = document.createElement('button');
    checkoutButton.classList.add('bg-green-500', 'text-white', 'px-6', 'py-2', 'rounded-lg', 'hover:bg-green-600');
    checkoutButton.textContent = "Rasmlashtirish";
    checkoutButton.onclick = () => alert('Rasmlashtirish jarayoni boshlanmoqda!'); 

    footerDiv.appendChild(totalText);
    footerDiv.appendChild(checkoutButton);

    cards.appendChild(footerDiv);

    count.textContent = savatcha.length

}

function incr(i){
    if(savatcha[i].quantity > savatcha[i].count){
        savatcha[i].count += 1;
       shopping.forEach((item, index) => {
            if (savatcha[i].id == item.id) {
                shopping[index].quantity -= 1;
                renderApp();
            }
        });
        renderCards()
        if (savatcha[i].quantity == savatcha[i].count) {
            shopping = shopping.filter(item => item.id !== savatcha[i].id);
                    renderApp()
        }
    }
}

function decr(i){
    if(savatcha[i].count >0 ){
        savatcha[i].count -= 1;
        shopping.forEach((item, index) => {
            if (savatcha[i].id == item.id) {
                shopping[index].quantity += 1;
                renderApp();
            }
        });

        let finded = shopping.find((item)=>{
            return item.id == savatcha[i].id;
        });

        if(!finded){
            shopping.unshift({...savatcha[i], quantity: 1})
            renderApp()
        }

        if(savatcha[i].count == 0){
            savatcha.splice(i, 1)
        }
        renderCards()


    }
}
function addHome(){
    addbut.classList.add('hidden')
    product.classList.remove('hidden')
}

function appBtn(){
    addbut.classList.remove('hidden')
    product.classList.add('hidden')

}


function addBtn(){
    try {
        if(!name_add.value) throw Error("Mahsulotning nomni kirting")
        if(!Image.value) throw Error("Rasmni URL ning kirting")
        if(!price.value) throw Error("Mahsulotning narxini kirting")
        if(!quantity.value) throw Error("Mahsulotning sonini kirting")

        let maxId = shopping.length > 0 ?Math.max(...shopping.map(item=> item.id)): 0;
        
        let newAdd = new AppBtn( maxId + 1,  name_add.value , Image.value, price.value, quantity.value)
        shopping.unshift(newAdd)
        
        
        renderApp()
        clearInput()
        alert("Mahsulot muvaffaqiyatli qo‘shildi!")
    } catch (error) {
        alert(error.message)
    }
    
}

function AppBtn(_id, _name_add , _Image, _price, _quantity){
    this.id = _id
    this.name_add = _name_add
    this.Image = _Image
    this.price = _price
    this.quantity = _quantity
}

function clearInput(){
    name_add.value = "";
    Image.value = "";
    price.value = "";
    quantity.value = "";
  }

