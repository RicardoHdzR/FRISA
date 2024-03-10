import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import _Navbar from '../components/Navbar';


function LogIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogIn = async () => {
        const userDetails = {
            email: email,
            password: password,
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
                <Card>
                    <Card.Body className='m-4'>
                        <h1 className='mb-4'>Bienvenido 👋</h1>

                        <Form>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Correo Electrónico</strong></Form.Label>
                                </Row>
                                <Form.Control
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Form.Label style={{ textAlign: 'left' }}><strong>Contraseña</strong></Form.Label>
                                </Row>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Button variant="danger" onClick={handleLogIn}>
                                    Iniciar Sesión
                                </Button>
                            </Row>
                            {errorMessage && (
                                <Row className="mb-3">
                                    <p className="text-danger">{errorMessage}</p>
                                </Row>
                            )}
                            <Row className="mb-3">
                                <Card.Text>¿No tienes una Cuenta?</Card.Text>
                            </Row>
                            <Row className="mb-3">
                                <Button variant="secondary" onClick={() => router.push('/signIn')}>
                                    Registrarse
                                </Button>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default LogIn;
