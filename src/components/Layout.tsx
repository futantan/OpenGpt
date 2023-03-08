import FollowSocialMedia from '@/components/FollowSocialMedia'
import Slogan from '@/components/Slogan'

const Layout = (props: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Slogan />
        <FollowSocialMedia />

        {props.children}
      </div>
    </div>
  )
}

export default Layout
