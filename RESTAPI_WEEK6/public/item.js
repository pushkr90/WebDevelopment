(function iife()
{
    const list=document.querySelector('.itemname');
    const status=document.querySelector('.status');
    const add=document.querySelector('.add');
    const addItem=document.querySelector('.add-item');

    const errMsgs={
        'duplicate': 'That name already exists',
        'missing-name': 'Name field is empty',
    };

    list.addEventListener('click',(e)=>{
        if(e.target.classList.contains('decrease'))
        {
           
            const id=e.target.dataset.id;
            const val={
                name:'decrease',
                id:id
            }
            fetch(`/items/`,{
                body:JSON.stringify(val),
                headers:{'Content-type':'application/json'},
                method:'PATCH',
            })
            .catch(()=>Promise.reject({error:'network-error'}))
            .then((convertError))
            .then((items)=>{
                list.value='';
                render(items);
                updateStatus('');
            })
            .catch(err=>{
                updateStatus(errMsgs[err.error] || err.error);
            });
        }
    })

    list.addEventListener('click',(e)=>{ 
        if(e.target.classList.contains('increase'))
        {
            const id=e.target.dataset.id;
            
            const val={
                name:'increase',
                id:id
            }
            
            fetch(`/items/`,{
                body:JSON.stringify(val),
                headers:{'Content-type':'application/json'},
                method:'PATCH',
            })
            .catch(()=> Promise.reject({error:'network-error'}))
            .then((convertError))
            .then((items)=>{
                list.value='';
                render(items);
                updateStatus('');
            })
            .catch(err=>{
                updateStatus(errMsgs[err.error] || err.error);
            });
        }
        
    });

    add.addEventListener('click',()=>{
        const itemname=addItem.value;
        const item={
            name:itemname,
            quantity:0
        }
        if(item.name)
        {
            fetch(`/items/`,{
                body: JSON.stringify(item),
                headers: { 'Content-type': 'application/json' },
                method:'POST',
            })
            .catch(()=>Promise.reject({ error: 'network-error' }))
            .then(convertError)
            .then((items)=> {
                addItem.value='';
                render(items);
                updateStatus('');
            })
            .catch(err=>{
                updateStatus(errMsgs[err.error] || err.error);
            });
        }  
    });
    function render(items)
    {
        const itemListHtml=Object.keys(items).map((key)=>{
            const item=items[key];
            return `
            <li>
            <span class="item-name" data-id="${key}">${item.name}</span>
            <span class="item-quantity" data-id="${key}">${item.quantity}</span>
            <button class="increase" data-id="${key}">+</button>
            <button class="decrease" data-id="${key}">-</button>
            </li>
            `
        }).join(' ');
    list.innerHTML=itemListHtml;
    }
    





    

    function convertError(respose)
    {
        if(respose.ok)
        {
            return respose.json();
        }
        return respose.json()
        .then(err=>Promise.reject(err));
    }

    function updateStatus(message)
    {
        status.innerText=message;
    }

     fetch('/items/',{
            method:'GET',
        })
        .catch(()=>Promise.reject({error:'network-error'}))
        .then(convertError)
        .then(items=>{
            render(items);
        })
        .catch(err =>{
            updateStatus(errMsgs[err.error]||err.error);
        });
})();