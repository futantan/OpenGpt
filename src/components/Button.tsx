import LoadingDots from '@/components/LoadingDots'
import { tw } from '@/utils/tw'
import { MouseEventHandler, ReactNode } from 'react'

export interface ButtonProps {
  children?: ReactNode | undefined
  className?: string
  category?: 'primary' | 'secondary' | 'tertiary'
  onClick?: MouseEventHandler<any>
  type?: 'submit' | 'reset' | 'button'
  loading?: boolean
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  const propsWithDefaultValue = {
    ...props,
    category: props.category || 'primary',
    type: props.type || 'button',
    disabled: props.disabled || props.loading,
    children: props.loading ? (
      <LoadingDots color="white" style="large" />
    ) : (
      props.children
    ),
  }

  return (
    <button
      className={tw(
        'inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        propsWithDefaultValue.category === 'primary' &&
          'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-500',
        propsWithDefaultValue.category === 'secondary' &&
          'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
        propsWithDefaultValue.category === 'tertiary' &&
          'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
      )}
      {...propsWithDefaultValue}
    />
  )
}

export default Button
