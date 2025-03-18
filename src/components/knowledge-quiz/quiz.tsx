'use client'

import type { Question, QuizStructure } from '@/types/index'
import { IconFlask2Filled } from '@tabler/icons-react'
import { SquareCheckBig } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'
import Animation from '../animation'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import Core from './core'

interface QuizProps {
  quiz: QuizStructure
  disableSynopsis?: boolean
  shuffleAnswer?: boolean
  shuffle?: boolean
  showDefaultResult?: boolean
  showInstantFeedback?: boolean
  continueTillCorrect?: boolean
  revealAnswerOnSubmit?: boolean
  timer?: number
  allowPauseTimer?: boolean
  onComplete?: () => void
  customResultPage?: () => void
  onQuestionSubmit?: () => void
  enableProgressBar?: boolean
  allowNavigation?: boolean
}

function Quiz({
  quiz,
  shuffle,
  shuffleAnswer,
  showDefaultResult,
  onComplete,
  customResultPage,
  showInstantFeedback,
  continueTillCorrect,
  revealAnswerOnSubmit,
  allowNavigation,
  onQuestionSubmit,
  disableSynopsis,
  timer,
  allowPauseTimer,
  enableProgressBar,
}: QuizProps) {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState(quiz.questions)
  const t = useTranslations('app')
  const nrOfQuestions = quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length
    ? quiz.nrOfQuestions
    : quiz.questions.length

  // Shuffle answers funtion here
  const shuffleAnswerSequence = (oldQuestions: Question[] = []) => {
    const newQuestions = oldQuestions.map((question: Question) => {
      const answerWithIndex = question.answers.map((ans, i) => [ans, i])
      const shuffledAnswersWithIndex = answerWithIndex.sort(
        () => Math.random() - 0.5,
      )
      const shuffledAnswers = shuffledAnswersWithIndex.map(ans => ans[0] as string)
      if (question.answerSelectionType === 'single') {
        const oldCorrectAnswer = Array.isArray(question.correctAnswer) ? question.correctAnswer : ['']
        const newCorrectAnswer = shuffledAnswersWithIndex.findIndex(
          ans => `${Number(ans[1]) + 1}` === `${oldCorrectAnswer}`,
        ) + 1
        return {
          ...question,
          correctAnswer: `${newCorrectAnswer}`,
          answers: shuffledAnswers,
        }
      }
      if (question.answerSelectionType === 'multiple') {
        const oldCorrectAnswer = Array.isArray(question.correctAnswer) ? question.correctAnswer : []
        const newCorrectAnswer = oldCorrectAnswer.map(
          cans => shuffledAnswersWithIndex.findIndex(
            ans => `${Number(ans[1]) + 1}` === `${cans}`,
          ) + 1,
        )
        return {
          ...question,
          correctAnswer: newCorrectAnswer,
          answers: shuffledAnswers,
        }
      }
      return question
    })
    return newQuestions
  }
  interface ShuffleQuestions {
    (questions: Question[]): Question[]
  }

  const shuffleQuestions: ShuffleQuestions = useCallback((q: Question[]) => {
    for (let i = q.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[q[i], q[j]] = [q[j], q[i]]
    }
    return q
  }, [])

  useEffect(() => {
    if (disableSynopsis)
      setStart(true)
  }, [disableSynopsis])

  useEffect(() => {
    let newQuestions = quiz.questions

    if (shuffle) {
      newQuestions = shuffleQuestions(newQuestions)
    }

    if (shuffleAnswer) {
      newQuestions = shuffleAnswerSequence(newQuestions)
    }

    newQuestions.length = nrOfQuestions
    newQuestions = newQuestions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    }))
    setQuestions(newQuestions)
  }, [nrOfQuestions, quiz.questions, shuffle, shuffleAnswer, shuffleQuestions, start])

  const validateProgressBarColor = (inputColor: string) => {
    // eslint-disable-next-line regexp/no-unused-capturing-group
    const hexaPattern = /^#([a-f0-9]{6}|[a-f0-9]{3})$/i
    return hexaPattern.test(inputColor)
  }

  const validateQuiz = (q: QuizStructure) => {
    if (!q) {
      console.error('Quiz object is required.')
      return false
    }

    if ((timer !== undefined && typeof timer !== 'number') || (timer !== undefined && timer < 1)) {
      console.error(timer && typeof timer !== 'number' ? 'timer must be a number' : 'timer must be a number greater than 0')
      return false
    }

    if (allowPauseTimer && typeof allowPauseTimer !== 'boolean') {
      console.error('allowPauseTimer must be a Boolean')
      return false
    }

    if (enableProgressBar && typeof enableProgressBar !== 'boolean') {
      console.error('enableProgressBar must be a Boolean')
      return false
    }

    if ('progressBarColor' in quiz) {
      if (typeof quiz.progressBarColor !== 'string') {
        console.error('progressBarColor must be a String')
        return false
      }

      if (!validateProgressBarColor(quiz.progressBarColor)) {
        console.error('progressBarColor must be a valid hex colour')
        return false
      }
    }

    for (let i = 0; i < questions.length; i += 1) {
      const {
        question,
        questionType,
        answerSelectionType,
        answers,
        correctAnswer,
      } = questions[i]
      if (!question) {
        console.error('Field \'question\' is required.')
        return false
      }

      if (!questionType) {
        console.error('Field \'questionType\' is required.')
        return false
      }
      if (questionType !== 'text' && questionType !== 'photo') {
        console.error(
          'The value of \'questionType\' is either \'text\' or \'photo\'.',
        )
        return false
      }

      if (!answers) {
        console.error('Field \'answers\' is required.')
        return false
      }
      if (!Array.isArray(answers)) {
        console.error('Field \'answers\' has to be an Array')
        return false
      }

      if (!correctAnswer) {
        console.error('Field \'correctAnswer\' is required.')
        return false
      }

      let selectType = answerSelectionType

      if (!answerSelectionType) {
        // Default single to avoid code breaking due to automatic version upgrade
        console.warn(
          'Field answerSelectionType should be defined since v0.3.0. Use single by default.',
        )
        selectType = answerSelectionType || 'single'
      }

      if (
        selectType === 'single'
        && typeof selectType !== 'string'
      ) {
        console.error(
          'answerSelectionType is single but expecting String in the field correctAnswer',
        )
        return false
      }

      if (selectType === 'multiple' && !Array.isArray(correctAnswer)) {
        console.error(
          'answerSelectionType is multiple but expecting Array in the field correctAnswer',
        )
        return false
      }
    }

    return true
  }

  if (!validateQuiz(quiz)) {
    return null
  }

  return (
    <Animation>
      <Card className="mt-2.5 border-none shadow-none">
        {!start && (
          <>
            <CardHeader>
              <div className="size-full rounded-lg bg-muted p-4">
                <div className="mb-3 flex items-center gap-x-4">
                  <div className="inline-flex size-14 items-center justify-center rounded-full border-4 border-cyan-200 bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-800">
                    <IconFlask2Filled className="size-6 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-900 dark:text-white">
                      {quiz.quizTitle}
                    </h3>
                  </div>
                </div>
                {quiz.quizSynopsis && (
                  <div className="text-sm text-muted-foreground">
                    {quiz.quizSynopsis}
                    <span className="ms-1 gap-x-1.5 rounded-sm bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                      {t('blog.tabs.content.knowledge-quiz.header-text', { number: nrOfQuestions })}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Button onClick={() => setStart(true)} variant="outline" className="touch-manipulation">
                  <SquareCheckBig />
                  {t('blog.tabs.content.knowledge-quiz.start-quiz-btn')}
                </Button>
              </div>
            </CardContent>
          </>
        )}
        {start && (
          <Core
            questions={questions}
            showDefaultResult={showDefaultResult}
            onComplete={onComplete}
            customResultPage={customResultPage}
            showInstantFeedback={showInstantFeedback}
            continueTillCorrect={continueTillCorrect}
            revealAnswerOnSubmit={revealAnswerOnSubmit}
            allowNavigation={allowNavigation}
            onQuestionSubmit={onQuestionSubmit}
            timer={timer}
            allowPauseTimer={allowPauseTimer}
            enableProgressBar={enableProgressBar}
            progressBarColor={quiz.progressBarColor}
          />
        )}
      </Card>
    </Animation>
  )
}

export default Quiz
