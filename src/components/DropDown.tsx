import { Menu, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { Fragment } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export type VibeType = 'Professional' | 'Casual' | 'Funny'

interface DropDownProps {
  vibe: VibeType
  setVibe: (vibe: VibeType) => void
}

const vibes: VibeType[] = ['Professional', 'Casual', 'Funny']

export default function DropDown({ vibe, setVibe }: DropDownProps) {
  return (
    <Menu as="div" className="relative block w-full text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {vibe}
          <ChevronUpIcon
            className="ui-open:hidden -mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="ui-open:block -mr-1 ml-2 hidden h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={vibe}
        >
          <div className="">
            {vibes.map((vibeItem) => (
              <Menu.Item key={vibeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setVibe(vibeItem)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      vibe === vibeItem ? 'bg-gray-200' : '',
                      'flex w-full items-center justify-between space-x-2 px-4 py-2 text-left text-sm'
                    )}
                  >
                    <span>{vibeItem}</span>
                    {vibe === vibeItem ? (
                      <CheckIcon className="text-bold h-4 w-4" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
