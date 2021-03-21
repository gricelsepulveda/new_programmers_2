import React from "react"

type TableHeadProps = {
  headers: string[]
}

const TableHead:React.FunctionComponent<TableHeadProps> = (props) => {

  return (
    <tr>
      {
        props.headers.map((header, numHeader) =>
          <th key={`${header}-${numHeader}`}>
            {header}
          </th>
        )
      }
    </tr>
  )
}

export default TableHead