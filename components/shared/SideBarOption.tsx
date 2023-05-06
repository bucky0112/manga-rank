import { MouseEvent } from 'react'
import { MdArrowDropDown, MdArrowLeft } from 'react-icons/md'
import styles from 'styles/SideBar.module.scss'

type SideBarOptionProps = {
  options: {
    id: number
    name: string
  }[]
  toggleType: boolean
  onToggle: (type: string) => void
  onClick: (e: MouseEvent<HTMLLIElement>) => void
  title: string
}

const SideBarOption: React.FC<SideBarOptionProps> = ({
  options,
  toggleType,
  onToggle,
  onClick,
  title
}) => (
  <>
    <div className='flex items-center gap-x-8' onClick={() => onToggle('type')}>
      <p className='font-medium'>{title}</p>
      {toggleType ? <MdArrowDropDown size="26" /> : <MdArrowLeft size="26" />}
    </div>
    <ul className={`${styles.categoriesList} ${toggleType && styles.open}`}>
      {options.map((category) => (
        <li key={category.id} data-id={category.id} onClick={onClick} className='mr-2'>
          {category.name}
        </li>
      ))}
    </ul>
  </>
)

export { SideBarOption }
