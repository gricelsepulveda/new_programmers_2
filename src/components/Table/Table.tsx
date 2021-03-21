import React from "react"
import TableHead from "./TableHead"
import TableRow from "./TableRow"

export type columnType = {
  value: any,
  type: string
}

type TableProps = {
  tableData: any,
  tableDataHeads: string[] | undefined
}

const Table:React.FunctionComponent<TableProps> = (props) => {

  return (
    <table>
      <thead>
        {
        props.tableDataHeads != undefined ? 
          <TableHead 
            headers={props.tableDataHeads}
          />
          :
          null
        }
      </thead>
      <tbody>
        {
          props.tableData != undefined ? props.tableData.map((tData:any, nData:number) => 
            <TableRow
              colData={tData}
              key={`tableRow-${nData}`}
            />
          ):null
        }
      </tbody>
    </table>
  )
}

export default Table