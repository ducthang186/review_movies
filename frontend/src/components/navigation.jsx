import React from "react";

import {Link} from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function Navigation({user, logout}){
  return(
    <>
      <Navbar bg="light">
        <Navbar.Brand href="/movies">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            { user ? (
                <Nav.Link as="span" onClick={logout} style={{ cursor: 'pointer' }}>Logout User</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigation