'use client'

import type { FormikHelpers } from 'formik'
import type { FC } from 'react'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import axios from 'axios'
import { ErrorMessage, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import React from 'react'
import * as Yup from 'yup'
import AlertError from './alert-error'
import AlertSuccess from './alert-success'

// eslint-disable-next-line node/prefer-global/process
const formspreedID: string | undefined = process.env.NEXT_PUBLIC_FORM

interface Values {
  name: string
  email: string
  message: string
}

const ContactForm: FC = () => {
  const t = useTranslations('site')
  const initialValues: Values = {
    name: '',
    email: '',
    message: '',
  }

  return (
    <div>
      <p className="font-medium text-cyan-950 dark:text-cyan-50">{t('footer.contact-me.label')}</p>
      <div className="mt-4 flex flex-col space-y-4 text-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(5, t('footer.contact-me.fields.validations.name.min'))
              .max(15, t('footer.contact-me.fields.validations.name.max'))
              .required(t('footer.contact-me.fields.validations.name.required')),
            email: Yup.string()
              .email(t('footer.contact-me.fields.validations.email.invalid'))
              .required(t('footer.contact-me.fields.validations.email.required')),
            message: Yup.string()
              .min(160, t('footer.contact-me.fields.validations.message.min'))
              .max(1000, t('footer.contact-me.fields.validations.message.max'))
              .required(t('footer.contact-me.fields.validations.message.required')),
          })}
          onSubmit={(
            values: Values,
            { setStatus, resetForm }: FormikHelpers<Values>,
          ) => {
            axios({
              method: 'post',
              url: `https://formspree.io/f/${formspreedID}`,
              data: values,
            })
              .then((res) => {
                setStatus(res.status)
                if (res.status === 200) {
                  resetForm()
                  setStatus({
                    sent: true,
                    msg: t('footer.contact-me.alerts.sent.msg'),
                  })
                }
              })
              .catch((err) => {
                resetForm()
                setStatus({
                  sent: false,
                  msg: t('footer.contact-me.alerts.error.msg', { err: `${err}` }),
                })
              })
          }}
        >
          {({ isSubmitting, status, handleSubmit, getFieldProps }) => (
            <form className="flex flex-col gap-2.5" onSubmit={handleSubmit} noValidate>
              <Input
                id="name"
                size="sm"
                radius="lg"
                type="text"
                label={t('footer.contact-me.fields.name.label')}
                placeholder={t('footer.contact-me.fields.name.placeholder')}
                aria-label="name"
                {...getFieldProps('name')}
                classNames={{
                  input: [
                    'bg-transparent',
                    'text-black dark:text-white',
                    'placeholder:text-default-800/50 dark:placeholder:text-cyan-50/50',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'bg-white dark:bg-cyan-900',
                    'data-[hover=true]:bg-white/70 dark:data-[hover=true]:bg-cyan-900/70',
                    'group-data-[focus=true]:bg-default-100',
                  ],
                }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="flex items-center rounded-md border-t-4 border-red-300 bg-red-50 p-2.5 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
              />
              <Input
                id="email"
                size="sm"
                radius="lg"
                type="email"
                label={t('footer.contact-me.fields.email.label')}
                placeholder={t('footer.contact-me.fields.email.placeholder')}
                aria-label="email"
                {...getFieldProps('email')}
                classNames={{
                  input: [
                    'bg-transparent',
                    'text-black dark:text-white',
                    'placeholder:text-default-800/50 dark:placeholder:text-cyan-50/50',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'bg-white dark:bg-cyan-900',
                    'data-[hover=true]:bg-white/70 dark:data-[hover=true]:bg-cyan-900/70',
                    'group-data-[focus=true]:bg-default-100',
                  ],
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="flex items-center rounded-md border-t-4 border-red-300 bg-red-50 p-2.5 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
              />
              <Textarea
                id="Message"
                radius="lg"
                label={t('footer.contact-me.fields.message.label')}
                placeholder={t('footer.contact-me.fields.message.placeholder')}
                disableAnimation
                disableAutosize
                aria-label="message"
                {...getFieldProps('message')}
                classNames={{
                  base: 'max-w-xs',
                  input: [
                    'resize-y min-h-[40px]',
                    'bg-transparent',
                    'text-black dark:text-white',
                    'placeholder:text-default-800/50 dark:placeholder:text-cyan-50/50',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'bg-white dark:bg-cyan-900',
                    'data-[hover=true]:bg-white/70 dark:data-[hover=true]:bg-cyan-900/70',
                    'group-data-[focus=true]:bg-default-100',
                  ],
                }}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="flex items-center rounded-md border-t-4 border-red-300 bg-red-50 p-2.5 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
              />
              {status && status.msg && (
                <div>
                  {status.sent
                    ? (
                        <AlertSuccess>
                          {status.msg}
                        </AlertSuccess>
                      )
                    : (
                        <AlertError>
                          {status.msg}
                        </AlertError>
                      )}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="shadow"
                color="primary"
              >
                {isSubmitting ? t('footer.contact-me.fields.send-form.is-submiting') : t('footer.contact-me.fields.send-form.submit')}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ContactForm
