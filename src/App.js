import React from 'react';
import { Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Login />
        </header>
      </Switch>
    </div>
  );
}
