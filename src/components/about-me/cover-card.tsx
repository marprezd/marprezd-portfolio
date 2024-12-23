import CldImage from '@/components/cld-image'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { IconDownload } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

function CoverCard() {
  const t = useTranslations('site')
  const yearsExperience = Math.floor((new Date().getTime() - new Date('2019-08-13').getTime()) / 3.15576e10)

  return (
    <div>
      <div className="py-0 lg:py-5">
        <Card isFooterBlurred>
          <CardHeader className="absolute top-1 z-10 flex-col items-start">
            <p className="text-sm font-semibold uppercase text-gray-700">Middle Software Developer</p>
            <h4 className="text-2xl font-medium text-gray-900">Mario Pérez</h4>
          </CardHeader>
          <CldImage
            className="z-0 m-0 size-full object-cover p-0"
            alt="MP"
            width={448}
            height={384}
            sizes="100vw"
            src="profile_uezzbj.jpg"
            crop={{
              type: 'fill',
            }}
            quality={75}
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
          <CardFooter className="absolute bottom-0 z-10 gap-x-4 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
            <Chip color="secondary" variant="solid" radius="full" size="sm" startContent={<IconDownload size={16} />}>
              Download CV
            </Chip>
            <Chip color="primary" variant="solid" radius="full" size="sm">
              {yearsExperience}
              {' '}
              {t('about-me.experience')}
            </Chip>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CoverCard
