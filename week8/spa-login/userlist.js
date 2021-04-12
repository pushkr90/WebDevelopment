const userlist={   
};




const uuidv4=require('uuid').v4;

function checkoradd(username)
{
    if(!userlist[username])
    {
        userlist[username]=
        {
            items:{}
        };
    }
    const item=userlist[username].items;   
    console.log("List - "+userlist[username].items);
    return userlist[username].items;
}
function additem(item)
{
    if(!item.username)
    {
        return 400;
    }
    if(!userlist[item.username])
    {
        userlist[item.username]=
        {
            items:{}
        };
    }

    const list=userlist[item.username].items;

    const itemid=uuidv4();
    
    const item1={itemid:itemid,name:item.name,quantity:1};
    list[itemid]=item1;
    userlist[item.username].items=list;
    console.log(userlist);
    return userlist[item.username].items;
    
}
const item={
    username:"aks",
    name:"jeans"
};
const item2 = {
    username : "aks",
    name : "Tops"
}

additem(item);
additem(item2);



module.exports = {checkoradd,userlist};

