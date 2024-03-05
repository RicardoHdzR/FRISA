import React from 'react'
import { Card, Form, Row, Button, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'

function logIn() {
  const router = useRouter()
  return (
    <Container>
        <Card className='justify-content-center d-flex'>
            <Card.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type='email' placeholder='nombre@ejemplo.com' />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type='password' />
                    </Form.Group>
                    
                    <Row className='mb-3'>
                        <Button variant='primary' >Iniciar Sesión</Button>
                    </Row>
                    <Row className='mb-3'>
                        <Card.Text>¿No tienes una Cuenta?</Card.Text>
                    </Row>
                    <Row className='mb-3'>
                        <Button variant='info' onClick={() => router.push('/signIn')}>Registrarse</Button>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    )
}

export default logIn