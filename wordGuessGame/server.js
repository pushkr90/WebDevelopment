const express=require('express');
const app=express();
const PORT=3000;

const cookieparser=require('cookie-parser');
app.use(cookieparser());
const uuidv4=require('uuid').v4;
const wordlist=require('./word');
const webpage=require('./wordpage');
const userinfo=require('./user');
const gameInfo=require('./game');
const util=require('./gameutil');
//const gameWin = require('./gamewin');
const { includes } = require('./word');

let winner=false;
let duplicate=false;
let invalid=false;
let valid=false;


app.get('/',express.urlencoded({extended: false}), (req,res)=>
{
    console.log("here");
    userinfo.checkUniqueID(req,res,uuidv4);
    console.log(userinfo.userData);
    const sid=req.cookies.sid;
    res.send(webpage.displaylist(wordlist,sid,winner,duplicate,invalid,valid));
});

app.post('/submit',express.urlencoded({extended:false}),(req,res)=>
{
    //userinfo.checkUniqueID(req,res,uuidv4);
    let userenteredword=req.body.enterword.trim();
    console.log("userenteredword"+userenteredword);
    const sid=req.cookies.sid;
    console.log("sid - "+sid);
    //console.log("userbody"+req.body);
    userenteredword=userenteredword.toUpperCase();
    userinfo.updatesecretword(sid);
    const secret=userinfo.userData[sid].secretword;
    if(userinfo.userData[sid].userenterdwords.includes(userenteredword))
    {
        duplicate=true;
        winner=false;
        valid=false;
        invalid=false;
        res.redirect('/');
    }
    else if(wordlist.includes(userenteredword))
    {
        if(util.guessgame(userenteredword,sid))
        {
           winner=true;
           invalid=false;
           valid=false;
           duplicate=false;
           console.log("winner winner chicken dinner");
           res.redirect('/');

        }
        else{

            valid=true;
            console.log("valid flag is set true");
            res.redirect('/');
        }
    }
    else
    {
        invalid=true;
        valid=false;

        console.log("invalid flag is set true");
        res.redirect('/');
    }

    //res.redirect('/');
});

app.post('/winner',express.urlencoded({extended:false}),(req,res)=>
{
    duplicate=false;
    winner=false;
    valid=false;
    invalid=false;
    const sid=req.cookies.sid;
    console.log("sid in winner"+sid);
    userinfo.userData[sid].attemptedwordguess=[];
    userinfo.userData[sid].secretword='';
    //userinfo.updatesecretword(sid);
   // userinfo.userData[sid].attemptedwordguess=[];
    userinfo.userData[sid].userenterdwords=[];
    userinfo.userData[sid].turns=0;
    userinfo.updatesecretword(sid);
    res.redirect('/');
});



app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
