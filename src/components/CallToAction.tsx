import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { useTranslation } from 'next-i18next'

export function CallToAction() {
  const { t } = useTranslation('common')

  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-sm text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            {t('get_started')}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            {t('site_desc')}
          </p>
          <Button href="/app/new" color="white" className="mt-10">
            {t('create_app')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
