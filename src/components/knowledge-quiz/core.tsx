/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { IconInfoCircle } from '@tabler/icons-react'
import { nanoid } from 'nanoid'
import { useTranslations } from 'next-intl'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import Explanation from './core-components/explanation'
import { checkAnswer, rawMarkup, selectAnswer } from './core-components/helpers'
import InstantFeedback from './core-components/instant-feedback'
import ProgressBar from './core-components/progress-bar'
import QuizResultFilter from './core-components/quiz-result-filter'

type QuestionType = 'text' | 'photo'
type AnswerSelectionType = 'single' | 'multiple'

interface Question {
  [x: string]: any
  question: string
  questionType: QuestionType
  answers: string[]
  correctAnswer: string | number[]
  answerSelectionType: AnswerSelectionType
  messageForCorrectAnswer?: string
  messageForIncorrectAnswer?: string
  explanation?: string
  point?: string
  segment?: string
}

interface QuestionSummary {
  numberOfQuestions: number
  numberOfCorrectAnswers: number
  numberOfIncorrectAnswers: number
  questions: Question[]
  userInput: (number | number[])[]
  totalPoints: number
  correctPoints: number
  timeTaken: number
}

interface CoreProps {
  questions: Question[]
  disableSynopsis?: boolean
  shuffleAnswer?: boolean
  shuffle?: boolean
  showDefaultResult?: boolean
  showInstantFeedback?: boolean
  continueTillCorrect?: boolean
  revealAnswerOnSubmit?: boolean
  timer?: number
  allowPauseTimer?: boolean
  onComplete?: (summary: QuestionSummary) => void
  customResultPage?: () => void
  onQuestionSubmit?: () => void
  enableProgressBar?: boolean
  allowNavigation?: boolean
  progressBarColor?: unknown
}

