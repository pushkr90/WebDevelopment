const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const items=require('./item-list');

app.get('/items/',(req,res)=>
{
    res.json(items.getItems());
});

app.patch('/items/',express.json(),(req,res)=>{
    const item=req.body;
    if(item.name=='increase')
    {
        items.increase(item);
    }
    if(item.name=='decrease')
    {
        console.log("isbde decrease");
        items.decrease(item);
    }
    res.json(items.getItems());
})


app.post('/items/',express.json(),(req,res)=>
{
    const item=req.body;
    console.log("in post"+item);
    const returnval=items.addItem(item);
    console.log("return val"+returnval);
    if(returnval==409)
    {
        res.status(400).json({error:'duplicare-name'});
        return;
    }
    if(returnval==400)
    {
        res.status(400).json({error:'missing-name'});
        return;
    }
    res.json(returnval);
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
