import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

function index() {
  const router = useRouter();
  const id = router.query.id;
  const chatboxJs = `
  import Chatbox from 'https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/chatbox/index.js';

  Chatbox.initStandard({
    agentId: 'cltd156za00fxo98iq87io149',
  });`
  
  return (
    <Container>
      <script type='module' dangerouslySetInnerHTML={{__html: chatboxJs}}/>
      <h1>Página de Materia {id} y Chatbot</h1>
      <Button onClick={() => router.push('/')}>Regresar a Inicio</Button>
      <chaindesk-chatbox-standard style={{ width: '100%', height: '650px' }} />
    </Container>
    
  )
}

export default index