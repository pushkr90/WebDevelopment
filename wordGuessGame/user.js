const gameInfo=require('./game');
const userinfo={
    checkUniqueID:function(req,res,uuidv4)
    {
        const sid=req.cookies.sid;
        if('sid' in req.cookies)
        {
            if(!(req.cookies.sid in userinfo.userData))
            {
                    userinfo.userData[sid]={
                    attemptedwordguess:[],
                    userenterdwords:[],
                    secretword:"",
                    turns:0,
                    sid:sid
                };
            }
        }
        else
        {
            const sid=uuidv4();
            res.cookie("sid",sid);
            res.redirect("/");
        }
        
    },
    userData:{},
    updatesecretword:function(sid)
    {
        if(userinfo.userData[sid].secretword==='')
        {
            try {
                userinfo.userData[sid].secretword=gameInfo.uniqueWord();
                console.log(userinfo.userData[sid].secretword);
                
            } catch (error) {
                console.log("error while setting val");
                
            }   
        }
    }
};

module.exports = userinfo;