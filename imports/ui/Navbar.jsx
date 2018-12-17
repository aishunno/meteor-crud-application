/* eslint-disable no-unused-vars */
import React from 'react'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'

export default function Navbar () {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">ReactMeteor</a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <AccountsUIWrapper />
                <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  )
}
