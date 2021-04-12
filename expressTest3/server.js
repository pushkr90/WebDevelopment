const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use(express.static('./public'));

app.get('/', (req, res) => {
res.send(chatWeb.chatPage(chat));
});


// Below includes an example of pulling fields from a POST request body
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => 
{
const { ui } = req.body; // You'll need to add something!
console.log("prof"+ui);
let text = req.body.sendtext;
let sender = req.body.username;
chat.addMessage({text,sender});


//console.log('name='+ text.bot1);
console.log("username "+sender);
console.log("msg "+text);

// Fill in here!
res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));