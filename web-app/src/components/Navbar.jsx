import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Image, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSession } from '../utils/session';

function _Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session'); 
        const data = await response.json();
        setIsLoggedIn(!!data); 
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout');
      const data = await response.json();
      router.push('/');
      router.reload();
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <Navbar className="bg-body-tertiary" fixed='top' >
      <Navbar.Brand href='/' ><Image src='/logo.png' className='w-75 m-0'></Image></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Row className="w-100">
          <Col className="d-flex justify-content-end">
            {isLoggedIn && <Button variant="outline-danger" onClick={handleLogout}>Cerrar Sesión</Button>}
          </Col>
        </Row>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default _Navbar;
