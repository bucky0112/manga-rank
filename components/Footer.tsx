import { FunctionComponent } from "react"
import styles from "../styles/Footer.module.scss"

const Footer: FunctionComponent = () => (
  <footer className='w-full font-inter absolute bottom-0'>
    <p className='ml-12 mb-6 text-darkGrey font-semibold'>
      Copyright © 2022 Yang Zong Lin, Chang Chi Chu, Hsiao-ping Hsu
    </p>
    <div className={styles.footer}>
      {/* 12px間距 / fiixed footer在最底部 */}
      <p>KOMIC</p>
    </div>
  </footer>
)

export { Footer }
