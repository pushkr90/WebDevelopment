import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Demo from './Demo';
import NewDemo from './NewDemo';

function App() {

  const [name, setName] = useState('cat');

  function changeName()
  {
    setName('dog');
  }
  const modifyName= () => {
    setName('Pushkar');
  }

  //first varibale ->varivale, secinf VREyeParameters, valuesetter 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <label>{name}</label>
          <button onClick={changeName}>Click ME!</button>
          <Demo newName={name} >WOw!</Demo>
          <NewDemo modifyName={modifyName} />
        </div>
      </header>
    </div>
  );
}

export default App;
