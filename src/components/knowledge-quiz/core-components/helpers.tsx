import type { Dispatch, SetStateAction } from 'react'
import dompurify from 'dompurify'
import snarkdown from 'snarkdown'

export function rawMarkup(data: string | Node) {
  const sanitizer = dompurify.sanitize
  return { __html: snarkdown(sanitizer(data)) }
}

export function checkAnswer(index: number, correctAnswer: string | any[], answerSelectionType: string, answers: string[], {
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
}: { userInput: (number | number[])[], userAttempt: number, currentQuestionIndex: number, continueTillCorrect: boolean | undefined, showNextQuestionButton: boolean, incorrect: number[], correct: number[], setButtons: Dispatch<SetStateAction<{ [key: number]: any }>>, setIsCorrect: Dispatch<SetStateAction<boolean>>, setIncorrectAnswer: Dispatch<SetStateAction<boolean>>, setCorrect: Dispatch<SetStateAction<number[]>>, setIncorrect: Dispatch<SetStateAction<number[]>>, setShowNextQuestionButton: Dispatch<SetStateAction<boolean>>, setUserInput: Dispatch<SetStateAction<(number | number[])[]>>, setUserAttempt: Dispatch<SetStateAction<number>> }) {
  const indexStr = `${index}`
  const disabledAll = Object.keys(answers).map(() => ({ disabled: true }))
  const userInputCopy = [...userInput]
  if (answerSelectionType === 'single') {
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = index
    }

    if (indexStr === correctAnswer) {
      if (!incorrect.includes(currentQuestionIndex) && !correct.includes(currentQuestionIndex)) {
        correct.push(currentQuestionIndex)
      }

      setButtons(prevState => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
        },
      }))

      setIsCorrect(true)
      setIncorrectAnswer(false)
      setCorrect(correct)
      setShowNextQuestionButton(true)
    }
    else {
      if (!correct.includes(currentQuestionIndex) && !incorrect.includes(currentQuestionIndex)) {
        incorrect.push(currentQuestionIndex)
      }

      if (continueTillCorrect) {
        setButtons(prevState => (
          {

            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
            },
          }
        ))
      }
      else {
        setButtons(prevState => (
          {

            ...prevState,
            ...disabledAll,
            [index - 1]: {
              className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
            },
          }
        ))

        setShowNextQuestionButton(true)
      }

      setIncorrectAnswer(true)
      setIsCorrect(false)
      setIncorrect(incorrect)
    }
  }
  else {
    const maxNumberOfMultipleSelection = correctAnswer.length

    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = []
    }

    if (Array.isArray(userInputCopy[currentQuestionIndex]) && userInputCopy[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
      if (Array.isArray(userInputCopy[currentQuestionIndex])) {
        if (Array.isArray(userInputCopy[currentQuestionIndex])) {
          if (Array.isArray(userInputCopy[currentQuestionIndex])) {
            if (Array.isArray(userInputCopy[currentQuestionIndex])) {
              (userInputCopy[currentQuestionIndex] as number[]).push(index)
            }
          }
        }
      }

      if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons(prevState => ({
          ...prevState,
          [index - 1]: {
            disabled: !prevState[index - 1],
            className: (correctAnswer.includes(index.toString())) ? 'correct' : 'incorrect',
          },
        }))
      }
    }

    if (maxNumberOfMultipleSelection === userAttempt) {
      let cnt = 0
      for (let i = 0; i < correctAnswer.length; i += 1) {
        if (Array.isArray(userInputCopy[currentQuestionIndex]) && userInputCopy[currentQuestionIndex].includes(correctAnswer[i])) {
          cnt += 1
        }
      }

      if (cnt === maxNumberOfMultipleSelection) {
        correct.push(currentQuestionIndex)

        setIsCorrect(true)
        setIncorrectAnswer(false)
        setCorrect(correct)
        setShowNextQuestionButton(true)
        setUserAttempt(1)
      }
      else {
        incorrect.push(currentQuestionIndex)

        setIncorrectAnswer(true)
        setIsCorrect(false)
        setIncorrect(incorrect)
        setShowNextQuestionButton(true)
        setUserAttempt(1)
      }
    }
    else if (!showNextQuestionButton) {
      setUserAttempt(userAttempt + 1)
    }
  }
  setUserInput(userInputCopy)
}

