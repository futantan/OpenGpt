import { tw } from '@/utils/tw'
import { Popover, Transition } from '@headlessui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useMemo } from 'react'
import { useCookies } from 'react-cookie'

/**
 * Returns the locale's name.
 */
const getLocaleDisplayName = (locale: string, displayLocale?: string) => {
  const displayName = new Intl.DisplayNames([displayLocale || locale], {
    type: 'language',
  }).of(locale)!
  // Return the Titlecased version of the language name.
  return displayName.charAt(0).toLocaleUpperCase() + displayName.slice(1)
}

const LanguageSelector = () => {
  const router = useRouter()
  // @ts-ignore
  const { i18n } = useTranslation('common')
  // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE'])

  // Memo the set of locales and their display names.
  const localesAndNames = useMemo(() => {
    return router.locales!.map((locale) => ({
      locale,
      name: getLocaleDisplayName(locale),
    }))
  }, [router.locales])

  const languageChanged = useCallback(
    async (locale: any) => {
      setCookie('NEXT_LOCALE', locale, { path: '/' })

      const path = router.asPath
      router.push(path, path, { locale })
    },
    [router, setCookie]
  )
  const { language: currentLanguage } = i18n

  return (
    <div className="flex items-end">
      <Popover className="relative">
        <Popover.Button>
          <div className="flex items-center fill-black text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              focusable="false"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                className="css-c4d79v"
              />
            </svg>{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z" />
            </svg>
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {localesAndNames.map(({ locale, name }) => {
              const isSelected = currentLanguage === locale
              return (
                <div
                  key={locale}
                  onClick={() => languageChanged(locale)}
                  className={tw(
                    `relative w-auto cursor-default select-none py-2 px-2 pr-4 text-black hover:bg-blue-200`,
                    isSelected ? '' : ''
                  )}
                >
                  <span
                    className={tw(
                      `block truncate`,
                      isSelected && 'font-bold text-blue-600'
                    )}
                  >
                    {name}
                  </span>
                </div>
              )
            })}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export { LanguageSelector }
