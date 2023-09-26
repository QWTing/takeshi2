const url = 'data.json';

let product;

fetch(url)
.then(response => {
  if(!response.ok){
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
    product = data;
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
})


.then(()=>{
  //上傳
    function upload(data){
      localStorage.setItem('data', JSON.stringify(data));
    }
    //製作單品選項
    function createProductElement(product){
      const product_box = document.createElement('div');
      product_box.className = 'product-box'
      
      const h5 = document.createElement('h5')
      h5.textContent = product.cn_name;
      product_box.appendChild(h5)

      const group = document.createElement('div')
      group.className = 'group';

      const span = document.createElement('span');
      span.textContent = `${Math.floor(product.price*1.1)}円`;
      group.appendChild(span);

      const select = document.createElement('select');
      select.name = product.id
      select.id = product.id
      for(let i=0;i<10;i++){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if(product.order==i){
          option.selected = true;
        }
        select.appendChild(option);
      }

      group.appendChild(select);
      product_box.appendChild(group);
      return product_box;
    }
    // 菜單部分
    function nav(){
      data.forEach(list=> {  
        if(!menu_list.includes(list.cn)){
          if(list.group != null){
            menu_list.push(list.cn)
          } 
        }
      });
      menu_list.forEach((item)=>{
        MenuList.innerHTML += `
        <button type="button" class="menu_category btn btn-outline-primary" value="${item}">${item}</button>
        `
      })
      
      MenuList.innerHTML += `<br><p>『點選完後，請點選右上角購物車，麻煩請將畫面給工作人員進行點餐』<br><br>『此頁面為輔助點餐，並非正式點餐功能』<br><br>『點餐內容已工作人員pos機裡的為主』</p>`
      
      MenuList.innerHTML += `<button type="button" class="btn btn-outline-primary clear" value="clear">清空</button>`
    }
    
    //確定點餐畫面的產品
    function CreateOrderElement(data){
      const order_box = document.createElement('div')
      order_box.className = 'order-box'
      const h4 = document.createElement('h6')
      h4.textContent = data.cn_name
      order_box.appendChild(h4)


      const h5 = document.createElement('h6')
      h5.textContent = data.jp_name
      order_box.appendChild(h5)

      const p = document.createElement('p')
      p.textContent = `數量：${data.order}`
      order_box.appendChild(p)

      return order_box;
    }
    


    const MenuList = document.querySelector('.MenuList')
    const product_list = document.querySelector('.products')
    const menu_list =[];
    const data = JSON.parse(localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):data;
    
    nav();
    
    //料理顯示
    const menu_category = document.querySelectorAll('.menu_category')
    menu_category.forEach(item=>{
      item.addEventListener('click',()=>{
        const order = JSON.parse(localStorage.getItem("data"));
        product_list.innerHTML =''
        order.forEach(product=>{
          if(item.value == product.cn){
            product_list.appendChild(createProductElement(product))   
          }
        })
        const All_product = document.querySelectorAll('select');
        All_product.forEach((select)=>{
          select.addEventListener('change',(e)=>{
            order.forEach(item=> {
              if(item.id == e.target.id){
                item.order = e.target.value
              }
            });
            upload(order)
          })
        })
      })
    })

    function show_order(){
      let all =  JSON.parse(localStorage.getItem("data"))
      const modal_body = document.querySelector('.modal-body')
      modal_body.innerHTML = ''
      all.forEach(e=>{
        if(e.order != 0){
          modal_body.appendChild(CreateOrderElement(e))
        }
      })
    }

    const check_order = document.querySelector('.check-order')

    check_order.addEventListener('click',(e)=>{
      show_order()
    })

    //清空
    const clears = document.querySelectorAll('.clear');
    clears.forEach(clear=>{
      clear.addEventListener('click',()=>{
        data.forEach(e => {
          e.order = 0;
          upload(data)
          location.reload()
        });
      })
    })
  }
)