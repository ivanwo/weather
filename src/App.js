import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Card(props){
  let title = props.title;
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}
function App() {
  let [title, setTitle] = useState(window.localStorage.getItem("title"));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input onChange={e => {setTitle(e.target.value); window.localStorage.setItem("title",title)}}></input>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Card title={title} />
      </header>
    </div>
  );
}

export default App;
