import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { HandPointer } from '@/components/HandPointer'
import { SITE_DESC } from '@/utils/seoConfig'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

import Balancer from 'react-wrap-balancer'
import { motion } from 'framer-motion'
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from '@/utils/constants'
import { Github, Twitter } from '@/components/share/icons'
export function Hero() {
  const { t } = useTranslation('common')

  return (
    <Container className="flex w-full flex-col items-center justify-center py-32">
      {/*<h1 className="font-display mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">*/}
      {/*<main className="flex w-full flex-col items-center justify-center py-32">*/}
      {/*  {children}*/}
      {/*</main>*/}
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>创建你的prompt小应用</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            立即使用海量的 prompt 应用，或在几秒钟内创建属于自己的应用。
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href="/app/new"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>创建应用</p>
          </a>
        </motion.div>
      </motion.div>
      {/*  Create{' '}*/}
      {/*  <span className="relative whitespace-nowrap text-blue-600">*/}
      {/*    <svg*/}
      {/*      aria-hidden="true"*/}
      {/*      viewBox="0 0 418 42"*/}
      {/*      className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"*/}
      {/*      preserveAspectRatio="none"*/}
      {/*    >*/}
      {/*      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />*/}
      {/*    </svg>*/}
      {/*    <span className="relative text-4xl sm:text-7xl">*/}
      {/*      ChatGPT Application*/}
      {/*    </span>*/}
      {/*  </span>{' '}*/}
      {/*  in seconds*/}
      {/*</h1>*/}
      {/*<p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">*/}
      {/*  {t('site_desc')}*/}
      {/*</p>*/}

      {/*<div className="mt-10 flex justify-center gap-x-6 ">*/}
      {/*  <Button*/}
      {/*    variant="solid"*/}
      {/*    color="blue"*/}
      {/*    href="/app/new"*/}
      {/*    className="relative"*/}
      {/*  >*/}
      {/*    <HandPointer className="absolute -left-12" />*/}
      {/*    <div className="flex items-center gap-2">*/}
      {/*      <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>*/}
      {/*      <span className="mr-0.5 whitespace-nowrap">{t('create_app')}</span>*/}
      {/*    </div>*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </Container>
  )
}
