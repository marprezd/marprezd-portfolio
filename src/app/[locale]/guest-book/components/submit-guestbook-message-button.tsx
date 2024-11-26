'use client'

import { Button } from '@nextui-org/button'
import { IconReload, IconSend } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'

function SubmitGuestbookMessageButton() {
  const { pending } = useFormStatus()
  const t = useTranslations('site')

  return (
    <Button
      color="primary"
      variant="flat"
      disabled={pending}
      className="my-4"
    >
      {!pending
        ? (
            <>
              <IconSend className="size-5" />
              {t('guest-book.submit-msg-btn.send')}
            </>
          )
        : (
            <>
              <IconReload className="size-5 animate-spin" />
              {t('guest-book.submit-msg-btn.pending')}
            </>
          )}
    </Button>
  )
}

export default SubmitGuestbookMessageButton
