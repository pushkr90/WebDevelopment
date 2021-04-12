const uuid = require('uuid').v4;
const userlist=require('./userlist');


// TODO: all this session code should move to another file
const sessions = {};
const isValidSession = function(sid) 
{
  if(sessions[sid])
  {
    return true;
  }
  return false;
};
const validateUsername = function(username) {
  const errors = [];
  const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
  if( clean !== username ) {
    // TODO: should give error codes, not text messages
    errors.push('username contained disallowed characters');
  }
  if(!username) {
    errors.push('username was empty');
  }

  return errors.lengths ? errors : '';
};
const createSession = function(username) {
  const sid = uuid();
  sessions[sid] = 
  {
    username:username,
    todos:userlist.checkoradd(username),
  };
  console.log("Session sid - "+sessions[sid].todos);
  return sid;
};
module.exports={createSession,validateUsername,sessions,isValidSession};