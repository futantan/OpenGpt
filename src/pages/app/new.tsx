import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/Button'
import { EmojiField } from '@/components/EmojiField'
import Layout from '@/components/Layout'
import { useGenerateResult } from '@/hooks/useGenerateResult'
import { createAppSchema } from '@/server/api/schema'
import { api, type RouterInputs } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

type Inputs = RouterInputs['app']['create']

const NewApp = () => {
  const [isTesting, setIsTesting] = useState(false)
  const [hasTested, setHasTested] = useState(false)
  const { generate, generatedResults } = useGenerateResult()
  const router = useRouter()
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
    if (!hasTested) {
      toast('提交之前请进行测试', { icon: '🙇' })
    } else {
      mutation.mutate(data)
    }
  }

  return (
    <Layout>
      <div>
        <Breadcrumb pages={[{ name: '创建应用', href: '#', current: true }]} />

        <div className="bg-slate-50 pt-10">
          <div className="mx-auto min-h-screen max-w-xl ">
            <h1 className="py-10 text-center text-2xl font-semibold text-gray-900">
              创建应用
            </h1>
            <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Icon
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
                        挑选一个 emoji 作为应用的图标吧！
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        应用名称
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          className="block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="智能翻译助手"
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
                        应用描述
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows={3}
                          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                          placeholder="这款 App 可以将任意语言的内容，翻译成中文"
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
                        指令
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <textarea
                          rows={3}
                          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                          placeholder="你是一个翻译官，无论接下来输入什么，你都要翻译成中文。内容是："
                          defaultValue={''}
                          {...register('prompt')}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-500">
                        {errors.prompt && errors.prompt.message}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        指令需清晰易懂，明确且有逻辑。让 ChatGpt
                        化身你的小帮手吧。
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        示例输入
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
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="slate"
                  onClick={handleTest}
                  loading={isTesting}
                >
                  测试
                </Button>
                <Button
                  variant="solid"
                  color="blue"
                  type="submit"
                  loading={isCreating}
                >
                  创建
                </Button>
              </div>
              <div className="my-10 w-full space-y-10">
                {generatedResults && (
                  <div className="flex flex-col gap-8">
                    <h2 className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl">
                      结果
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
  )
}

export default NewApp
