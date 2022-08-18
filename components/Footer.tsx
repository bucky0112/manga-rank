import { FunctionComponent } from "react"
import styles from "../styles/Footer.module.scss"

const Footer: FunctionComponent = () => (
  <footer className='w-full'>
    <p className='ml-12 mb-6 text-darkGrey font-semibold'>
      Copyright © 2022 Yang Zong Lin, Chang Chi Chu, Hsiao-ping Hsu
    </p>
    <div className={styles.footer}>
      <p>KOMIC</p>
    </div>
  </footer>
)

export { Footer }
