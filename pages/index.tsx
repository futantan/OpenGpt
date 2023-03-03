import FollowSocialMedia from '@/components/FollowSocialMedia';
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import type { NextPage } from 'next';
import Link from 'next/link';

const actions = [
  {
    title: '个人助手应用',
    href: '/coming-soon',
    icon: ClockIcon,
    emoji: '📅',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    description:
      '利用 ChatGPT 提供的 AI 功能，你的个人助手应用将帮助你更高效地管理日常任务和计划。从创建日程表到设置提醒，一切都可以轻松搞定！',
  },
  {
    title: '智能写作工具',
    href: '/coming-soon',
    icon: CheckBadgeIcon,
    emoji: '️📝',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    description:
      '利用 ChatGPT 的强大智能能力，你的写作变得更加轻松和高效。我们的智能写作工具将帮助你生成高质量的文章和文本，省去了繁琐的编辑和润色过程！',
  },
  {
    title: '智能翻译器',
    href: '/coming-soon',
    icon: UsersIcon,
    emoji: '🌎️',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
    description:
      '无论是日常沟通还是商务交流，语言不再是问题！我们的智能翻译器将帮助你快速准确地翻译各种语言。',
  },
  {
    title: '智能编程助手',
    href: '/coming-soon',
    icon: BanknotesIcon,
    emoji: '💻',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    description:
      '想要更高效地编写代码吗？我们的智能编程助手将帮助你完成复杂的编程任务，提高你的编程效率和质量。从语法提示到代码优化，一切都在掌握之中！',
  },
  {
    title: '智能金融分析',
    href: '/coming-soon',
    icon: ReceiptRefundIcon,
    emoji: '💰',
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    description:
      '想要更好地掌握投资和财务管理技能吗？利用我们的智能金融分析应用，你可以轻松获得各种股票、基金和市场指数的分析和预测信息。让 ChatGPT 的 AI 功能成为你的金融智囊，帮助你更好地做出决策！',
  },
  {
    title: '智能旅游规划',
    href: '/coming-soon',
    icon: AcademicCapIcon,
    emoji: '🌴',
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    description:
      '想要规划一次完美的旅行吗？我们的智能旅游规划应用将帮助你快速制定行程和预算，并为你推荐最佳的景点和活动。让 ChatGPT 的 AI 功能成为你的旅行顾问，让旅行更加愉快！',
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const Home: NextPage = () => {
  return (
    <div className="bg-gray-200 py-8 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="max-w-5xl text-center text-4xl font-bold sm:text-7xl my-10 sm:my-28">
          Create{' '}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <svg
              aria-hidden="true"
              viewBox="0 0 401 42"
              className="absolute top-2/3 left-0 h-[0.48em] w-full fill-green-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative text-green-500">ChatGpt Application</span>
          </span>{' '}
          {/* */} in seconds
        </h1>

        <FollowSocialMedia />

        <div className="flex justify-end mb-2">
          <Link
            href="/coming-soon"
            className="rounded-full bg-green-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            创建应用
          </Link>
        </div>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 mb-44">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={classNames(
                actionIdx === 0
                  ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                  : '',
                actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                actionIdx === actions.length - 1
                  ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                  : '',
                'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500'
              )}
            >
              <div>
                <span
                  className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    'inline-flex rounded-lg p-3 ring-4 ring-white'
                  )}
                >
                  <div
                    className="h-6 w-6 flex items-center justify-center"
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
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
