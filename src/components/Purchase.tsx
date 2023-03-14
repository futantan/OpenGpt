import { RATE_LIMIT_COUNT } from '@/utils/constants'
import { useEffect, useState } from 'react'

import { LicenseForm } from '@/components/LicenseForm'
import { PurchaseAction } from '@/components/PurchaseAction'
import { clientValidateLicenseKey } from '@/utils/lemon'
import { loadLicenseKey, saveLicenseKey } from '@/utils/localData'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const includedFeatures = [
  '更多的使用次数',
  '内容长度加倍',
  '有机会领取《ChatGPT 提示的艺术:制作清晰有效提示的指南》电子书',
]
export const Purchase = () => {
  const [shouldShowLicense, setShouldShowLicense] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const newLicenseKey = router.query.license_key as string
    console.log({ newLicenseKey })

    if (newLicenseKey) {
      clientValidateLicenseKey(newLicenseKey)
        .then(({ isValid }) => {
          if (isValid) {
            saveLicenseKey(newLicenseKey)
            toast('感谢购买, license key 已保存', { icon: '✅' })
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
  }, [router.query.license_key])

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            价格
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            每个用户每天免费使用 {RATE_LIMIT_COUNT} 次，超出额度请购买使用次数。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              付费使用
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              OpenGPT 项目需要负担高昂的服务器成本和 OpenAI API 成本，如果
              OpenGPT 有帮助到您，请考虑付费使用。
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                付费功能包括
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
