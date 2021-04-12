"use strict";
(function iife()
{
    const runner=[
        {
            field:'Audi',
            fill:false,
            number:0,
        },
        {
            field:'BMW',
            fill:true,
            number:1,

        },
    ];

    const listEl=document.querySelector('#todo-app .todos');
    const inputEl=document.querySelector('#todo-app input');
    const buttonEl=document.querySelector('.add');
     


    disableButtonIfNoInput();
    addAbilityToCompleteItems();
    addAbilityToAddItems();
    addAbilityToDeleteItems();
    addItem();
    deleteItem();



    render(runner);


    function render(runner)
    {
        const html=runner.map((eachrunner,index) =>
        {
            console.log(eachrunner);
            return `
            <li>
                <span class="eachrunner ${eachrunner.fill ?"complete":""}" data-index="${index}">${eachrunner.field}</span>
                <span class="delete" data-index="${index}">X</span>
                <span class="show" data-index="${index}">${eachrunner.number}</span>
                <button class="increase" data-index="${index}">+</button>
                <button class="decrease" data-index="${index}"${eachrunner.number==0?"disabled":""} >-</button>
            </li>
            `;
        }).join('');
        listEl.innerHTML=html;
        buttonEl.disabled=!inputEl.value;
    };
    function addItem(){
        listEl.addEventListener('click',(e)=>{
            if(e.target.classList.contains('increase'))
            {
                const index=e.target.dataset.index;
                runner[index].number+=1;
            }
            render(runner)
        });

    }

    function deleteItem()
    {
        listEl.addEventListener('click',(e)=>{
            if(e.target.classList.contains('decrease'))
            {
                const index=e.target.dataset.index;
                
                if(runner[index].number>=1)
                {
                    runner[index].number-=1;
                }
            }
            render(runner);
        });
    }

    function disableButtonIfNoInput(){
        inputEl.addEventListener('input',()=>
        {
            buttonEl.disabled=!inputEl.value;
        });
    }

    function addAbilityToCompleteItems()
    {
        listEl.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('eachrunner'))
            {
                return;
            }
            const index=e.target.dataset.index;
            runner[index].fill = !runner[index].fill;

            render(runner);


        });
    }

    function addAbilityToAddItems()
    {
        buttonEl.addEventListener('click',(e)=>{
            const newRunner={
                field:inputEl.value,
                fill:false,
                number:1

            };
            runner.push(newRunner);
            inputEl.value='';
            render(runner);

        }
        );
    }

    function addAbilityToDeleteItems(){
        listEl.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('delete'))
            {
                return;
            }
            const index=e.target.dataset.index;
            runner.splice(index,1);
            render(runner);
        });
    }
   
})();