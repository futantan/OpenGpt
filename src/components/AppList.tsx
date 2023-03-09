import clsx from 'clsx'

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

  const currentApps = list.map((v) => ({
    title: v.name,
    description: v.description,
    href: '/app/' + v.id,
    emoji: v.icon,
    iconBackground: 'bg-indigo-50',
  }))

  return (
    <div className="mb-44 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {currentApps.map((action, actionIdx) => (
        <div
          key={actionIdx}
          className={clsx(
            actionIdx === 0
              ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
              : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === currentApps.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === currentApps.length - 1
              ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
              : '',
            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500'
          )}
        >
          <div>
            <span
              className={clsx(
                action.iconBackground,
                'inline-flex rounded-lg p-3 ring-4 ring-white'
              )}
            >
              <div
                className="flex h-6 w-6 items-center justify-center"
                aria-hidden="true"
              >
                {action.emoji}
              </div>
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-500">{action.description}</p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}

export default AppList
