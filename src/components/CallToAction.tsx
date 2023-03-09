import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
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
            开始使用
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            立即使用海量的 ChatGPT 应用，或在几秒钟内创建属于自己的应用。
          </p>
          <Button href="/app/new" color="white" className="mt-10">
            创建应用
          </Button>
        </div>
      </Container>
    </section>
  )
}
