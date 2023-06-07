import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleScoreChange, handleAmountChange } from '../redux/action'
import { decode } from 'html-entities'
import sendDataToTelegramBot from '../hooks/useTelegram'
const FinalSecrem = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quiz = JSON.parse(localStorage.getItem('quiz'))
  const totalCorrect = quiz.reduce((sum, item) => {
    // setCorrect(sum)
    return sum + item.correct
  }, 0)
  const handleToSetting = () => {
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(50))
    sendDataToTelegramBot(
      `Dear user. You have scored ${totalCorrect} out of ${
        quiz.length
      } questions in the ${decode(
        quiz[0].category
      )} category. Good luck with your next tests.`
    )
    setTimeout(() => {
      localStorage.removeItem('quiz')
    }, 2000)
    return navigate('/')
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Typography variant='h3' fontWeight='bold'>
        Final Score {totalCorrect}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Number</TableCell>
              <TableCell align='center'>Questions</TableCell>
              <TableCell align='center' colSpan={4}>
                Answers
              </TableCell>
              <TableCell align='center'>Ball</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quiz.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{decode(row.question)}</TableCell>
                {row.options.map((item) => (
                  <TableCell
                    key={item}
                    className={
                      item === row.correct_answer
                        ? 'correct_answer'
                        : 'incorrect_answers'
                    }
                  >
                    {decode(item)}
                  </TableCell>
                ))}
                <TableCell>{row.correct}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ mt: 4 }} onClick={handleToSetting}>
        Back to Setting!
      </Button>
    </Box>
  )
}

export default FinalSecrem
