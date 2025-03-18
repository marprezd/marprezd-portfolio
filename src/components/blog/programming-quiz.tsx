import type { QuizStructure } from '@/types/index'
import { neon } from '@neondatabase/serverless'
import { getTranslations } from 'next-intl/server'
import Quiz from '../knowledge-quiz/quiz'

interface ProgrammingQuizProps {
  post: string
}

// set neon environment variable
// eslint-disable-next-line node/prefer-global/process
const neon_string_connection: string = process.env.QUIZ_DATABASE_URL || ''

// get data from quiz database
async function getData(post: string) {
  const quizId = post
  const sql = neon(neon_string_connection)
  const response = await sql`SELECT * FROM quiz WHERE title = ${quizId}`

  // return the mapped response from the `getData` function.
  return response.map((question: Record<string, any>) => ({
    question: question.question,
    questionType: question.questiontype,
    questionPic: question.questionpic,
    answerSelectionType: question.answerselectiontype,
    answers: question.answers,
    correctAnswer: question.correctanswer,
    explanation: question.explanation,
    point: question.point,
  }))
}

async function ProgrammingQuiz({ post }: ProgrammingQuizProps) {
  const questions = await getData(post)

  const t = await getTranslations('app')
  const quizData: QuizStructure = {
    quizTitle: t('blog.tabs.content.knowledge-quiz.first-line'),
    quizSynopsis: t('blog.tabs.content.knowledge-quiz.second-line'),
    progressBarColor: '#4caf50',
    nrOfQuestions: 4,
    questions,
  }

  return (
    <Quiz
      quiz={quizData}
      timer={120}
      allowPauseTimer
      enableProgressBar
      showInstantFeedback
    />
  )
}

export default ProgrammingQuiz
