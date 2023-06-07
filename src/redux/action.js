import { decode } from 'html-entities'
import { CHANGE_CATEGORY, CHANGE_AMOUNT, CHANGE_SCORE } from './actionTypes'

export const handleCategoryChange = (payload) => async (dispatch) => {
  localStorage.setItem('category', JSON.stringify(payload))
  dispatch({
    type: CHANGE_CATEGORY,
    payload,
  })
}

export const handleAmountChange = (payload) => async (dispatch) => {
  localStorage.setItem('count', JSON.stringify(Number(payload)))

  dispatch({
    type: CHANGE_AMOUNT,
    payload,
  })
}

export const handleScoreChange =
  (score, question, options) => async (dispatch) => {
    const quiz = localStorage.getItem('quiz')
      ? JSON.parse(localStorage.getItem('quiz'))
      : []
    const dublicates = quiz.filter(
      (cartItem) => decode(cartItem.question) === decode(question.question)
    )
    console.log(dublicates, 'jj')
    if (dublicates.length === 0) {
      const quizAdd = {
        ...question,
        correct: score,
        options,
      }
      quiz.push(quizAdd)
      localStorage.setItem('quiz', JSON.stringify(quiz))
      dispatch({
        type: CHANGE_SCORE,
        payload: quiz,
      })
    }
  }
