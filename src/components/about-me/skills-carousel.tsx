'use client'

import type { EmblaOptionsType } from 'embla-carousel'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/carousel/embla-carousel-arrow-buttons'
import { useAutoplay } from '@/components/carousel/embla-carousel-autoplay'
import { useAutoplayProgress } from '@/components/carousel/embla-carousel-autoplay-progress'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useRef } from 'react'
import '@/styles/embla-carousel.css'

interface PropType {
  techs: any[]
  options?: EmblaOptionsType
}

const SkillsCarousel: React.FC<PropType> = (props) => {
  const { techs, options } = props
  const progressNode = useRef<HTMLDivElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick }
    = useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

  return (
    <div>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {techs.slice(0, techs.length).map(tech => (
              <div className="embla__slide" key={tech.title}>
                <Card className="border-1 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900" shadow="sm">
                  <CardHeader className="techs-center flex flex-row space-x-2">
                    {tech.icon}
                    <h3 className="font-medium">
                      {tech.title}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <Progress
                      size="sm"
                      radius="sm"
                      classNames={{
                        base: 'max-w-md mt-1',
                        track: 'drop-shadow-md border border-default',
                        indicator: 'bg-gradient-to-r from-palettes-primary-90 to-palettes-primary-40',
                        label: 'tracking-wider font-medium text-default-600',
                        value: 'text-foreground/60',
                      }}
                      label="Skill"
                      value={tech.score}
                      showValueLabel
                    />
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={() => onAutoplayButtonClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
            />
          </div>

          <div
            className={`embla__progress`.concat(
              showAutoplayProgress ? '' : ' embla__progress--hidden',
            )}
          >
            <div className="embla__progress__bar" ref={progressNode} />
          </div>

          <Button variant="bordered" color="default" onClick={toggleAutoplay}>
            {autoplayIsPlaying ? 'Stop' : 'Start'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SkillsCarousel
