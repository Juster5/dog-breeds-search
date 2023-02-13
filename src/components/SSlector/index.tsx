import React, { useCallback, useEffect, useMemo, useState } from "react"
import "./index.scss"

export type MenuItemType = {
  key?: string
  title: string
  value?: string | number
}

export type SelectorProps = {
  showSearch?: boolean
  showInput?: boolean
  menus: MenuItemType[]
  onSelect: Function
}

const SSelector: React.FC<SelectorProps> = (props) => {
  const { menus, showSearch = true, onSelect } = props

  const [showMenu, setShowMenu] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectValue, setSelectValue] = useState(menus[0])

  const cacheMenus = useMemo(() => {
    if (searchValue && searchValue.length > 0) {
      const reg = new RegExp(searchValue, "i")
      return menus.filter((el) => reg.test(el.title as string))
    }
    return menus
  }, [menus, searchValue])

  const triggerSelect = useCallback((el: any) => {
    setShowMenu(false)
    setSearchValue("")
    setSelectValue(el)
    typeof onSelect === "function" && onSelect(el)
  }, [])

  const searchMenu = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }, [])

  useEffect(() => {
    const clear = () => {
      setSearchValue("")
      setShowMenu(false)
    }
    document.addEventListener("click", clear)

    return () => {
      document.removeEventListener("click", clear)
    }
  }, [])

  return (
    <div
      data-testid="s-selector"
      className={`s-selector-wrapper ${showMenu && " active"}`}
      onClick={(e) => {
        e.stopPropagation()
      }}
      title={selectValue.title}
    >
      <div
        className='default-value menu-item'
        onClick={() => {
          setShowMenu(!showMenu)
        }}
      >
        <div className='title'>{selectValue.title}</div>
        <img className='s-arrow-down' src='/images/arrow-down.svg' alt='arrow-down' />
      </div>
      <div className='menus'>
        {showSearch && (
          <div className='search-input'>
            <div className='search-icon'>
              <img src='/images/search.png' width={16} height={16} alt='select-icon' />
            </div>
            <input value={searchValue} onChange={searchMenu} className='search-input-content' type='text' placeholder='search' />
          </div>
        )}
        <div className='scroll-wrapper'>
          {cacheMenus.map((el, index) => {
            return (
              <li
                className='menu-item select-item'
                key={el.key || el.title || index}
                onClick={() => {
                  triggerSelect(el)
                }}
              >
                <div className='title'>{el.title}</div>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SSelector)
