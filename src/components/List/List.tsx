import React from 'react'

type ListProps = {
  data: string[]
}

const List:React.FunctionComponent<ListProps> = (props) => {

  return (
    <ul>
      {
        props.data.map((dato, n_item) => 
          <li key={n_item}>
            {dato}
          </li> 
        )
      }
    </ul>
  )
}
export default List