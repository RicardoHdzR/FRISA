import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

function index() {
  const router = useRouter();
  const id = router.query.id;
  
  return (
    <Container>
      <h1>Página de Materia {id} y Chatbot</h1>
      <Button onClick={() => router.push('/')}>Regresar a Inicio</Button>
    </Container>
    
  )
}

export default index