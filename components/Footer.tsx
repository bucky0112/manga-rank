import { FunctionComponent } from "react"
import styles from "../styles/Footer.module.scss"

const Footer: FunctionComponent = () => (
  <footer className='fixed bottom-0 w-full font-inter'>
    <div className={styles.footer}>
      <p>KOMIC</p>
    </div>
  </footer>
)

export { Footer }
