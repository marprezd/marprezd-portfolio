'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { IconCheck, IconFilter } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

interface QuizResultFilterProps {
  filteredValue: 'all' | 'correct' | 'incorrect' | 'unanswered'
  handleChange: (event: React.ChangeEvent<{ value: string }>) => void
}

function QuizResultFilter({ filteredValue, handleChange }: QuizResultFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('app')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (value: string) => {
    const event = {
      target: { value },
      currentTarget: { value },
      preventDefault: () => {},
      stopPropagation: () => {},
      nativeEvent: {} as Event,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      timeStamp: Date.now(),
      type: 'change',
    } as React.ChangeEvent<{ value: string }>

    handleChange(event)
    setIsOpen(false)
  }

  // const selectedOptionClass = isOpen ? 'selected-open' : ''
  const selectedValuesLocale = {
    all: t('blog.tabs.content.knowledge-quiz.all-answers'),
    correct: t('blog.tabs.content.knowledge-quiz.correct-answers'),
    incorrect: t('blog.tabs.content.knowledge-quiz.incorrect-answers'),
    unanswered: t('blog.tabs.content.knowledge-quiz.unanswered'),
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen
        && dropdownRef.current
        && !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={toggleDropdown}
            variant="ghost"
          >
            {selectedValuesLocale[filteredValue as 'all' | 'correct' | 'incorrect' | 'unanswered']}
            <IconFilter />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>{t('blog.tabs.content.knowledge-quiz.filter-by')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleOptionClick('all')}>
                {filteredValue === 'all' ? <IconCheck size={16} /> : ''}
                {t('blog.tabs.content.knowledge-quiz.all-answers')}
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleOptionClick('correct')}>
                {filteredValue === 'correct' ? <IconCheck size={16} /> : ''}
                {t('blog.tabs.content.knowledge-quiz.correct-answers')}
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleOptionClick('incorrect')}>
                {filteredValue === 'incorrect' ? <IconCheck size={16} /> : ''}
                {t('blog.tabs.content.knowledge-quiz.incorrect-answers')}
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleOptionClick('unanswered')}>
                {filteredValue === 'unanswered' ? <IconCheck size={16} /> : ''}
                {t('blog.tabs.content.knowledge-quiz.unanswered')}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default QuizResultFilter
