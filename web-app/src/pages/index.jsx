import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container} from 'react-bootstrap'

function Home() {
  const router = useRouter()
  

  return (
    <Container>
        <h1>Página de Materias</h1>
        <Button onClick={() => router.push('/materia/1')}>Ir a Materia</Button>
    </Container>
  )
}

export default Home