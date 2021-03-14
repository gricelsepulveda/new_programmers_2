import React, {useState, useEffect} from 'react'
//MY COMPONENTS
import Button from "../components/Button/Button"
import List from "../components/List/List"
//TYPES
import {StarwarsCharType} from "../types/types"

const StarwarsView:React.FunctionComponent = () => {
  const [character, setCharacter] = useState<undefined | StarwarsCharType>(undefined)
  const [nPersonaje, setNPersonaje] = useState<number>(1)
  const [infoToList, setInfoToList] = useState<string[]>([])

  const getStarwarsData = async () => {
    const data = await fetch(`https://swapi.dev/api/people/${nPersonaje}/`)
    .then((response:any) => {
      return response.json()
    })
    setCharacter(data)
  }

  const getCurrentYear = (name:string) => {
    let fecha = new Date()
    console.log(fecha.getFullYear())
    console.log(`Esto fue ejecutado desde el boton llamado ${name}`)
  }

  const characterInfoCreateArray = () => {
    if (character != undefined){
      let formattedInfo:string[] = []
      for (let n = 0; n < Object.entries(character).length; n++) {
        formattedInfo.push(
          `
            ${Object.entries(character)[n][0]}
            :
            ${Object.entries(character)[n][1]}
          `
        )
      }
      setInfoToList(formattedInfo)
    }
  }

  useEffect(() => {
    getStarwarsData()
    characterInfoCreateArray()
  }, [nPersonaje, character])


  return (
    <div>
      Hola desde Starwars, el personaje que estamos viendo es {character != undefined ? character.name : null}
      <Button
        name="Boton A"
        text="click me"
        disabled={false}
        action={getCurrentYear}
      />
      <Button
        name="Boton B"
        text="soy el boton 2"
        disabled={false}
        action={getCurrentYear}
      />
      {<List data={infoToList}/>}
    </div>
  )
}
export default StarwarsView