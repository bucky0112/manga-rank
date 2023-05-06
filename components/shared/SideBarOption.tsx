import { MouseEvent } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
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
    <div className='flex items-center gap-x-2' onClick={() => onToggle('type')}>
      <p>{title}</p>
      <MdArrowDropDown />
    </div>
    <ul className={`${styles.categoriesList} ${toggleType && styles.open}`}>
      {options.map((category) => (
        <li key={category.id} data-id={category.id} onClick={onClick}>
          {category.name}
        </li>
      ))}
    </ul>
  </>
)

export { SideBarOption }
