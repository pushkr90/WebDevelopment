const wordlist=require('./word');//secret word geenration, compare (exact, )
const userinfo=require('./user');
const gameInfo={
    uniqueWord:function()
    {
        const w= wordlist[Math.floor(Math.random() * wordlist.length)];
        //console.log("secretword"+w);
        return w;
    },
    matchWord:function(userenteredword,secret)
    {
        console.log("inside match word"+userenteredword);
        //console.log("secret word in game - "+userinfo.userData[sid].secretword);
       // let secret = userinfo.userData[sid].secretword.toUpperCase();
        return (userenteredword.toUpperCase()===secret.toUpperCase());

    },
    wordCompare:function(userenteredword,secret)
    {
        console.log("inside function compare words"+userenteredword);
        userenteredword=userenteredword.toLowerCase();
        console.log("user word in compre"+userenteredword);
        secret=secret.toLowerCase();
        let count=0;
        const lettercount={};
        console.log(userenteredword);
        console.log(secret);
        for(let c of userenteredword)
        {
            
            if(!lettercount[c])
            {  
                lettercount[c]=1;
                console.log(lettercount[c]);
            }
            else
            {
                lettercount[c]++;
            }
            
        }
        console.log("lettercount"+lettercount);
        secret=secret.toLowerCase();
        for(let a of secret)
        {
            console.log("first char in secret"+a);
            console.log("secret word"+lettercount[a]);

            if(lettercount[a]>0)
            {
                console.log("inside >0 =="+a);
                
                lettercount[a]--;
                count++;
            }
        }
        console.log("word count"+count);
        return count;
    }
};

module.exports = gameInfo;