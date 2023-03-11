import type { ChangeEventHandler } from 'react'
import { useRef } from 'react'

interface SearchInputProps {
  placeholder: string
  setSearchValue: (v: string) => void
}
export const SearchInput = (props: SearchInputProps) => {
  const isComposing = useRef(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value
    // 如果当前不处于中文输入法状态，则更新搜索词
    if (!isComposing.current) {
      props.setSearchValue(inputValue)
    }
  }

  const handleCompositionStart = () => {
    isComposing.current = true
  }

  const handleCompositionEnd = (event: any) => {
    const inputValue = event.target.value

    // 在中文输入法结束后，更新搜索词
    props.setSearchValue(inputValue)
    isComposing.current = false
  }

  return (
    <div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          onCompositionStart={handleCompositionStart}
          onChange={handleChange}
          onCompositionEnd={handleCompositionEnd}
          className="block w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}
