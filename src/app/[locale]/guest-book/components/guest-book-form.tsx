import submitGuestbookMessage from '@/lib/supabase/guest-book/submitGuestbookMessage'
import { Textarea } from '@nextui-org/input'
import { useTranslations } from 'next-intl'
import SubmitGuestbookMessageButton from './submit-guestbook-message-button'

export default function GuestbookForm() {
  const t = useTranslations('site')
  return (
    <div>
      <form action={submitGuestbookMessage} className="mx-auto flex max-w-xl flex-col items-center justify-center">
        <Textarea
          id="message"
          radius="lg"
          placeholder={t('guest-book.textarea-placeholder')}
          disableAutosize
          name="message"
          variant="faded"
          minRows={4}
        />
        <SubmitGuestbookMessageButton />
      </form>
    </div>
  )
}
