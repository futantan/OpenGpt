import { Dispatch, SetStateAction, ReactNode, useRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import useWindowSize from '@/hooks/use-window-size'
import Leaflet from './leaflet'

export default function Popover({
  children,
  content,
  align = 'center',
  openPopover,
  setOpenPopover,
}: {
  children: ReactNode
  content: ReactNode | string
  align?: 'center' | 'start' | 'end'
  openPopover: boolean
  setOpenPopover: Dispatch<SetStateAction<boolean>>
}) {
  const { isMobile, isDesktop } = useWindowSize()
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="animate-slide-up-fade z-20 items-center rounded-md border border-gray-200 bg-white drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  )
}
