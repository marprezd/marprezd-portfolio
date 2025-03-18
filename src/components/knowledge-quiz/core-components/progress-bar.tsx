import React from 'react'

interface ProgressBarProps {
  progressBarColor?: string
  progress: number
  height?: string
  quizLength: number
  isEndQuiz: boolean
}

function ProgressBar({
  progressBarColor = '#0e7490',
  progress,
  height = '25px',
  quizLength,
  isEndQuiz,
}: ProgressBarProps) {
  const fixedProgress = progress - 1
  const progressUnit = 100 / quizLength

  const progressBarContainer: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#D0D4CA',
    height,
    borderRadius: 40,
    position: 'relative' as const,
    overflow: 'hidden',
  }

  const progressBar = {
    width: isEndQuiz ? '100%' : `${progressUnit * fixedProgress}%`,
    height: '100%',
    backgroundColor: progressBarColor,
    transition: 'width 0.3s ease',
  }

  const progressBarLabel = {
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    lineHeight: '20px',
    fontSize: '16px',
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  }

  return (
    <div style={progressBarContainer}>
      <div style={progressBar} />
      <span style={progressBarLabel}>
        {isEndQuiz ? '100%' : `${Math.round(progressUnit * fixedProgress)}%`}
      </span>
    </div>
  )
}

export default ProgressBar
