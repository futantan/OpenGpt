import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { PURCHASE_URL } from '@/utils/constants'
import { clientValidateLicenseKey } from '@/utils/lemon'
import { loadLicenseKey, saveLicenseKey } from '@/utils/localData'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'

interface LicenseFormProps {
  onBackToPurchase: () => void
}
export const LicenseForm = (props: LicenseFormProps) => {
  const licenseKeyInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (licenseKeyInputRef.current) {
      licenseKeyInputRef.current.value = loadLicenseKey()
    }
  }, [])

  const handleClear = () => {
    toast('数据已清空', { icon: '🗑️' })
    saveLicenseKey('')
    props.onBackToPurchase()
  }

  const handleSave = async () => {
    const value = licenseKeyInputRef.current?.value || ''
    if (value === '') {
      return
    }

    toast('保存中...')
    const { isValid } = await clientValidateLicenseKey(value)
    if (isValid) {
      saveLicenseKey(value)
      toast('已保存', { icon: '✅' })
    } else {
      toast('License Key 格式不正确或次数已用尽', { icon: '❌' })
    }
  }

  return (
    <>
      <div className="text-left">
        <div className=" sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            License key
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <Input
              type="text"
              className="w-full"
              placeholder="粘贴你购买的 license key"
              ref={licenseKeyInputRef}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-end gap-3 px-4 sm:px-0">
        <Button variant="solid" color="white" onClick={handleClear}>
          清除
        </Button>
        <Button variant="solid" color="blue" onClick={handleSave}>
          保存
        </Button>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-gray-50 px-2 text-gray-500">Or</span>
        </div>
      </div>

      <div>
        <a
          href={PURCHASE_URL}
          className="inline-flex w-full justify-center rounded-full bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
        >
          <span className="">再次购买</span>
        </a>
      </div>
    </>
  )
}
