import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../Images/APEX Global PNG.png'

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container">
    <Link className="navbar-brand" to='/'id='navbar-itm-text-logo'><img src={Logo} width='150'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item" id='navbar-itm-link'>
          <Link className="nav-link" id='navbar-itm-text' aria-current="page" to='/'>Home</Link>
        </li>
        <li className="nav-item" id='navbar-itm-link'>
          <Link className="nav-link" id='navbar-itm-text' to=''>About</Link>
        </li>
        <li className="nav-item" id='navbar-itm-link'>
          <Link className="nav-link" id='navbar-itm-text' to=''>Service</Link>
        </li>
        <li className="nav-item" id='navbar-itm-link'>
          <Link className="nav-link" id='navbar-itm-text' to=''>Contact</Link>
        </li>
      </ul>
      <Link style={{ textDecoration: 'none'}}  to='/login'>
        <div className='login-btn-nav'>
             Login
        </div>
      </Link>
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar