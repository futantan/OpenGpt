import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useMemo } from 'react'

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
  const { i18n } = useTranslation('common')

  // Memo the set of locales and their display names.
  const localesAndNames = useMemo(() => {
    return router.locales!.map((locale) => ({
      locale,
      name: getLocaleDisplayName(locale),
    }))
  }, [router.locales])

  const languageChanged = useCallback(
    async (locale: any) => {
      const path = router.asPath
      router.push(path, path, { locale })
    },
    [router]
  )
  const { language: currentLanguage } = i18n

  return (
    <div className="w-48">
      <Listbox value={currentLanguage} onChange={languageChanged}>
        <div className="relative">
          <Listbox.Button className="cursor relative w-full cursor-default rounded-lg bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <div>{getLocaleDisplayName(currentLanguage)}</div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {localesAndNames.map(({ locale, name }) => (
                <Listbox.Option
                  key={locale}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4
                    ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`
                  }
                  value={locale}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate
                        ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export { LanguageSelector }
