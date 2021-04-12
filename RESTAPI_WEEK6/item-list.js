const items=
    { 
        

        
    
};



const uuidv4=require('uuid').v4;
function createSid(){
    const sid=uuidv4();
    return sid;
}
function increase(item)
{
    items[item.id].quantity++;
    //console.log(items[item.id].quantity);

}
function decrease(item)
{
    items[item.id].quantity--;
    //console.log(items[item.id].quantity);

}



function getItems(){
    return items;
}

function addItem(item)
{
    const sid=createSid();
    console.log("ins add item"+item.name);
    console.log(item.quantity);
    item.sid=sid;
    console.log(item.sid);
    if(!item.name)
    {
        return 400;
    }
    if(!item.quantity)
    {
        item.quantity=0;
    }
   
    item.sid=sid;
    items[sid]=item;
    console.log("ins add item"+item.name);
    console.log(item.quantity);
    console.log(item.sid);
    return items;
}

const addFunctions=
{
    addItem,
    getItems,
    increase,
    decrease
};

module.exports=addFunctions;
