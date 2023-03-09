import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

const Layout = (props: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="w-full bg-slate-50 pb-20">
          <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
            {props.children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
