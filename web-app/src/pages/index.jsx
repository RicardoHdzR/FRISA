import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { Container, Card, ListGroup} from 'react-bootstrap'
import _Navbar from '../components/Navbar'

function Home() {
  const router = useRouter()

  return (
    <Container>
        <_Navbar/>
        <h1>Página de Materias</h1>
        <Card>
          <Card.Body>
            <Card.Title>
              Selecciona la materia que te gustaría estudiar
            </Card.Title>

            <ListGroup>
              <ListGroup.Item action onClick={() => router.push('/materia/1')}>De la Información al Conocimiento</ListGroup.Item>
              <ListGroup.Item action onClick={() => router.push('/materia/2')}>El lenguaje en la Relación del Hombre con el Mundo</ListGroup.Item>
              <ListGroup.Item action onClick={() => router.push('/materia/3')}>Textos y Visiones del Mundo</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
    </Container>
  )
}

export default Home