import React, { Component } from 'react';
import Students from './Students';

export default class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Students></Students>
      </div>
    );
  }
}