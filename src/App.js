import React from "react";
import { Game } from "./Components/Game";
import "./App.css";

const App = () => {
  const width = parseInt(prompt("Enter Width"));
  const height = parseInt(prompt("Enter Height"));
  return (
    <div className="App">
      <Game width={width} height={height} />
    </div>
  );
};

export default App;