function Core({
  questions,
  showDefaultResult,
  onComplete,
  customResultPage,
  showInstantFeedback,
  continueTillCorrect,
  revealAnswerOnSubmit,
  allowNavigation,
  onQuestionSubmit,
  timer,
  allowPauseTimer,
  enableProgressBar,
  progressBarColor,
}: CoreProps) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false)
  const [endQuiz, setEndQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [buttons, setButtons] = useState({})
  const [correct, setCorrect] = useState<number[]>([])
  const [incorrect, setIncorrect] = useState<number[]>([])
  const [unanswered, setUnanswered] = useState<number[]>([])
  const [userInput, setUserInput] = useState<(number | number[])[]>([])
  const [filteredValue, setFilteredValue] = useState<'incorrect' | 'correct' | 'all' | 'unanswered'>('all')
  const [userAttempt, setUserAttempt] = useState(1)
  const [showDefaultResultState, setShowDefaultResult] = useState(true)
  const [answerSelectionTypeState, setAnswerSelectionType] = useState<AnswerSelectionType>('single')
  const [totalPoints, setTotalPoints] = useState(0)
  const [correctPoints, setCorrectPoints] = useState(0)
  const [activeQuestion, setActiveQuestion] = useState(questions[currentQuestionIndex])

  const t = useTranslations('app')

  interface QuestionSummary {
    numberOfQuestions: number
    numberOfCorrectAnswers: number
    numberOfIncorrectAnswers: number
    questions: Question[]
    userInput: (number | number[])[]
    totalPoints: number
    correctPoints: number
    timeTaken: number
  }

  const [questionSummary, setQuestionSummary] = useState<QuestionSummary | undefined>(undefined)
  const [timeRemaining, setTimeRemaining] = useState(timer)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    setShowDefaultResult(showDefaultResult !== undefined ? showDefaultResult : true)
  }, [showDefaultResult])

  useEffect(() => {
    setActiveQuestion(questions[currentQuestionIndex])
  }, [currentQuestionIndex, questions])

  useEffect(() => {
    const { answerSelectionType } = activeQuestion
    // Default single to avoid code breaking due to automatic version upgrade
    setAnswerSelectionType(answerSelectionType || 'single')
  }, [activeQuestion, currentQuestionIndex])

  useEffect(() => {
    if (endQuiz) {
      setIsRunning(false)
      let totalPointsTemp = 0
      let correctPointsTemp = 0
      for (let i = 0; i < questions.length; i += 1) {
        let point = questions[i].point || 0
        if (typeof point === 'string') {
          point = Number.parseInt(point, 10)
        }

        totalPointsTemp += point

        if (correct.includes(i)) {
          correctPointsTemp += point
        }
      }
      setTotalPoints(totalPointsTemp)
      setCorrectPoints(correctPointsTemp)
    }
  }, [correct, endQuiz, questions])

  useEffect(() => {
    setQuestionSummary({
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions,
      userInput,
      totalPoints,
      correctPoints,
      timeTaken: timer ? timer - (timeRemaining ?? 0) : 0,
    })
  }, [totalPoints, correctPoints, questions, correct.length, incorrect.length, userInput, timer, timeRemaining])

  useEffect(() => {
    if (endQuiz && onComplete !== undefined && questionSummary !== undefined) {
      onComplete(questionSummary)
    }
  }, [endQuiz, onComplete, questionSummary])

  const nextQuestion = (currentQuestionIdx: number) => {
    setIncorrectAnswer(false)
    setIsCorrect(false)
    setShowNextQuestionButton(false)
    setButtons({})

    if (currentQuestionIdx + 1 === questions.length) {
      if (userInput.length !== questions.length) {
        setShowNextQuestionButton(true)
        setIsCorrect(false)
        setIncorrectAnswer(true)
      }
      else if (allowNavigation) {
        // Show a custom confirmation dialog instead of using confirm
        setShowNextQuestionButton(true)
        setIsCorrect(false)
        setIncorrectAnswer(true)
        setShowConfirmationDialog(true)
      }
      else {
        setEndQuiz(true)
      }
    }
    else {
      setCurrentQuestionIndex(currentQuestionIdx + 1)
    }
  }

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setFilteredValue(event.target.value as 'incorrect' | 'correct' | 'all' | 'unanswered')
  }

  const renderAnswerInResult = (question: Question, userInputIndex: string | any[] | undefined) => {
    const { answers, correctAnswer, questionType } = question as Question & { correctAnswer: number[] }
    let { answerSelectionType } = question
    let answerBtnCorrectClassName
    let answerBtnIncorrectClassName

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single'

    return answers.map((answer, index) => {
      if (answerSelectionType === 'single') {
        // correctAnswer - is string
        answerBtnCorrectClassName = `${index + 1}` === correctAnswer ? 'correct' : ''
        answerBtnIncorrectClassName = `${userInputIndex}` !== correctAnswer
          && `${index + 1}` === `${userInputIndex}`
          ? 'incorrect'
          : ''

        if (userInputIndex === undefined && `${index + 1}` !== correctAnswer) {
          answerBtnIncorrectClassName = 'unanswered'
        }
      }
      else {
        // correctAnswer - is array of numbers
        answerBtnCorrectClassName = (correctAnswer as number[]).includes(index + 1)
          ? 'correct'
          : ''
        answerBtnIncorrectClassName = !(correctAnswer as number[]).includes(index + 1)
          && Array.isArray(userInputIndex) && userInputIndex.includes(index + 1)
          ? 'incorrect'
          : ''

        if (userInputIndex === undefined && !correctAnswer.includes(index + 1)) {
          answerBtnIncorrectClassName = 'unanswered'
        }
      }

      return (
        <div key={nanoid()}>
          <button
            type="button"
            disabled
            className={`answerBtn mb-2 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 focus:outline-hidden focus:ring-4 focus:ring-gray-700 dark:border-gray-300 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-800 ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
          >
            {questionType === 'text' && <span>{answer}</span>}
            {questionType === 'photo' && <img src={answer} alt="answer" />}
          </button>
        </div>
      )
    })
  }

  const renderTags = (answerSelectionType: string, numberOfSelection: number, segment: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    return (
      <div className="flex items-center gap-2 w-full">
        {answerSelectionType === 'single'
          && <span className="flex items-center gap-x-1.5 bg-yellow-100 dark:bg-yellow-200 px-3 py-1.5 rounded-sm font-medium text-yellow-900 dark:text-yellow-950 text-xs">{t('blog.tabs.content.knowledge-quiz.single-selection-tag-text')}</span>}
        {answerSelectionType === 'multiple'
          && <span className="flex items-center gap-x-1.5 bg-yellow-100 dark:bg-yellow-200 px-3 py-1.5 rounded-sm font-medium text-yellow-900 dark:text-yellow-950 text-xs">{t('blog.tabs.content.knowledge-quiz.multiple-selection-tag-text')}</span>}
        <span className="flex items-center gap-x-1.5 bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-sm font-medium text-gray-900 dark:text-gray-100 text-xs">
          {t('blog.tabs.content.knowledge-quiz.pick-number-of-selection', { numberOfSelection })}
        </span>
        {segment && <span>{segment}</span>}
      </div>
    )
  }

  const renderQuizResultQuestions = useCallback(() => {
    let filteredQuestions
    let filteredUserInput: any[]

    if (filteredValue !== 'all') {
      let targetQuestions = unanswered
      if (filteredValue === 'correct') {
        targetQuestions = correct
      }
      else if (filteredValue === 'incorrect') {
        targetQuestions = incorrect
      }
      filteredQuestions = questions.filter(
        (_, index) => targetQuestions.includes(index),
      )
      filteredUserInput = userInput.filter(
        (_, index) => targetQuestions.includes(index),
      )
    }

    return (filteredQuestions || questions).map((question, index) => {
      const userInputIndex = filteredUserInput
        ? filteredUserInput[index]
        : userInput[index]

      // Default single to avoid code breaking due to automatic version upgrade
      const answerSelectionType = question.answerSelectionType || 'single'

      return (
        <Card key={nanoid()} className="my-5">
          <CardHeader className='pb-4'>
            <CardTitle>
              <h3
                // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                dangerouslySetInnerHTML={rawMarkup(
                  `Q${question.questionIndex}: ${
                    question.question
                  } ${t('blog.tabs.content.knowledge-quiz.marks-of-question', { marks: activeQuestion.point })}`,
                )}
              />
              {question.questionPic && (
                <img src={question.questionPic} alt="question" />
              )}
            </CardTitle>
            <CardDescription>
              {renderTags(
                answerSelectionType,
                question.correctAnswer.length,
                question.segment,
              )}
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <h4 className="mb-2 font-semibold text-sm">{t('blog.tabs.content.knowledge-quiz.response')}</h4>
            {renderAnswerInResult(question, userInputIndex)}
          </CardContent>
          <Separator />
          <CardFooter className="pt-4">
            <div>
              <h4 className="mb-2 font-semibold text-sm">{t('blog.tabs.content.knowledge-quiz.explanation')}</h4>
              <Explanation question={question} isResultPage />
            </div>
          </CardFooter>
        </Card>
      )
    })
  }, [endQuiz, filteredValue])

  const renderAnswers = (question: Question, answerButtons: { [x: string]: {
    disabled: boolean
    className: any
  } }) => {
    const {
      answers,
      correctAnswer,
      questionType,
      questionIndex,
    } = question
    let { answerSelectionType } = question
    const onClickAnswer = (index: number) => checkAnswer(index + 1, correctAnswer, answerSelectionType, answers, {
      userInput,
      userAttempt,
      currentQuestionIndex,
      continueTillCorrect,
      showNextQuestionButton,
      incorrect,
      correct,
      setButtons,
      setIsCorrect,
      setIncorrectAnswer,
      setCorrect,
      setIncorrect,
      setShowNextQuestionButton,
      setUserInput,
      setUserAttempt,
    })

    const onSelectAnswer = (index: number) => selectAnswer(index + 1, correctAnswer, answerSelectionType, answers, {
      userInput,
      currentQuestionIndex,
      setButtons,
      setShowNextQuestionButton,
      incorrect,
      correct,
      setCorrect,
      setIncorrect,
      setUserInput,
    })

    const checkSelectedAnswer = (index: number | number[]) => {
      if (userInput[questionIndex - 1] === undefined) {
        return false
      }
      if (answerSelectionType === 'single') {
        return userInput[questionIndex - 1] === index
      }
      return Array.isArray(userInput[questionIndex - 1]) && (userInput[questionIndex - 1] as number[]).includes(index as number)
    }

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single'

    return answers.map((answer, index) => (
      <Fragment key={nanoid()}>
        {(answerButtons[index] !== undefined)
          ? (
              <button
                type="button"
                disabled={answerButtons[index].disabled || false}
                className={`${answerButtons[index].className || ''} answerBtn mb-2 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 focus:outline-hidden focus:ring-4 focus:ring-gray-700 dark:border-gray-300 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-800`}
                onClick={() => (revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index))}
              >
                {questionType === 'text' && <span>{answer}</span>}
                {questionType === 'photo' && <img src={answer} alt="answer" />}
              </button>
            )
          : (
              <button
                type="button"
                onClick={() => (revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index))}
                className={`answerBtn mb-2 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 focus:outline-hidden focus:ring-4 focus:ring-gray-700 dark:border-gray-300 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-800 ${(allowNavigation && checkSelectedAnswer(index + 1)) ? 'selected' : ''}`}
              >
                {questionType === 'text' && answer}
                {questionType === 'photo' && <img src={answer} alt="answer" />}
              </button>
            )}
      </Fragment>
    ))
  }

  const getUnansweredQuestions = () => {
    questions.forEach((question, index) => {
      if (userInput[index] === undefined) {
        setUnanswered(oldArray => [...oldArray, index])
      }
    })
  }

  const renderResult = () => (
    <Card className="bg-transparent shadow-none px-0 border-none">
      <CardHeader>
        <CardTitle>
          {t('blog.tabs.content.knowledge-quiz.result-page-header-text', { correctIndexLength: correct.length, questionLength: questions.length })}
        </CardTitle>
        <div className="flex justify-between items-center text-muted-foreground text-sm">
          {t('blog.tabs.content.knowledge-quiz.result-page-point', { correctPoints, totalPoints })}
          <QuizResultFilter
            filteredValue={filteredValue}
            handleChange={handleChange}
          />
        </div>
      </CardHeader>
      <CardContent className='px-0'>
        {renderQuizResultQuestions()}
      </CardContent>
    </Card>
  )

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined

    if (timer && isRunning && (timeRemaining ?? 0) > 0) {
      countdown = setInterval(() => {
        setTimeRemaining(prevTime => (prevTime ?? 0) - 1)
      }, 1000)
    }
    return () => {
      if (countdown) {
        clearInterval(countdown)
      }
    }
  }, [isRunning, timeRemaining, timer])

  useEffect(() => {
    if (timer && timeRemaining === 0 && isRunning) {
      // eslint-disable-next-line ts/no-use-before-define
      handleTimeUp()
    }
    if (timer && timeRemaining === 0 && isRunning) {
      // eslint-disable-next-line ts/no-use-before-define
      handleTimeUp()
    }
  }, [timeRemaining, isRunning, timer])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const formatTime = (time: number) => (time < 10 ? '0' : '')
  const displayTime = (time: number | undefined) => {
    const safeTime = time ?? 0
    const hours = Math.floor(safeTime / 3600)
    const minutes = Math.floor((safeTime % 3600) / 60)
    const seconds = safeTime % 60

    return `${formatTime(hours)}${hours}:${formatTime(minutes)}${minutes}:${
      formatTime(seconds)
    }${seconds}`
  }

  const handleTimeUp = () => {
    setIsRunning(false)
    setEndQuiz(true)
    getUnansweredQuestions()
  }

  return (
    <>
      <CardHeader className='px-0'>
        <div className="flex lg:flex-row flex-col flex-wrap items-center font-light text-sm">
          {enableProgressBar && (
            <>
              <div className="basis-8/12">
                <ProgressBar
                  progress={currentQuestionIndex + 1}
                  quizLength={questions.length}
                  isEndQuiz={endQuiz}
                  progressBarColor={progressBarColor as string | undefined}
                />
              </div>
            </>
          )}

          {timer && !isRunning && (
            <div className="basis-4/12">
              <div className="text-center lg:text-right">
                {t('blog.tabs.content.knowledge-quiz.timer-time-taken')}
                :
                {' '}
                <span className="ml-1 font-mono font-medium text-red-700 dark:text-red-300">{displayTime(timer - (timeRemaining ?? 0))}</span>
              </div>
            </div>
          )}

          {timer && isRunning && (
            <div className="basis-4/12">
              <div className="text-center lg:text-right">
                {t('blog.tabs.content.knowledge-quiz.timer-time-remaining')}
                :
                <span className="ml-1 font-mono font-medium text-green-700 dark:text-green-300">{displayTime(timeRemaining)}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      {!endQuiz && (
        <CardContent className='px-0'>
          <div className="flex items-center font-mono font-medium text-sm">
            {`${t('blog.tabs.content.knowledge-quiz.question')} ${currentQuestionIndex + 1} / ${
              questions.length
            }`}

            {timer && allowPauseTimer && (
              <button
                type="button"
                onClick={toggleTimer}
                className={
                  `focus:outline-hidden ml-2 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-2.5 py-1.5 font-mono text-sm font-medium disabled:pointer-events-none hover:opacity-90 
              ${isRunning ? 'text-red-700 bg-red-100 dark:text-red-950 dark:bg-red-300' : 'text-green-700 bg-green-100 dark:text-green-950 dark:bg-green-300'}`
                }
              >
                {isRunning ? t('blog.tabs.content.knowledge-quiz.pause-screen-pause') : t('blog.tabs.content.knowledge-quiz.pause-screen-resume')}
              </button>
            )}
          </div>
          {isRunning
            ? (
                <>
                  <h3
                    // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                    dangerouslySetInnerHTML={rawMarkup(
                      `${
                        activeQuestion && activeQuestion.question
                      } ${t('blog.tabs.content.knowledge-quiz.marks-of-question', { marks: activeQuestion.point })}
                      `,
                    )}
                    className="font-light text-2xl"
                  />
                  {activeQuestion && activeQuestion.questionPic && (
                    <img className="shadow-lg mx-auto my-4 rounded-xl" src={activeQuestion.questionPic} alt="question" />
                  )}
                  <div className="my-4">
                    {activeQuestion
                      && renderTags(
                        answerSelectionTypeState,
                        activeQuestion.correctAnswer.length,
                        activeQuestion.segment,
                      )}
                  </div>
                  <div className="questionModal">
                    <InstantFeedback
                      question={activeQuestion}
                      showInstantFeedback={showInstantFeedback ?? false}
                      correctAnswer={isCorrect}
                      incorrectAnswer={incorrectAnswer}
                      onQuestionSubmit={onQuestionSubmit}
                      userAnswer={[...userInput].pop()}
                    />
                  </div>
                  {activeQuestion && renderAnswers(activeQuestion, buttons)}
                  {(showNextQuestionButton || allowNavigation) && (
                    <div className="flex justify-start">
                      <button
                        onClick={() => nextQuestion(currentQuestionIndex)}
                        className="bg-gray-700 dark:bg-gray-800 hover:opacity-90 mb-2 px-5 py-2.5 dark:border-gray-300 rounded-lg focus:outline-hidden focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-800 font-medium text-white dark:text-white text-sm"
                        type="button"
                      >
                        {t('blog.tabs.content.knowledge-quiz.next-question')}
                      </button>
                    </div>
                  )}
                </>
              )
            : (
                <div className="space-y-5 mt-10">
                  <div
                    className="bg-yellow-50 dark:bg-yellow-950 p-4 border-yellow-500 border-t-2 rounded-lg"
                    role="alert"
                    tabIndex={-1}
                    aria-labelledby="test-paused"
                  >
                    <div className="flex">
                      <div className="shrink-0">
                        <span className="inline-flex justify-center items-center bg-yellow-200 dark:bg-yellow-800 border-4 border-yellow-100 dark:border-yellow-900 rounded-full size-8 text-yellow-800 dark:text-yellow-400">
                          <IconInfoCircle className="size-4 shrink-0" />
                        </span>
                      </div>
                      <div className="ms-3">
                        <h3
                          id="test-paused"
                          className="font-semibold text-yellow-950 dark:text-white"
                        >
                          {t('blog.tabs.content.knowledge-quiz.test-paused')}
                        </h3>
                        <p className="text-yellow-900 dark:text-yellow-50 text-sm">
                          {t('blog.tabs.content.knowledge-quiz.pause-screen-display')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </CardContent>
      )}
      {endQuiz && showDefaultResultState && customResultPage === undefined
        && renderResult()}
      {endQuiz && !showDefaultResultState && customResultPage !== undefined
        ? customResultPage() ?? null
        : null}
    </>
  )
}

export default Core

function setShowConfirmationDialog(_arg0: boolean) {
  throw new Error('Function not implemented.')
}
