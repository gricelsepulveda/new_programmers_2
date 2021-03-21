import React, {useState, useEffect} from 'react'
//MY COMPONENTS
import Table from "../components/Table/Table"
//TYPES
import {StarwarsCharType} from "../types/types"

const StarwarsView:React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<any>(undefined)

  const getStarwarsData = async () => {
    const data = await fetch(`https://swapi.dev/api/people/`)
    .then((response:any) => {
      return response.json()
    })
    setCharacters(data.results)
  }


  useEffect(() => {
    getStarwarsData()
  }, [])

  const prepareData = () => {
    let formattedChars:any = [] //DATA QUE ESPERA EL BODY
    let formattedCharsHeads:any = [] //DATA QUE ESPERA LA COLUMNA
    if (characters != undefined){
      for (let n = 0; n < characters.length; n++) {
        const data:any[] = []
        Object.entries(characters[n]).map((charVal) => {
          formattedCharsHeads.push(charVal[0])
          data.push({
            value: charVal[1],
            type: typeof charVal[1]
          })
        })
        formattedChars.push(data)
      }
    }
    return [formattedChars, formattedCharsHeads]
  }

  return (
    <div>
      <Table
        tableData={prepareData()[0]}
        tableDataHeads={prepareData()[1]}
      />
    </div>
  )
}
export default StarwarsView