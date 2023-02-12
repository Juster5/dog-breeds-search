import React from "react"
import SLoading from "../SLoading"
import "./index.scss"

export type ButtonProps = {
  children?: any
  loading?: boolean
  onClick: Function
}
const SButton = ({ children, loading, onClick }: ButtonProps) => {
  return (
    <span
      className='action-button'
      onClick={() => {
        onClick()
      }}
    >
      {children}
    </span>
  )
}

export default React.memo(SButton)
