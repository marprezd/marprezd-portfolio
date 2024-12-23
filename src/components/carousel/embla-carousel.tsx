'use client'

import type { Post } from '#site/content'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import PostCard from '../posts/post-card'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './embla-carousel-arrow-buttons'
import { DotButton, useDotButton } from './embla-carousel-dot-button'

interface PropType {
  posts: Post[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const t = useTranslations('site')
  const { options, posts } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick }
    = useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="container mx-auto py-10 md:py-20">
      <div>
        <h2 className="mb-4 text-left text-3xl font-bold">
          {t('posts.related-posts.title')}
          {' '}
          <span className="ms-2 text-lg font-light text-gray-600 dark:text-gray-300">{t('posts.related-posts.sub-title')}</span>
        </h2>
      </div>
      <div className="embla p-2 md:p-0">
        <div ref={emblaRef} className="embla__viewport">
          <div className="embla__container">
            {posts.slice(0, 12).map(post => (
              <div key={post.slug} className="embla__slide">
                <div className="p-2">
                  <PostCard post={post} shadow="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
            <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                  index === selectedIndex ? ' embla__dot--selected' : '',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
