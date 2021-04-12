const { messages } = require("./chat");

const chatWeb = {
    chatPage: function(chat) {
      // Fill in anything below!
      return `
        <!doctype html>
        <html>
          <head>
            <title>Chat</title>
          </head>
          <body>
            <div id="chat-app">
              <div class="display-panel">
                ${chatWeb.getUserList(chat)}
                ${chatWeb.getMessageList(chat)}
              </div>
              ${chatWeb.getOutgoing(=)}
            </div>
          </body>
        </html>
    `;
    },
  
    getMessageList: function(chat) {
     // Object.values(chat.messages).map( msg=>
      //console.log("msg ="+msg.sender+" ,"+msg.text));
      return `<ol class="messages">` +
      Object.values(chat.messages).map(msg=>`
      <li>
        <div class="chat">
          <span class="sendername">${msg.sender} : </span>
          <span class="text">${msg.text}</span>
        </div>
      </li>
      `).join('') +
        `</ol>`;
    },
    getUserList: function(chat) {
        console.log(Object.values(chat.users));
      return `<ul class="users">` +
      Object.values(chat.users).map( user =>`
        <li>
          <div class="user">
            <span class="username">${user}</span>
          </div>
        </li>
      `).join('') +
      `</ul>`;
    },
    getOutgoing: function() {
      // Fill in!
      return `
      <!doctype html>
      <html>
        <body>
          <form action="/chat" method="post">
            <label for="bot1">sendtext:</label>
            <input type="hidden" name="username" value="Pushkar">
            <input type="text" name="sendtext">
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
        `
    }
  };
  module.exports = chatWeb;