const express=require('express');
const app=express();
const PORT=3000;

const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.get('/',(req,res)=>
        {
            const sid=req.cookies.sid;
            if(!sid ||!isValid(sid))
            {
                res.send(`
                <!doctype html>
                <html>
                <form>
                    <label for="fname">Login:</label><br>
                    <input type="text" id="fname" name="fname"><br>
                </form>
                </html>
              `);
            }

res.send(`<p> Request had cookie "saved":${saw}</p>`);
});
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));