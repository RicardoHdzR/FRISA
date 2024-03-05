import React, {useEffect, useState} from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';

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
    
    <Container>
      <script type='module' dangerouslySetInnerHTML={{__html: chatbox}}/>

      <h1>{materia}</h1>
      <Button className='mb-3' onClick={() => router.push('/')}>Regresar a Inicio</Button>
      <div>
        {chatbox && 
        <Row>
          <Col className='mb-3'>
            <iframe src={`/${id}.pdf`} width='500px' height='500px' ></iframe>
          </Col>
          <Col className='mb-3'>
            <chaindesk-chatbox-standard style={{ width: '100%', height: '500px' }} />
          </Col>
        </Row>
        }
        
      
      </div>
      
    </Container>
    
    
  )
}

export default index