import { CustomOpenAIKeyForm } from '@/components/CustomOpenAIKeyForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Purchase } from '@/components/Purchase'

const Usage = () => {
  return (
    <div>
      <Header />
      <main>
        <Purchase />
        <CustomOpenAIKeyForm />
      </main>
      <Footer />
    </div>
  )
}

export default Usage
