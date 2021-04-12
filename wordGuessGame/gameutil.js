const wordlist=require('./word');//secret word geenration, compare (exact, )
const userinfo=require('./user');
const gameInfo=require('./game');//user character match, turn increase, attrmptedwordguess increase.

const util={
    guessgame:function(guessword,sid) 
    {
        if(gameInfo.matchWord(guessword,userinfo.userData[sid].secretword))
        {
            userinfo.userData[sid].userenterdwords.push(guessword);
            userinfo.userData[sid].turns++;
            userinfo.userData[sid].attemptedwordguess.push(`guessedword ${guessword} matched in ${userinfo.userData[sid].turns}`);
            return true;
        }
        else {
            userinfo.userData[sid].userenterdwords.push(guessword);
            userinfo.userData[sid].turns++;
            const res=gameInfo.wordCompare(guessword,userinfo.userData[sid].secretword);
            userinfo.userData[sid].attemptedwordguess.push(`guessedword ${guessword} only matched ${res} characters and turns ${userinfo.userData[sid].turns}`);
            return false;
        }
        
    }

};
module.exports = util;