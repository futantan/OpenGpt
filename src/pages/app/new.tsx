import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/Button'
import { EmojiField } from '@/components/EmojiField'
import Layout from '@/components/Layout'
import { useGenerateResult } from '@/hooks/useGenerateResult'
import { createAppSchema } from '@/server/api/schema'
import { api, type RouterInputs } from '@/utils/api'
import { isDev } from '@/utils/isDev'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Inputs = RouterInputs['app']['create']

const NewApp = () => {
  const [isTesting, setIsTesting] = useState(false)
  const [hasTested, setHasTested] = useState(false)
  const { generate, generatedResults } = useGenerateResult()
  const router = useRouter()
  const { t } = useTranslation('common')

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(createAppSchema) })

  const handleTest = async (e: any) => {
    if (isTesting) {
      return
    }

    const allValid = await trigger()
    if (allValid) {
      const formValues = getValues()

      setIsTesting(true)

      await generate({
        prompt: formValues.prompt,
        userInput: formValues.demoInput,
      })

      setIsTesting(false)
      setHasTested(true)
    }
  }

  const mutation = api.app.create.useMutation({
    onSuccess: (data, variables, context) => {
      router.push(`/app/${data.id}`)
    },
    onError: () => {
      console.log('on error')
    },
  })

  const { isLoading: isCreating } = mutation

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isDev && !hasTested) {
      toast(t('test_before_submit'), { icon: '🙇' })
    } else {
      mutation.mutate(data)
    }
  }

  return (
    <>
      <NextSeo title={t('create_app')} />
      <Layout>
        <div>
          <Breadcrumb
            pages={[{ name: t('create_app'), href: '#', current: true }]}
          />
          <div className="bg-slate-50 pt-10">
            <div className="mx-auto min-h-screen max-w-xl ">
              <h1 className="py-10 text-center text-2xl font-semibold text-gray-900">
                {t('create_app')}
              </h1>
              <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                  <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          {t('icon')}
                        </label>
                        <Controller
                          name="icon"
                          control={control}
                          defaultValue="🤖"
                          render={({ field }) => (
                            <EmojiField
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                        <p className="mt-2 text-sm text-red-500">
                          {errors.icon && errors.icon.message}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {t('pick_emoji_icon')}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          {t('app_name')}
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            className="block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={t('app_name_placeholder')}
                            {...register('name')}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-500">
                          {errors.name && errors.name.message}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          {t('app_desc')}
                        </label>
                        <div className="mt-2">
                          <textarea
                            rows={3}
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            placeholder={t('app_desc_placeholder')}
                            defaultValue={''}
                            {...register('description')}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-500">
                          {errors.description && errors.description.message}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          {t('prompt')}
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <textarea
                            rows={3}
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            placeholder={t('prompt_desc_placeholder')}
                            defaultValue={''}
                            {...register('prompt')}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-500">
                          {errors.prompt && errors.prompt.message}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {t('prompt_desc')}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          {t('prompt_example')}
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            className="block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="I love you three thousand times."
                            {...register('demoInput')}
                          />
                        </div>
                        <p className="mt-2 text-sm text-red-500">
                          {errors.demoInput && errors.demoInput.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 px-4 sm:px-0">
                  <Button
                    variant="solid"
                    color="white"
                    onClick={() => router.push('/')}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    type="button"
                    variant="solid"
                    color="slate"
                    onClick={handleTest}
                    loading={isTesting}
                  >
                    {t('test')}
                  </Button>
                  <Button
                    variant="solid"
                    color="blue"
                    type="submit"
                    loading={isCreating}
                  >
                    {t('create')}
                  </Button>
                </div>
                <div className="my-10 w-full space-y-10">
                  {generatedResults && (
                    <div className="flex flex-col gap-8">
                      <h2 className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl">
                        {t('result')}
                      </h2>
                      <div className="flex w-full flex-col items-center justify-center space-y-8">
                        <div
                          className="w-full cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedResults)
                            toast('Result copied to clipboard', {
                              icon: '✂️',
                            })
                          }}
                        >
                          <p className="whitespace-pre-line text-left">
                            {generatedResults}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default NewApp
