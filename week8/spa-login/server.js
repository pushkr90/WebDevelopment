const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;
const helper=require('./helper')

app.use(express.static('./public'));
app.use(cookieParser());

// TODO: all this session code should move to another file



app.get('/session', (req, res) => {
  // check cookie from request
  const sid = req.cookies.sid;
  if(!sid) {
    res.status(401).json({ error: 'login-required'});
    return;
  }
  if(helper.isValidSession(sid)) 
  {
    console.log("test1")
    console.log(helper.sessions[sid].todos);
    res.status(200).json(helper.sessions[sid]);
    return;
  }

  res.status(403).json({ error: 'login-invalid'});
});

app.post('/session', express.json(), (req, res) => {
  const { username } = req.body;
  const errors = helper.validateUsername(username);
  if( errors ) {
    res.status(400).json({ errors });
    return;
  }
  const sid = helper.createSession(username);
  res.cookie('sid', sid);
  res.status(200).json(helper.sessions[sid]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

