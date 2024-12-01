import { Popover } from '@headlessui/react' // Importing Popover component from Headless UI
import EmojiPicker from 'emoji-picker-react' // Importing EmojiPicker component from emoji-picker-react

// EmojiField component receives two props: value and onChange
// value: string - the current emoji value
// onChange: (v: string) => void - a callback function to update the emoji value
export const EmojiField = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => (
  <>
    {/* Render a Popover component from Headless UI */}
    <Popover className="relative">
      {/* Render Popover.Button as the trigger for the Popover component */}
      <Popover.Button>
        <span className="inline-flex rounded-lg bg-indigo-50 p-3 ring-4 ring-white">
          {/* Display the current emoji value inside a div */}
          <div
            className="flex h-6 w-6 items-center justify-center"
            aria-hidden="true"
          >
            {value}
          </div>
        </span>
      </Popover.Button>

      {/* Render Popover.Panel to contain the EmojiPicker component */}
      <Popover.Panel className="absolute z-10">
        {/* Render EmojiPicker component and attach an onEmojiClick event handler */}
        <EmojiPicker onEmojiClick={({ emoji }) => onChange(emoji)} />
      </Popover.Panel>
    </Popover>
  </>
)

