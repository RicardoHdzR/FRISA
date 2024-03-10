import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import _Navbar from '../components/Navbar';
import axios from 'axios';

function Home() {
  const router = useRouter();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const sessionHandler = async () => {
    //Obtenemos la sesión
    const session = await axios.get(`/api/session`)
    //Si existe información de sesión la lee y decide a donde mandar al usuario/admin
    console.log(session)
    if(session.data == null){
        router.push('/logIn')
    }
}

  useEffect(() => {
    sessionHandler()
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch('/api/course');
      const data = await response.json();
      setModules(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching modules:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <div>
          <Spinner animation="border" role="status"></Spinner>
          <p>Cargando...</p>
        </div>
      ) : (

        <Container>
        <_Navbar/>
      <Row style={{ textAlign: 'left' }}>
  <h1 className="mt-4 mb-4">Bloque 1</h1>
</Row>
        <Row>
        {modules.map((module) => (
          <Col key={module.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-3 hover-overlay shadow-1-strong" onClick={() => router.push(`/materia/${module.id}`)}>
              <Card.Header className='bg-danger text-white' >
                <strong>{module.name}</strong>
              </Card.Header>
              <Card.Body>
                <Card.Title>{module.description}</Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted"> 0 / 10</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
        
        </Container>
        
        
      )}
      <style jsx>{`
        .card:hover {
          background-color: lightgray;
        }
      `}</style>
    </Container>
  );
}

export default Home;
