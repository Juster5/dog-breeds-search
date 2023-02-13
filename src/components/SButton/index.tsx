import React from "react"
import "./index.scss"

export type ButtonProps = {
  children?: any
  onClick: Function
}
const SButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className='action-button'
      onClick={() => {
        onClick()
      }}
    >
      {children}
    </button>
  )
}

export default React.memo(SButton)
