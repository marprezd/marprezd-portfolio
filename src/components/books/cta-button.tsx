import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface CtaButtonProps {
  title: string
  description: string
  linkHrfef: string
  linkLabel: string
}

export default function CtaButton({
  title,
  description,
  linkHrfef,
  linkLabel,
}: CtaButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const t = useTranslations('site')

  return (
    <>
      <Button color="primary" variant="light" endContent={<IconArrowNarrowRight />} onPress={onOpen}>{t('posts.more-details')}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>
                  {description}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  as={Link}
                  isExternal
                  showAnchorIcon
                  onPress={onClose}
                  variant="flat"
                  href={linkHrfef}
                  color="primary"
                >
                  Buy from
                  {' '}
                  {linkLabel}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
