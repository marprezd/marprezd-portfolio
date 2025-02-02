'use client'

import { saveGuestbookEntry } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconReload, IconSend } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React, { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function GbForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const t = useTranslations('app')

  const formSchema = z.object({
    message: z.string().min(20, {
      message: t('guest-book.form.validations.short-message'),
    }).max(260, {
      message: t('guest-book.form.validations.long-message'),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: `${t('guest-book.form.toast.message')}`,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-gray-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form
        action={async (FormData) => {
          await saveGuestbookEntry(FormData)
          formRef.current?.reset()
        }}
        onSubmit={form.handleSubmit(handleSubmit)}
        ref={formRef}
      >
        <Card className="bg-gray-50 dark:bg-gray-950">
          <CardContent className="m-0 rounded-t-lg bg-white px-4 py-2 dark:bg-gray-900">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className="sr-only">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('guest-book.form.placeholder')} {...field} className="border-0 bg-white dark:bg-gray-900" />
                  </FormControl>
                  <FormDescription>
                    {t('guest-book.form.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t border-gray-200 px-3 py-2 dark:border-gray-600">
            <Button
              type="submit"
              disabled={pending}
            >
              {!pending
                ? (
                    <>
                      <IconSend />
                      {t('guest-book.form.submit-msg-btn.submit')}
                    </>
                  )
                : (
                    <>
                      <IconReload />
                      {t('guest-book.form.submit-msg-btn.pending')}
                    </>
                  )}
            </Button>
            <a className="text-xs" rel="noreferrer noopener" href="https://github.com/marprezd/marprezd-portfolio?tab=coc-ov-file" target="_blank">Code of Conduct</a>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
