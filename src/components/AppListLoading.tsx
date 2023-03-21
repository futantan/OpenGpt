import { HandThumbUpIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

const AppListLoading = () => {
  // @ts-ignore
  const { t } = useTranslation('common')

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {[1, 2, 3, 4, 5, 6].map((app, idx) => (
        <li
          key={idx}
          className="col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div>
            <div className="flex flex-1 flex-col items-center p-8">
              <div className="mx-auto flex h-24 w-24 flex-shrink-0 animate-pulse items-center justify-center rounded-full bg-gray-100 text-3xl"></div>
              <h3 className="mt-6 animate-pulse bg-gray-100 text-sm font-medium text-gray-900">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="w-full animate-pulse bg-gray-100 text-center text-sm text-gray-500">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </dd>
              </dl>
            </div>
          </div>

          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <HandThumbUpIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {t('recommend')}
                </div>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <PlayIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {t('run')}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AppListLoading
