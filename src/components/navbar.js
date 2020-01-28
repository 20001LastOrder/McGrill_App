import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthButton } from '../App'
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <AuthButton />
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/campus" className="nav-link">Assignments and Notes Taking</Link>
          </li>
          <li className="navbar-item">
            <Link to="/issue" className="nav-link">Fire an Issue</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}