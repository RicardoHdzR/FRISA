import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row, ListGroup, Card, Image, Text, Form } from 'react-bootstrap';
import Link from "next/link"

import { useRouter } from 'next/router';
import _Navbar from '../../../components/Navbar';

function index() {
  const router = useRouter();

  const { id } = router.query;
  const [chatbox, setChatbox] = useState(`
    import Chatbox from 'https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/chatbox/index.js';
    
    Chatbox.initStandard({
      agentId: 'cltd156za00fxo98iq87io149',
    });
  `);
  const [materia, setMateria] = useState('');
  const [studyTools, setStudyTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [currentOptions, setCurrentOptions] = useState([])

  const handleOption = (e) => {
    console.log(e.target.id)
    setSelectedOption(e.target.id)
  };

  const handleQuestion = async () => {
    

  };

  const getQuestions = async () => {
    console.log('fetch preguntas')
    try{
      const response = await fetch('/api/question')
      const {data} = await response.json()
      console.log(data)
      console.log(data[0])
      console.log(JSON.parse(data[0].question))
      console.log(JSON.parse(data[0].question).options)
      setQuestions(data)
      setCurrentQuestion(JSON.parse(data[0].question))
      setCurrentOptions(JSON.parse(data[0].question).options)
      console.log('questions fetched')
    }catch (error) {
      console.error('Error fetching questions:', error);
      
    }
    
    
    
  }



  const handleRefresh = () => {
    router.reload();
  };

  useEffect(() => {
    getStudyTools()
    getQuestions()
    if (id) {
      if (id != undefined) {
        console.log('seteamos el id');
        if (id == 1) {
          setMateria('De la Información al Conocimiento');
        } else if (id == 2) {
          setMateria('El lenguaje en la Relación del Hombre con el Mundo');
        } else if (id == 3) {
          setMateria('Textos y Visiones del Mundo');
        }
      }
    }
  }, [id]);


  const getStudyTools = async () => {
    try {
      const response = await fetch('/api/studytool');
      const data = await response.json();
      console.log(data)
      setStudyTools(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching modules:', error);
      setLoading(true);
    }
  };




  return (

    <Container >
      <script type='module' dangerouslySetInnerHTML={{ __html: chatbox }} />
      <_Navbar />
      <Container >
        <h1 className='mt-5'>{materia}</h1>

        <Button variant='danger' className='mb-3' onClick={() => router.push('/')}>Regresar a Inicio</Button>
        <Button variant='danger' className='mb-3 mx-3' onClick={handleRefresh}>Carga el Chatbot</Button>
      </Container>

      <Row>
        <Col className='col-8' fluid >

          <Container className='' style={{ display: 'flex', flexDirection: 'column' }}>



            <Container >
              <iframe className='w-100' style={{ height: '70vh', border: '1px solid black', borderRadius: '10px' }} src={`/${id}.pdf`} ></iframe>
            </Container>


            <Row style={{ textAlign: 'left' }}>
              <h5 className="mt-4 mb-4">Herramientas de Apoyo:</h5>
            </Row>


            <div class="carousel" style={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', gap: '8px' }}>
              <div class="card-container" style={{ width: '100%', display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', gap: '8px' }}>
                {studyTools.map((studyTool) => (
                  <Container>
                    <a href={studyTool.url} target='_blank' class="card" style={{ minWidth: '150px', height: '150px', scrollSnapAlign: 'start' }}>
                      <Image src={studyTool.imageurl} style={{ objectFit: 'contain', width: '100%', height: '100%' }}  ></Image>
                    </a>
                    <p class="text-left pt-2"><strong>{studyTool.toolname}</strong></p>
                  </Container>
                ))}
              </div>
            </div>


          </Container>
        </Col>



        <Col className='col-4' >
          <Container className='mb-3 h-50'>
            <chaindesk-chatbox-standard style={{ width: '100%', height: '50vh', border: '1px solid gray', borderRadius: '10px' }} />
          </Container>

          <Container className='bg-danger h-50'>
            <Form className='text-start mb-3'>
              <Form.Group>
                <Form.Label>{currentQuestion.question}</Form.Label>
                
                {currentOptions.map((option,index) => (
                  <div key={index}>
                    <Form.Check type='checkbox' name='p1' id={`p1-${index}`} label={`${option.answer}`}></Form.Check>
                  </div>
                ))}
                
              </Form.Group>
            </Form>
            <div className='text-end'>
              <Button className='ms-3' >Evaluar</Button>
              <Button className='ms-3'>Siguiente Pregunta</Button>
            </div>
            
          </Container>


        </Col>



      </Row>
    </Container>


  )
}

export default index