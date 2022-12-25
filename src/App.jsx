import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>

        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>
        Vite + React
        <br />
        Eslint & Prettier
      </h1>

      <div>
        <a href="https://eslint.org" target="_blank" rel="noreferrer">
          <img src="/eslint.svg" className="logo" alt="Eslint logo" />
        </a>

        <a href="https://prettier.io" target="_blank" rel="noreferrer">
          <img
            src="/prettier.svg"
            className="logo prettier"
            alt="Prettier logo"
          />
        </a>
      </div>

      <div className="card">
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
