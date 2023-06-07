import React from 'react'
import { Box } from '@mui/system'
import { Button, CircularProgress, Typography } from '@mui/material'
import useAxios from '../hooks/useAxios'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleScoreChange, handleAmountChange } from '../redux/action'
import { decode } from 'html-entities'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const getRandomInit = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const Question = () => {
  const [ball, setBall] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { score } = useSelector((state) => state)
  const question_category = localStorage.getItem('category')
  const amount_of_question = localStorage.getItem('count')
  let apiUrl = `/api.php?amount=${amount_of_question}`
  if (question_category) {
    apiUrl = apiUrl.concat(
      `&category=${Number(question_category)}&difficulty=medium&type=multiple`
    )
  }
  const { response, loading } = useAxios({ url: apiUrl })
  const [questionIndex, setQuestionIndex] = useState(0)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (response?.results.length) {
      const question = response?.results[questionIndex]
      let answers = [...question?.incorrect_answers]
      answers.splice(
        getRandomInit(question?.incorrect_answers.length),

        0,
        question.correct_answer
      )
      setOptions(answers)
    }
  }, [response, questionIndex])

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    )
  }
  const handleQuestions = (e) => {
    setQuestionIndex(parseInt(e.target.value))
  }
  let correct = 0
  const handleClickAnswer = (data, quiz, options) => {
    const question = response.results[questionIndex]
    if (data === question.correct_answer) {
      setBall((correct = correct + 1))
      dispatch(handleScoreChange(1, quiz, options))
      toast.success('Right answers')
    } else {
      dispatch(handleScoreChange(0, quiz, options))
      toast.error('Wrong answers')
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/final')
    }
  }

  const handleNext = (e) => {
    const question = response.results[questionIndex]
    if (e.target.textContent === question.correct_answer) {
      handleScoreChange(score + 1)
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/final')
    }
  }
  const handlePrev = (e) => {
    const question = response.results[questionIndex]
    if (e.target.textContent === question.correct_answer) {
      handleScoreChange(score - 1)
    }

    if (questionIndex - 1 < response.results.length) {
      if (questionIndex === 0) {
        setQuestionIndex(0)
      } else {
        setQuestionIndex(questionIndex - 1)
      }
    } else {
      navigate('/final')
    }
  }

  const handleFinish = (e) => {
    dispatch(handleAmountChange(50))
    navigate('/final')
  }

  return (
    <Box>
      <ToastContainer />
      {options ? (
        <>
          <Box>
            {response.results.map((num, ind) => {
              return (
                <Button
                  value={ind}
                  onClick={handleQuestions}
                  variant='contained'
                  size='small'
                  color={ind === questionIndex ? 'success' : 'secondary'}
                  key={ind}
                >
                  {ind + 1}
                </Button>
              )
            })}
          </Box>
          <Typography variant='h4'>Questions {questionIndex + 1}</Typography>
          <Typography mt={5}>
            {response ? decode(response?.results[questionIndex].question) : ''}
          </Typography>

          {options.map((data, id) => {
            return (
              <Box mb={2} key={id}>
                <Button
                  onClick={() =>
                    handleClickAnswer(
                      data,
                      response.results[questionIndex],
                      options
                    )
                  }
                  variant='contained'
                  fullWidth
                >
                  {decode(data)}
                </Button>
              </Box>
            )
          })}
          <Box mt={5}>
            <Box textAlign='start'>
              <Button variant='outlined' onClick={handlePrev}>
                Previos
              </Button>
            </Box>
            <Box textAlign='end' mt={-5}>
              <Button variant='outlined' onClick={handleNext}>
                Next
              </Button>
            </Box>
            <Typography mt={-4}>
              Score:{ball} /{response.results.length}
            </Typography>
            <Box mt={2}>
              <Button onClick={handleFinish} variant='contained' color='error'>
                Finish
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Typography>Kerak kategoriyalarni tanlang.</Typography>
          <Button onClick={() => navigate('/')}>Back to setting</Button>
        </Box>
      )}
    </Box>
  )
}

export default Question
