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
          id="Message"
          radius="lg"
          placeholder={t('guest-book.textarea-placeholder')}
          disableAnimation
          disableAutosize
          aria-label="message"
          variant="faded"
          classNames={{
            base: 'w-full',
          /*           input: [
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
          ], */
          }}
        />
        <SubmitGuestbookMessageButton />
      </form>
    </div>
  )
}
