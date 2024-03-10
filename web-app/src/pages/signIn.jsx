import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import _Navbar from '../components/Navbar';

function SignIn() {
    const router = useRouter()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState({})

    const handleSignUp = async () => {
        const userDetails = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            email: email,
            password: password
        };

        
        const response = await fetch('/api/frisauser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        const userData = await response.json();
        
        if (userData.data.length === 0) {
            setErrorMessage('Email o contraseña inválido. Inténtalo de nuevo.');
            return;
        }
        setUser(userData.data[0]);
        
    };

    useEffect(() => {
        
        if (user.id) {
            router.push('/');
        }
    }, [user]);

    return (
        <Container fluid className="p-0 m-0" style={{ height: '100vh' }}>
            <_Navbar />

            <div
                style={{
                    backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.70), 
                      rgba(0, 0, 0, 0.70)
                      ), url('https://info.insidetracker.com/hubfs/man%20computer%20wellness%20myths.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    minWidth: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card className='justify-content-center'>
                    <Card.Body className='m-4'>
                    <h1 className='mb-4'>Crear Cuenta 👤</h1>

                        <Form>
                            <Form.Group className='mb-3'>
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Nombre</strong></Form.Label>
                                </Row>
                                <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Apellido</strong></Form.Label>
                                </Row>
                                <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Fecha de Nacimiento</strong></Form.Label>
                                </Row>
                                <Form.Control type='date' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Correo Electrónico</strong></Form.Label>
                                </Row>
                                <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='nombre@ejemplo.com' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Contraseña</strong></Form.Label>
                                </Row>
                                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>


                            <Row className='mb-3'>
                                <Button variant='danger' onClick={handleSignUp}>Registrarse</Button>
                            </Row>
                            <Row className='mb-3'>
                                <Card.Text>{errorMessage}</Card.Text>
                            </Row>
                            <Row className='mb-3'>
                                <Card.Text>¿Ya tienes una cuenta?</Card.Text>
                            </Row>
                            <Row className='mb-3'>
                                <Button variant='secondary' onClick={() => router.push('/logIn')}>Iniciar Sesión</Button>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default SignIn;
