import React, {useEffect, useState} from 'react'
import { Button, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import _Navbar from '../../../components/Navbar';

function index() {
  const router = useRouter();
  
  const id = router.query.id;
  const [chatbox, setChatbox] = useState(`
    import Chatbox from 'https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/chatbox/index.js';
    
    Chatbox.initStandard({
      agentId: 'cltd156za00fxo98iq87io149',
    });
  `)
  const [materia, setMateria] = useState('')
  
  const handleRefresh = () => {
    router.reload()
  }
  /*
    import Chatbox from 'https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/chatbox/index.js';
  
    Chatbox.initStandard({
      agentId: 'cltd156za00fxo98iq87io149',
    });`)
  }*/

  useEffect(() => {
    if(id){
      
      if(id != undefined){
        console.log('seteamos el id')
        if(id == 1){
          setMateria('De la Información al Conocimiento')
        }else if(id == 2){
          setMateria('El lenguaje en la Relación del Hombre con el Mundo')
        }else if(id == 3){
          setMateria('Textos y Visiones del Mundo')
        }
      }
    }
  },[id])
  
  return (
    
    <Container >
      <script type='module' dangerouslySetInnerHTML={{__html: chatbox}}/>
      <_Navbar/>
      <Container >
        <h1 className='mt-5'>{materia}</h1>
        
          <Button className='mb-3' onClick={() => router.push('/')}>Regresar a Inicio</Button>
          <Button className='mb-3 mx-3' onClick={handleRefresh}>Carga el Chatbot</Button>
      </Container>

      <Row>
        <Col className='mb-3' >
          <iframe src={`/${id}.pdf`} width='650px' height='500px' ></iframe>
        </Col>
        <Col className='mb-3' >
          <chaindesk-chatbox-standard style={{ width: '100%', height: '500px' }} />
          <ListGroup horizontal className='justify-content-center'>
            <ListGroup.Item>Herramienta 1</ListGroup.Item>
            <ListGroup.Item>Herramienta 2</ListGroup.Item>
            <ListGroup.Item>Herramienta 3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
    
    
  )
}

export default index