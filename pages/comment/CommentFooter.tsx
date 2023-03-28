import { FunctionComponent } from "react"
import styles from "./comment.module.scss"

const CommentFooter: FunctionComponent = () => (
  <footer className='w-full font-inter'>
    <div className={styles.footer}>
      {/* 12px間距 / fiixed footer在最底部 */}
      <p>KOMIC</p>
    </div>
  </footer>
)

export { CommentFooter }
