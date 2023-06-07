import { CHANGE_CATEGORY, CHANGE_SCORE, CHANGE_AMOUNT } from './actionTypes'
const initialState = {
  question_category: '',
  amount_of_question: 20,
  quiz: [],
}
if (localStorage.getItem('quiz')) {
  initialState.quiz = JSON.parse(localStorage.getItem('quiz'))
} else {
  initialState.quiz = []
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        question_category: action.payload,
      }
    case CHANGE_AMOUNT:
      return {
        amount_of_question: action.payload,
      }
    case CHANGE_SCORE:
      return {
        quiz: [...action.payload],
      }

    default:
      return state
  }
}

export default reducer
