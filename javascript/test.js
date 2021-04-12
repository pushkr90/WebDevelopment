const message='hello';
console.log(`${message},allcats`);
const divEl = document.querySelector(`.demo`);
let count = 0;
const render = () => divEl.innerHTML = `
  <p>You have clicked ${count} times</p>
  <button type="button">Click Me!</button>
`;
divEl.addEventListener('click', () => { 
  count++;
  render();
});
render();