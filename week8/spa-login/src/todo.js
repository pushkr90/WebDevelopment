import {
  checkLoginStatus,
  performLogin
} from './services';

let todos = []; // TODO - should be object, not array

const appState =
{
  todos :{},
  username: '',

};



addLogin();

// Check for login
checkLoginStatus()
.then( (userInfo) => {
  showContent();
  appState.todos = userInfo.todos;
  appState.username = userInfo.username;
  renderTodos(appState.todos);
})
.catch( error => {
  showLogin();
});

// TODO: Move these HTML-changing functions to an import from another file
function showContent() {
  document.querySelector('#todo-app .login').classList.add('hidden');
  document.querySelector('#todo-app .logged-in').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#todo-app .login').classList.remove('hidden');
  document.querySelector('#todo-app .logged-in').classList.add('hidden');
}

function addLogin() {
  document.querySelector('#todo-app .login button').addEventListener('click', () => {
    const usernameEl = document.querySelector('#todo-app .login input');
    const username = usernameEl.value;
    // call service
    performLogin(username)
    .then( userInfo => {
      console.log("Inside the reponse");
      showContent();
      appState.todos = userInfo.todos;
      console.log("AppState - "+appState.todos);
      renderTodos(appState.todos);
      console.log("Todoes done");
    })
    .catch( err => {
      // fixme - show errors
      console.log("Im here");
      console.log(err);
    })
  });
}

function renderTodos(todos) {
  const listEl = document.querySelector('#todo-app .todos');
  console.log("Inside render function");
  const html=Object.keys(todos).map((key)=>
  {
    console.log("Inside the keys");
    const item=todos[key];
    console.log("Item is "+item);
    return `
    <li>
    <span class="item-name" data-id="${key}">${item.name}</span>
    <span class="item-quantity" data-id="${key}">${item.quantity}</span>
    `

  }).join(' ');
  listEl.innerHTML = html;
}


