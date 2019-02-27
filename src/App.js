import React, { Component } from 'react';
import './App.css';
import PlaygroundComponent from "./PlaygroundComponent/PlaygroundComponent";

class App extends Component {
  render() {
    return (
      <div className="main-container" >
        <PlaygroundComponent />
      </div>
    );
  }
}

export default App;
