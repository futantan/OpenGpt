import { RATE_LIMIT_COUNT } from '@/utils/constants'
import { useEffect, useMemo, useState } from 'react'

import { LicenseForm } from '@/components/LicenseForm'
import { PurchaseAction } from '@/components/PurchaseAction'
import { clientValidateLicenseKey } from '@/utils/lemon'
import { loadLicenseKey, saveLicenseKey } from '@/utils/localData'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'next-i18next'

export const Purchase = () => {
  const [shouldShowLicense, setShouldShowLicense] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  const includedFeatures = useMemo(() => {
    return [t('feature_1'), t('feature_2'), t('feature_3')]
  }, [t])

  useEffect(() => {
    const newLicenseKey = router.query.license_key as string
    console.log({ newLicenseKey })

    if (newLicenseKey) {
      clientValidateLicenseKey(newLicenseKey)
        .then(({ isValid }) => {
          if (isValid) {
            saveLicenseKey(newLicenseKey)
            toast(t('thanks_to_buy'), { icon: '✅' })
          }
        })
        .then(() => {
          setShouldShowLicense(true)
        })
    } else {
      if (loadLicenseKey()) {
        setShouldShowLicense(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.license_key])

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('price')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('please_buy', {
              rateLimitCount: RATE_LIMIT_COUNT,
            })}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {t('pay_to_use')}
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {t('pay_to_use_p1')}
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                {t('pay_to_use_p2')}
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto w-full px-8">
                {shouldShowLicense ? (
                  <LicenseForm
                    onBackToPurchase={() => setShouldShowLicense(false)}
                  />
                ) : (
                  <PurchaseAction
                    onAlreadyPurchasedClick={() => setShouldShowLicense(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
