import logo from "./logo.svg";
import "animate.css";
import "./App.css";
import { animClass } from "reanim/lib";

function App() {
  return (
    <div className={animClass("backInLeft", "App")}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
