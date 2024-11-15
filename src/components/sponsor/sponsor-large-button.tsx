import buildPatreonAuthURL from '@/lib/patreon'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { IconBrandPatreon } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface PatreonButtonProps {
  clientID: string
  redirectUri: string
  pledgeAmount: number
}

export default function SponsorLargeButton({
  clientID,
  redirectUri,
  pledgeAmount,
}: PatreonButtonProps) {
  const t = useTranslations('site')

  // Generate authorization URL
  const url = buildPatreonAuthURL({
    client_id: clientID,
    redirect_uri: redirectUri,
    min_cents: pledgeAmount * 100, // Convert dollars to cents
  })

  return (
    <Button
      isExternal
      as={Link}
      color="secondary"
      href={url}
      startContent={<IconBrandPatreon />}
      variant="solid"
      radius="full"
      data-patreon-widget-type="become-patron-button"
    >
      {t('posts.donations.cta')}
    </Button>
  )
}
