import React from 'react';
import { Navbar, Nav, Image, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';

function _Navbar() {
  const router = useRouter();

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
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default _Navbar;