export function selectAnswer(index: number, correctAnswer: string | number | any[], answerSelectionType: string, answers: string[], {
  userInput,
  currentQuestionIndex,
  setButtons,
  setShowNextQuestionButton,
  incorrect,
  correct,
  setCorrect,
  setIncorrect,
  setUserInput,
}: { userInput: (number | number[])[], currentQuestionIndex: number, setButtons: Dispatch<SetStateAction<object>>, setShowNextQuestionButton: Dispatch<SetStateAction<boolean>>, incorrect: number[], correct: number[], setCorrect: Dispatch<SetStateAction<number[]>>, setIncorrect: Dispatch<SetStateAction<number[]>>, setUserInput: Dispatch<SetStateAction<(number | number[])[]>> }) {
  const selectedButtons = Object.keys(answers).map(() => ({ selected: false }))
  const userInputCopy = [...userInput]
  if (answerSelectionType === 'single') {
    correctAnswer = Number(correctAnswer)
    userInputCopy[currentQuestionIndex] = index

    if (index === correctAnswer) {
      if (!correct.includes(currentQuestionIndex)) {
        correct.push(currentQuestionIndex)
      }
      if (incorrect.includes(currentQuestionIndex)) {
        incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1)
      }
    }
    else {
      if (!incorrect.includes(currentQuestionIndex)) {
        incorrect.push(currentQuestionIndex)
      }
      if (correct.includes(currentQuestionIndex)) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1)
      }
    }
    setCorrect(correct)
    setIncorrect(incorrect)

    setButtons(prevState => ({
      ...prevState,
      ...selectedButtons,
      [index - 1]: {
        className: 'selected',
      },
    }))

    setShowNextQuestionButton(true)
  }
  else {
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = []
    }
    if (Array.isArray(userInputCopy[currentQuestionIndex]) && userInputCopy[currentQuestionIndex].includes(index)) {
      userInputCopy[currentQuestionIndex].splice(userInputCopy[currentQuestionIndex].indexOf(index), 1)
    }
    else {
      if (Array.isArray(userInputCopy[currentQuestionIndex])) {
        userInputCopy[currentQuestionIndex].push(index)
      }
    }
    if (Array.isArray(userInputCopy[currentQuestionIndex]) && Array.isArray(correctAnswer) && userInputCopy[currentQuestionIndex].length === correctAnswer.length) {
      let exactMatch = true
      if (Array.isArray(userInput[currentQuestionIndex])) {
        for (const input of userInput[currentQuestionIndex]) {
          if (Array.isArray(correctAnswer) && !correctAnswer.includes(input)) {
            exactMatch = false
            if (!incorrect.includes(currentQuestionIndex)) {
              incorrect.push(currentQuestionIndex)
            }
            if (correct.includes(currentQuestionIndex)) {
              correct.splice(correct.indexOf(currentQuestionIndex), 1)
            }
            break
          }
        }
      }
      if (exactMatch) {
        if (!correct.includes(currentQuestionIndex)) {
          correct.push(currentQuestionIndex)
        }
        if (incorrect.includes(currentQuestionIndex)) {
          incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1)
        }
      }
    }
    else {
      if (!incorrect.includes(currentQuestionIndex)) {
        incorrect.push(currentQuestionIndex)
      }
      if (correct.includes(currentQuestionIndex)) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1)
      }
    }
    setCorrect(correct)
    setIncorrect(incorrect)
    setButtons(prevState => ({
      ...prevState,
      [index - 1]: {
        className: Array.isArray(userInputCopy[currentQuestionIndex]) && userInputCopy[currentQuestionIndex].includes(index) ? 'selected' : undefined,
      },
    }))

    if (Array.isArray(userInputCopy[currentQuestionIndex]) && userInputCopy[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true)
    }
  }
  setUserInput(userInputCopy)
}
