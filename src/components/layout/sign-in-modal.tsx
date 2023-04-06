import Modal from '@/components/share/modal'
import { signIn } from 'next-auth/react'
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { LoadingDots, Github } from '@/components/share/icons'
import Image from 'next/image'

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [signInClicked, setSignInClicked] = useState(false)

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://chat.chatdogge.xyz/">
            <Image
              src="/favicon.svg"
              alt="Logo"
              className="h-20 w-20"
              width={20}
              height={20}
            />
          </a>
          {/*<h3 className="font-display text-2xl font-bold">Sign In</h3>*/}
          {/*<p className="text-sm text-gray-500">*/}
          {/*  This is strictly for demo purposes - only your email and profile*/}
          {/*  picture will be stored.*/}
          {/*</p>*/}
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                : 'border border-gray-200 bg-white text-black hover:bg-gray-50'
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true)
              signIn('github')
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Github className="h-5 w-5" />
                <p>Sign In with Github</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false)

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    )
  }, [showSignInModal, setShowSignInModal])

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  )
}
