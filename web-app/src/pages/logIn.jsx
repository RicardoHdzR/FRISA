import React, {useState, useEffect} from 'react'
import { Card, Form, Row, Button, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'

function logIn() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})

  const handleLogIn = async () => {
    const userDetails = {
        email: email,
        password: password,}
    const response = fetch('/api/users', {
        method: 'POST',
        body: userDetails
    })

    const userData = response.data
    setUser(userData)
  }

  useEffect(() => {
    if(user.user_id){
        router.push(`/`)
    }
  },[user])
  
  return (
    <Container>
        <Card className='justify-content-center d-flex'>
            <Card.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type='email' placeholder='nombre@ejemplo.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    
                    <Row className='mb-3'>
                        <Button variant='primary' onClick={handleLogIn}>Iniciar Sesión</Button>
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