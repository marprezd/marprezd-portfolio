import { Button } from '@/components/ui/button'
import { IconLogin2, IconLogout2 } from '@tabler/icons-react'
import { signIn, signOut } from 'auth'
import { useTranslations } from 'next-intl'

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  const t = useTranslations('app')
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button {...props} variant="ghost" size="sm" className="w-full">
        <IconLogout2 />
        {t('guest-book.user.sign-out')}
      </Button>
    </form>
  )
}

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const t = useTranslations('app')
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider)
      }}
    >
      <Button {...props} variant="ghost" size="sm" className="w-full">
        <IconLogin2 />
        {t('guest-book.user.sign-in')}
      </Button>
    </form>
  )
}

export function SignUp({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const t = useTranslations('app')
  return (
    <div className="flex items-center justify-center text-sm">
      {t('guest-book.not-user.card.create-account.info')}
      <form
        action={async () => {
          'use server'
          await signIn(provider)
        }}
      >
        <Button {...props} variant="link" size="sm" className="text-primary">
          {t('guest-book.not-user.card.create-account.sign-up')}
        </Button>
      </form>
    </div>
  )
}
