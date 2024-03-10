import React from 'react'
import { Navbar, Nav, Image } from 'react-bootstrap'

function _Navbar() {
  return (
    <Navbar className="bg-body-tertiary" fixed='top' >
        <Navbar.Brand href='/'><Image src='/logo.png' className='w-50 m-0'></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
    </Navbar>
  )
}

export default _Navbar