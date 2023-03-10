import { HandThumbUpIcon, PlayIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface AppListProps {
  list: Array<{
    id: string
    name: string
    description: string
    icon: string
  }>
}
const AppList = (props: AppListProps) => {
  const { list } = props

  const currentApps = list.map(v => ({
    id: v.id,
    title: v.name,
    description: v.description,
    href: `/app/${v.id}`,
    emoji: v.icon,
    iconBackground: 'bg-indigo-50',
  }))

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {currentApps.map(app => (
        <li
          key={app.id}
          className="col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <Link href={app.href}>
            <div className="flex flex-1 flex-col p-8">
              <div className="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-3xl">
                {app.emoji}
              </div>
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {app.title}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{app.description}</dd>
              </dl>
            </div>
          </Link>

          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  onClick={() => toast('疯狂开发中', { icon: '🙇' })}
                >
                  <HandThumbUpIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  推荐
                </button>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  href={app.href}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <PlayIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  运行
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AppList
