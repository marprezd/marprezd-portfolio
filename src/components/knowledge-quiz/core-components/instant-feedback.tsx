import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import Explanation from './explanation'

interface Question {
  explanation?: string
}

function useMessageForCorrectAnswer(_question: Question): string {
  const t = useTranslations('app')
  const defaultMessage = t('blog.tabs.content.knowledge-quiz.message-for-correct-answer')
  return defaultMessage
}

interface RenderMessageProps {
  question: Question
}

function useMessageForIncorrectAnswer({ question: _question }: RenderMessageProps): string {
  const t = useTranslations('app')
  const defaultMessage = t('blog.tabs.content.knowledge-quiz.message-for-incorrect-answer')
  return defaultMessage
}

interface InstantFeedbackProps {
  showInstantFeedback: boolean
  incorrectAnswer: boolean
  correctAnswer: boolean
  question: Question
  onQuestionSubmit?: (data: { question: Question, userAnswer: any, isCorrect: boolean }) => void
  userAnswer: any
}

function InstantFeedback({
  showInstantFeedback,
  incorrectAnswer,
  correctAnswer,
  question,
  onQuestionSubmit,
  userAnswer,
}: InstantFeedbackProps) {
  const correctAnswerMessage = useMessageForCorrectAnswer(question)

  useEffect(() => {
    if (onQuestionSubmit && (correctAnswer || incorrectAnswer)) {
      onQuestionSubmit({ question, userAnswer, isCorrect: correctAnswer })
    }
  }, [correctAnswer, incorrectAnswer, onQuestionSubmit, question, userAnswer])

  const incorrectAnswerMessage = useMessageForIncorrectAnswer({ question })

  return (
    <>
      {incorrectAnswer && showInstantFeedback
        && <div className="alert incorrect">{incorrectAnswerMessage}</div>}
      {correctAnswer && showInstantFeedback && (
        <div className="alert correct">
          {correctAnswerMessage}
          <Explanation question={question} isResultPage={false} />
        </div>
      )}
    </>
  )
}

export default InstantFeedback
