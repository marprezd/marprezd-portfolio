'use client'

import type { Books } from '@/types'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React, { useRef, useState } from 'react'
import CldImage from '../cld-image'
import CtaButton from './cta-button'

export default function BookCard({
  books,
}: {
  books: Books[] | null
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const parentRef = useRef(undefined)
  const t = useTranslations('site')

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {books && books.slice(0, 4).map(book => (
          <Card
            shadow="md"
            className="border-1 border-gray-300 dark:border-gray-700"
            key={book.title}
          >
            <CardHeader className="flex items-center gap-x-4">
              {book.image && (
                <div className="w-20 flex-none">
                  <CldImage
                    className="size-20 rounded-xl"
                    alt={book.image.alt}
                    width={80}
                    height={80}
                    sizes="100vw"
                    src={book.image.src}
                    crop={{
                      width: 80,
                      height: 80,
                      type: 'fill',
                    }}
                    quality={75}
                    loading="eager"
                  />
                </div>
              )}
              <div className="grow">
                <h3 className="line-clamp-2 text-xl font-bold tracking-tighter text-default-800">
                  {book.title}
                </h3>
                <p className="text-xs uppercase text-default-700">
                  {book.authors}
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="line-clamp-2 text-default-800">
                {book.description}
              </p>
            </CardBody>
            <CardFooter as="footer" className="flex items-center justify-between space-x-2">
              <div className="inline-flex items-center gap-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Chip variant="flat" radius="md">{book.category}</Chip>
              </div>
              <div>
                <CtaButton
                  title={book.title}
                  description={book.description}
                  linkHrfef={book.link.href}
                  linkLabel={book.link.label}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
        {books && books.slice(4).map((book, i: any) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="h-0 w-full overflow-hidden duration-400 ease-in-out transition-height"
            ref={parentRef as any}
            style={{
              height: isExpanded ? (parentRef.current as any).scrollHeight : 0,
            }}
          >
            <Card
              shadow="md"
              className="border-1 border-gray-300 dark:border-gray-700"
              key={book.title}
            >
              <CardHeader className="flex items-center gap-x-4">
                {book.image && (
                  <div className="w-20 flex-none">
                    <CldImage
                      className="size-20 rounded-xl"
                      alt={book.image.alt}
                      width={80}
                      height={80}
                      sizes="100vw"
                      src={book.image.src}
                      crop={{
                        width: 80,
                        height: 80,
                        type: 'fill',
                      }}
                      quality={75}
                      loading="eager"
                    />
                  </div>
                )}
                <div className="grow">
                  <h3 className="line-clamp-2 text-xl font-bold tracking-tighter text-default-800">
                    {book.title}
                  </h3>
                  <p className="text-xs uppercase text-default-700">
                    {book.authors}
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <p className="line-clamp-2 text-default-800">
                  {book.description}
                </p>
              </CardBody>
              <CardFooter as="footer" className="flex items-center justify-between space-x-2">
                <div className="inline-flex items-center gap-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Chip variant="flat" radius="md">{book.category}</Chip>
                </div>
                <div>
                  <CtaButton
                    title={book.title}
                    description={book.description}
                    linkHrfef={book.link.href}
                    linkLabel={book.link.label}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      {books && books.length > 4 && (
        <Button
          color="primary"
          variant="bordered"
          onPress={() => setIsExpanded(!isExpanded)}
          radius="full"
          className="mt-5"
        >
          {isExpanded
            ? (
                <>
                  {t('books.show-less')}
                  <IconChevronUp />
                </>
              )
            : (
                <>
                  {t('books.show-more')}
                  <IconChevronDown />
                </>
              )}
        </Button>
      )}
    </>
  )
}
