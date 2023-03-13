import styles from '@/styles/horizontal-bounce.module.css'
import { tw } from '@/utils/tw'

export const HandPointer = ({ className }: { className: string }) => {
  return <span className={tw('text-4xl', styles.bounce, className)}>👉🏻</span>
}
