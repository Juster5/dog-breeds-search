import React from "react"
import "./index.scss"

export type ColumnType = {
  dataIndex?: string
  title?: string
  key?: string
  render?: Function
}

export type TablePropsType = {
  column: ColumnType[]
  data: any[]
}

const OKTable: React.FC<TablePropsType> = (props) => {
  const { data, column } = props

  return (
    <div className='s-table'>
      <table className='s-table-container'>
        <thead className='s-table-thead'>
          <tr className='s-table-tr'>
            {column?.map((el, index) => {
              return (
                <th className='s-table-th' key={el.key || index}>
                  {el.title}
                  <div className='s-table-bottom-border' />
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className='s-table-tbody'>
          {data?.map((el, index) => {
            return (
              <tr className='s-table-tr' key={el.key || index} data-row-key={index}>
                {column.map((item, itemIndex) => {
                  return (
                    <td className='s-table-td' key={item.key || itemIndex}>
                      {typeof item.render === "function" ? item.render(el) : item.dataIndex && el[item.dataIndex]}
                      <div className='s-table-bottom-border' />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(OKTable)
