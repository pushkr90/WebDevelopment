const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const storeName=[];
app.post('/response', express.urlencoded({ extended: false }), (req, res) => {
    storeName.push(req.body.username);
  res.send(`
    <!doctype html>
    <html>
    <head></head>
    <body>
      <a href="/">Return to form</a>
      <div>
        All Cats Fans are ${storeName.join(', ')}
      </div>
      <div>
        ${JSON.stringify(req.body)}
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));