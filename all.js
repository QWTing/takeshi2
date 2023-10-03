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
    upload(product)
    //製作單品選項
    function createProductElement(product){
      const product_box = document.createElement('div');
      product_box.className = 'product-box'

      const item = document.createElement('div')
      item.className = 'item'
      product_box.appendChild(item)
      
      const imgbtn = document.createElement('button')
      imgbtn.className = 'img-btn'
      imgbtn.setAttribute("type","button")
      imgbtn.setAttribute("data-bs-toggle","modal")
      imgbtn.setAttribute("data-bs-target",`#pic${product.id}`)
      item.appendChild(imgbtn)

      const img_sm = document.createElement('img')
      img_sm.setAttribute('src',`./image/img_${product.id}.jpeg`)
      imgbtn.appendChild(img_sm)

      const modal = document.createElement('div')
      modal.classList.add("modal","fade")
      modal.setAttribute("id",`pic${product.id}`)
      modal.setAttribute("tabindex","-1")
      modal.setAttribute("aria-labelledby",product.id)
      modal.setAttribute("aria-hidden","true")
      item.appendChild(modal) 

      const modal_dialog = document.createElement('div')
      modal_dialog.classList.add("modal-dialog","modal-dialog-centered")
      modal.appendChild(modal_dialog)

      const modal_content = document.createElement('div')
      modal_content.className = 'modal-content'
      modal_dialog.appendChild(modal_content)
      
      const modal_header = document.createElement('div')
      modal_header.className = 'modal-header'
      modal_content.appendChild(modal_header)
      
      
      const title = document.createElement('h5')
      title.className = 'modal-title'
      title.setAttribute('id',product.id)
      title.textContent = product.en_name
      modal_header.appendChild(title)
      
      const close_btn = document.createElement('button')
      close_btn.className = 'btn-close'
      close_btn.setAttribute('type','button')
      close_btn.setAttribute('data-bs-dismiss','modal')
      close_btn.setAttribute('aria-label',"Close")
      modal_header.appendChild(close_btn)
      

      const img = document.createElement('img')
      img.setAttribute('src',`./image/img_${product.id}.jpeg`)
      modal_content.appendChild(img)

      const body = document.createElement('div')
      body.className = 'modal-body'
      modal_content.appendChild(body)


      const h5 = document.createElement('h5')
      h5.textContent = product.en_name;
      item.appendChild(h5)

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
      let selectClone = select.cloneNode(true);
      body.appendChild(selectClone);

      product_box.appendChild(group);
      return product_box;
    }
    // 菜單部分
    function nav(){
      data.forEach(list=> {  
        if(!menu_list.includes(list.en)){
          if(list.group != null){
            menu_list.push(list.en)
          } 
        }
      });
      menu_list.forEach((item)=>{
        MenuList.innerHTML += `
        <button type="button" class="menu_category btn btn-outline-primary" value="${item}">${item}</button>
        `
      })
      
      MenuList.innerHTML += `<p>『請勿將畫面重新整理，重新整理會重置』</p><p>『點選完後，請點選右上角購物車，麻煩請將畫面給工作人員進行點餐』<br><br>『此頁面為輔助點餐，並非正式點餐功能』<br><br>『點餐內容已工作人員pos機裡的為主』</p>`
      
      MenuList.innerHTML += `<button type="button" class="btn btn-outline-primary clear" value="clear">清空</button>`
    }
    
    //確定點餐畫面的產品
    function CreateOrderElement(data){
      const tr = document.createElement('tr')
      const cn = document.createElement('td')
      cn.textContent = data.en_name
      tr.appendChild(cn)

      const jp = document.createElement('td')
      jp.textContent = data.jp_name
      tr.appendChild(jp)

      const order = document.createElement('td')
      order.textContent = data.order
      tr.appendChild(order)
      

      return tr;
    }

    const MenuList = document.querySelector('.MenuList')
    const product_list = document.querySelector('.products')
    const menu_list =[];
    const data = JSON.parse(localStorage.getItem("data"));
    
    nav();
    
    //料理顯示
    const menu_category = document.querySelectorAll('.menu_category')
    menu_category.forEach(item=>{
      item.addEventListener('click',()=>{
        const order = JSON.parse(localStorage.getItem("data"));
        product_list.innerHTML =''
        order.forEach(product=>{
          if(item.value == product.en){
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
      const table_body = document.querySelector('.table-body')
      table_body.innerHTML = ''
      all.forEach(e=>{
        if(e.order != 0){
          table_body.appendChild(CreateOrderElement(e))
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