/* eslint-disable no-unused-vars */
import React from 'react'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'

export default function Navbar () {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <AccountsUIWrapper />
                  <span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
