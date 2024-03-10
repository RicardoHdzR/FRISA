import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row, ListGroup, Card, Image, Text, Form, Spinner } from 'react-bootstrap';
import { FaThumbsUp, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

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

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [currentOptions, setCurrentOptions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([false, false, false, false]);
  const [correct, setCorrect] = useState(undefined)
  const [session, setSession] = useState(undefined)

  const sessionHandler = async () => {
    //Obtenemos la sesión
    const session = await axios.get(`/api/session`)
    //Si existe información de sesión la lee y decide a donde mandar al usuario/admin
    if(session.data == null){
        router.push('/logIn')
    }else{
      setSession(session.data)
    }
  }

  const handleEvaluation = () => {
    console.log(currentQuestion)
    console.log(answers.length)
    console.log(answers)
    for (let i = 0; i < 4; i++) {
      console.log(i)
      console.log(answers[i])
      console.log(currentOptions[i].correct)
      if (answers[i] == currentOptions[i].correct) {
        setCorrect('Respuesta Correcta')
      } else {
        setCorrect('Respuesta Incorrecta')
        break
      }
    }
    console.log(correct)
  };

  const handleQuestionChange = () => {
    setQuestionIndex(questionIndex + 1)
    console.log(questionIndex)
    setCurrentQuestion(JSON.parse(questions[questionIndex].question))
    console.log(currentQuestion)
    setCurrentOptions(JSON.parse(questions[questionIndex].question).options)
    console.log(currentOptions)
    setAnswers([false, false, false, false])
    setCorrect(undefined)
  };

  const handleQuestionBack = () => {
    setQuestionIndex(questionIndex - 1)
    setCurrentQuestion(JSON.parse(questions[questionIndex].question))
    setCurrentOptions(JSON.parse(questions[questionIndex].question).options)

  };

  const handleCheckboxChange = (index) => {
    setAnswers((answers) => ({
      ...answers, [index]: !answers[index]
    }))
  }

  const getQuestions = async () => {
    console.log('fetch preguntas')
    try {
      const response = await fetch('/api/question')
      const { data } = await response.json()
      console.log(data)
      console.log(data[0])
      console.log(JSON.parse(data[0].question))
      console.log(JSON.parse(data[0].question).options)
      setQuestions(data)
      setCurrentQuestion(JSON.parse(data[0].question))
      setCurrentOptions(JSON.parse(data[0].question).options)
      setQuestionIndex(1)
      console.log('questions fetched')
    } catch (error) {
      console.error('Error fetching questions:', error);

    }
  }

  const handleRefresh = () => {
    router.reload();
  };

  useEffect(() => {
    sessionHandler()
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
      
      <Container>
      <_Navbar />
      <Container >
        <h1 className='mt-5'>{materia}</h1>
        <Button variant='danger' className='mb-3' onClick={() => router.push('/')}>Regresar a Materias</Button>
        <Button variant='danger' className='mb-3 mx-3' onClick={handleRefresh}>Carga el Chatbot</Button>
      </Container>

      <Row>
        <Col className='col-sm-12 col-lg-8' fluid >
          <Container className='' style={{ display: 'flex', flexDirection: 'column' }}>
            <Container >
              <iframe className='w-100' style={{ height: '70vh', border: '1px solid black', borderRadius: '10px' }} src={`/${id}.pdf`} ></iframe>
            </Container>


            <Row style={{ textAlign: 'left' }}>
              <h5 style={{ textAlign: 'left' }} className=" align-left mt-4 mb-4">Herramientas de Apoyo:</h5>
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

        <Col className=' col-sm-12 col-lg-4 ' >
          <Container className='' style={{ width: '100%' }}>

            <chaindesk-chatbox-standard style={{ width: '100%', height: '70vh', border: '1px solid gray', borderRadius: '10px' }} />
          </Container>

          <Container className='h-50'>

            <Form className='text-start mb-3'>
              <Form.Group>
                <h5 style={{ textAlign: 'left' }} className=" align-left mt-4 mb-4">{`Pregunta ${questionIndex} (Selecciona solo 1 opción)`}</h5>
                <Form.Label>{currentQuestion.question}</Form.Label>

                {currentOptions.map((option, index) => (
                  <div key={index}>
                    <Form.Check className='card'
                      type='checkbox'
                      name='p1'
                      id={`${index}`}
                      label={`${option.answer}`}
                      checked={answers[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    ></Form.Check>
                  </div>
                ))}

              </Form.Group>
            </Form>
            {correct == undefined ? <div></div> : <div className={correct === "Respuesta Correcta" ? 'text-success' : 'text-danger'}>{correct}</div>}
            <div className='text-end'>

              <Button className='ms-3' onClick={handleEvaluation}>
                <FaThumbsUp /> Evaluar              </Button>


              {correct == undefined || correct == "Respuesta Incorrecta" ? <div></div> : <Button className='ms-3' onClick={handleQuestionChange}>

                
                <FaArrowRight /> Siguiente Pregunta
              </Button>}


            </div>
          </Container>




        </Col>



      </Row>
      </Container>
    </Container>


  )
}

export default index