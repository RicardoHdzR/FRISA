import { useRouter } from 'next/router'
import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'

function signIn() {
  const router = useRouter()
  return (
    <Container>
        <Card className='justify-content-center'>
            <Card.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type='date'></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type='email' placeholder='nombre@ejemplo.com' />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type='password' ></Form.Control>
                    </Form.Group>
                   
                    
                    <Row className='mb-3'>
                        <Button variant='primary'>Registrarse</Button>
                    </Row>
                    <Row className='mb-3'>
                        <Card.Text>¿Ya tienes una cuenta?</Card.Text>
                    </Row>
                    <Row className='mb-3'>
                        <Button variant='info' onClick={() => router.push('/logIn')}>Iniciar Sesión</Button>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    
  )
}

export default signIn
