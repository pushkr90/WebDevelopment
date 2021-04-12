const userinfo = require('./user');
const wordlist = require('./word');
const webpage = {
    displaylist: function(wordlist,sid,winner,duplicate,invalid,valid)
    {
        return `
        <!doctype html>
        <html>
            <head>
                <title>List Of Words To Guess</title>
                <h1>Welcome to word guess game</h1>
            </head>
            <body>
                <div id="wordlist">
                    <div class="wordlistclass">
                        ${webpage.getwordlist(wordlist)}
                    </div>
                    <div class="trial">
                        ${webpage.listuserdata(sid)}
                    </div>
                    <div class="guessword">
                        ${webpage.guessword()}
                    </div>
                    <div>
                        ${webpage.handlegameutil(winner,valid,invalid,duplicate,sid)}
                    </div>
                </div>
            </body>
        </html>
        `;
    },
    listuserdata:function(sid){
        return `<ol class="trial2">`+ 
        Object.values(userinfo.userData[sid].attemptedwordguess).map(attemptedwordguess=>`
        <li>
            <div class="trial3">
                <span class="trial4">${attemptedwordguess}</span>
            </div>
            </li>
        `
            ).join('')+`<ol>`;
    },
    handlegameutil:function (winner,valid,invalid,duplicate,sid) {
        console.log("inside IF HANDLER winner val="+winner);
        console.log("valid"+valid);
        console.log("invalid"+invalid);
        console.log("duplicate"+duplicate);
        console.log("sid"+sid);
        if(valid){
            console.log("inside valid if condition");
            return `
            <h1> Valid guess of word ${userinfo.userData[sid].userenterdwords.length-1}</h1>
            `;
        }
        if(invalid)
        {

            console.log("inside invalid condition under wordpage");
            return `<h1> word is invalid</h1>`;
        }
        if(duplicate)
        {
            console.log("inside dupliate if condition");
            return '<h1> duplicate word please try different word </h1>'
        }
        if(winner)
        {
            console.log("inside winnder if condition");
            return `<h1> you have won the game</h1>
            <form action="/winner" method="post">
                <input type="hidden" id="sid" value=${sid}>
                <button type="submit">Play Again</button>
            </form>
            `
        }
        
    },
    getwordlist:function(wordlist){
        //console.log(Object.values(wordlist));
        return Object.values(wordlist).map(word=>`
            ${word}
        `).join(',');
    },
    guessword:function()
    {
        return `
        <form action="/submit" method="post">
            <input type="text" name="enterword">
            <button type"submit">Submit</button>
        </form>
        `;
    }

};
module.exports=webpage;