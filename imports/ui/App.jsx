/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Students from './Students'
import Navbar from './Navbar'

export default class App extends Component {
  render () {
    return (
      <div className="main-container">
        <Navbar></Navbar>
        <Students></Students>
      </div>
    )
  }
}
