import type { SVGProps } from 'react'
// svg
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

// Wakapi
export interface WakapiSummaries {
  data: {
    data: [
      {
        grand_total: {
          hours: number
        }
        range: {
          start: string
        }
      },
    ]
    daily_average: {
      seconds: number
    }
    end: string
  }
}

export interface WakapiStats {
  data: {
    data: {
      total_seconds: number
      daily_average: number
      languages: [
        {
          name: string
          total_seconds: number
        },
      ]
      categories: [
        {
          name: string
          total_seconds: number
        },
      ]
    }
  }
}

// Github stats
export interface Stats {
  stars: number
  totalCommits: number
  totalRepos: number
  followers: number
  contributions: number
  prs: number
  issues: number
  contributionCalendar: {
    totalContributions: string
    weeks: [{
      contributionDays: [{
        date: string
        contributionCount: number
      }]
    }]
  }
}

// quiz
export type QuestionType = 'text' | 'photo'
export type AnswerSelectionType = 'single' | 'multiple'

export interface Question {
  question: string
  questionType: QuestionType
  questionPic?: string
  answerSelectionType: AnswerSelectionType
  answers: string[]
  correctAnswer: string | number[]
  explanation: string
  point: string
}

export interface QuizStructure {
  quizTitle: string
  quizSynopsis: string
  progressBarColor: string
  nrOfQuestions: number
  questions: Question[]
}
