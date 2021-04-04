import React, {useState, useEffect} from 'react'
//MY COMPONENTS
import Table from "../components/Table/Table"
import Input from "../components/Input/Input"
//REACT ROUTER
import { Route, Switch, useHistory} from 'react-router-dom'
//TYPES
import { StarwarsCharType } from "../types/types"


const StarwarsView:React.FunctionComponent = () => {
  const newCharEmpty:StarwarsCharType = {
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: ''
  }
  const [characters, setCharacters] = useState<any>(undefined)
  const [page, setPage] = useState<number>(1) 
  const [newChar, setNewChar] = useState<StarwarsCharType>(newCharEmpty)
  const history = useHistory()

  const getStarwarsData = async () => {
    const data = await fetch(`https://swapi.dev/api/people/?page=${page}`) 
    .then((response:any) => { 
      return response.json() 
    })
    setCharacters(data.results)
  }

  useEffect(() => {
    if (history.location.pathname.split('/')[1] != '' && page == 1) { 
        setPage(parseInt(history.location.pathname.split('/')[1]))
    }
    history.push(`/${page}`)
  }, []) 

  useEffect(() => {
    getStarwarsData()
    history.push(`/${page}`)
  }, [page])


  const prepareData = () => {
    let formattedChars:any = [] 
    let formattedCharsHeads:any = [] 

    if (characters != undefined){
      formattedCharsHeads = Object.keys(characters[0]) 
      for (let nCharacters=0; nCharacters < characters.length; nCharacters++){
        let dataChar:any[] = []
        let propierties = Object.values(characters[nCharacters]) 
        let propiertiesNames = Object.keys(characters[nCharacters])
        for (let characterPropierty = 0; characterPropierty < propierties.length; characterPropierty++ ){ 
          dataChar.push({
            value:  propierties[characterPropierty],
            type: typeof propierties[characterPropierty],
            propiertyName: propiertiesNames[characterPropierty]
          })
        }
        formattedChars.push(dataChar) 
      }
      //TOMAR LA DATA NUEVA E INSERTARLA EN LA TABLA
      let dataChar:any[] = []
      for (let x = 0; x < Object.keys(newChar).length; x++){
        let propierties = Object.values(newChar)
        dataChar.push({
          value:  propierties[x],
          type: typeof propierties[x],
          propiertyName: Object.keys(newChar)[x]
        })
      }
      formattedChars.push(dataChar) //AGREGANDO UN NUEVO PERSONAJE CUSTOM
    }
    return [formattedChars, formattedCharsHeads] 
  }

  const getChangedValue = (val:string[]) => {
    let userArray:string[] = val[1].split(',') 
    switch (val[0]) {
      case 'name':
        setNewChar({
          name: val[1],height: newChar.height, mass: '',hair_color: '',skin_color: '',eye_color: '',birth_year: '',gender: '',homeworld: '',films: newChar.films,species: newChar.species,vehicles: [],starships: [],created: '',edited: '',url: ''
        })
        break
      case 'height':
        setNewChar({
          name: newChar.name, height: val[1],mass: '',hair_color: '',skin_color: '',eye_color: '',birth_year: '',gender: '',homeworld: '',films: newChar.films,species: newChar.species,vehicles: [],starships: [],created: '',edited: '',url: ''
        })
        break
      case 'films':
        setNewChar({
          name: newChar.name, height: newChar.height,mass: '',hair_color: '',skin_color: '',eye_color: '',birth_year: '',gender: '',homeworld: '',
          films: userArray, species: newChar.species,vehicles: [],starships: [],created: '',edited: '',url: ''
        })
        break
      case 'species':
        setNewChar({
          name: newChar.name, height: newChar.height,mass: '',hair_color: '',skin_color: '',eye_color: '',birth_year: '',gender: '',homeworld: '',
          films: newChar.films, species: userArray,vehicles: [],starships: [],created: '',edited: '',url: ''
        })
        break
    }
  }

  useEffect(() => {
  }, [newChar])

  return (
    <div>
      <h1>Esta es la pagina {page}</h1>
      <p>Bievenidos a mi tabla de informaciones de mi api</p>
      <button onClick={ () => setPage( page > 1 ? page - 1 : 1) }>ANTERIOR</button>
      <button onClick={ () => setPage(page + 1) }>SIGUIENTE</button>
      <Switch>
        <Route exact path={`/:page`}>
          <Table
            tableData={prepareData()[0]}
            tableDataHeads={prepareData()[1]}
            filterData={['homeworld', 'eye_color']}
          />
        </Route>
      </Switch>
      <h1>Agrega tu personaje</h1>
      <Input 
        readonly={false}
        placeholder='name'
        disabled={false}
        name='name'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='height'
        disabled={false}
        name='height'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='mass'
        disabled={false}
        name='mass'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='hair_color'
        disabled={false}
        name='hair_color'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='skin_color'
        disabled={false}
        name='skin_color'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='eye_color'
        disabled={false}
        name='eye_color'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='birth_year'
        disabled={false}
        name='birth_year'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='gender'
        disabled={false}
        name='gender'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='homeworld'
        disabled={false}
        name='homeworld'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='films'
        disabled={false}
        name='films'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='species'
        disabled={false}
        name='species'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='vehicles'
        disabled={false}
        name='vehicles'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='starships'
        disabled={false}
        name='starships'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='created'
        disabled={false}
        name='created'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='edited'
        disabled={false}
        name='edited'
        value=''
        onChange={getChangedValue}
      />
      <Input 
        readonly={false}
        placeholder='url'
        disabled={false}
        name='url'
        value=''
        onChange={getChangedValue}
      />
    </div>
  )
}
export default StarwarsView