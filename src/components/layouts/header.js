import React from 'react'
import {Link} from 'react-router-dom'
import './header.scss'

function Header() {
  return (
    <ul className="list">
      <li className="list-item">
        <Link to="/create"><h3>Create</h3></Link>
      </li>
      <li className="list-item">
        <Link to="/"><h3>Home</h3></Link>
      </li>
      <li className="list-item">
        <Link to="/edit"><h3>Edit</h3></Link>
      </li>
    </ul>
  );

}

export default Header