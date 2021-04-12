const express = require('express');
const app = express();
const PORT = 3000;



const people={
    "Pushkar":
    {
        name:'Pushkar'
    },
    "slut":
    {
        name:'Akanksha'
    },
};


app.get('/people',(req,res)=>
{
    res.json(Object.keys(people));
});

app.get('/people/:name',(req,res)=>
{
    const name=req.params.name;
    if(people[name]){
        res.json(people[name]);
    }else{
        res.status(404).json({error:`unknown user:${name}`});
    }
});

app.post('/people/:name', express.json(), (req, res) => 
{
    const name=req.params.name;
    if(!name)
    {
        res.status(400).json({error: "'name' required"});
    }
    else if(people[name]){
        res.status(409).json({error:`duplicate: ${name}`});
    } else{
        people[name]=name;
        res.json(Object.keys(people));
    }

});
app.delete('/people/:name',express.json(),(req,res)=>{
    const name=req.params.name;
    delete people[name];
    res.json(Object.keys(people));
});

    



app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));