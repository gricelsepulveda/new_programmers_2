import React from "react"
import {columnType} from "./Table"

type TableRowProps = {
  colData: columnType[]
}

const TableRow:React.FunctionComponent<TableRowProps> = (props) => {
  return (
    <tr>
      {
        props.colData.map((col, nCol) => 
          <td key={`${col}-${nCol}`}>
            {
              col.type == "string" || col.type == "number"
                ?
                col.value
                :
                col.value.length
            }
          </td>
        )
      }
    </tr>
  )
}

export default TableRow