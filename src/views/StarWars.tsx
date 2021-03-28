import React, {useState, useEffect} from 'react'
//MY COMPONENTS
import Table from "../components/Table/Table"
//REACT ROUTER
import { Route, Switch, useHistory} from 'react-router-dom'

const StarwarsView:React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<any>(undefined)
  const [page, setPage] = useState<number>(1) //ESTADO QUE SE ENCARGA DE REFERIR EL NUMERO DE PAGINA
  const history = useHistory() //HISTORICO DE RUTAS

  const getStarwarsData = async () => {
    const data = await fetch(`https://swapi.dev/api/people/`) //SOLICITO LOS DATOS Y ESPERO QUE LLEGUEN
    .then((response:any) => { //ENTONCES SI LLEGAN SIGO ACA
      return response.json() //LOS DATOS QUE ME LLEGARON LOS CONVIERTO EN UN OBJETO JSON
    })
    setCharacters(data.results) //GUARDAMOS LOS DATOS EN UN ESTADO DE REACT LLAMADO CHARACTERS
  }

  useEffect(() => {
    getStarwarsData()
    //SOLAMENTE LA PRIMERA VEZ QUE CARGO LA PAGINA CHEQUEO SI EL USUARIO INGRESO UN NUMERO EN LA URL O NO
    if (history.location.pathname.split('/')[1] != '' && page == 1) { //SI EL USUARIO INGRESO UNA URL EN EL BUSCADOR EN LA PRIMERA CARGA Y LA PAGINA VIENE EN 1 ENTONCES CAMBIAME EL ESTADOD DE LA PAGINA POR EL NUMERO QUE INGRESO EL USUARIO EN LA URL
      setPage(parseInt(history.location.pathname.split('/')[1]))
    }
    history.push(`/${page}`)
  }, []) //T0DO ESTO SE VA A EJECUTAR UNA SOLA VEZ, PARAMETRO VACIO ESTO EVITA QUE CARGUEMOS UNA Y OTRA VEZ LOS DATOS DE LA API

  useEffect(() => {
    //SE EJECUTA CADA VEZ QUE EL ESTADO PAGINA CAMBIE
    history.push(`/${page}`)
  }, [page])

  const prepareData = () => {
    let formattedChars:any = [] //DATA QUE ESPERA EL BODY DE MI TABLA
    let formattedCharsHeads:any = [] //DATA QUE ESPERAN LOS ENCABEZADOS DE MI TABLA

    if (characters != undefined){ //COMPROBAR QUE LOS DATOS DE LA API YA ESTEN CARGADOS EN EL ESTADO CHARACTERS
      //TOMAR LOS ENCABEZADOS DE LA TABLA
      formattedCharsHeads = Object.keys(characters[0]) //DEL PRIMER PERSONAJE OBTIENES UN ARREGLO DE STRINGS CON LOS NOMBRES DE CADA PROPIEDAD
      for (let nCharacters=0; nCharacters < characters.length; nCharacters++){
        let dataChar:any[] = []
        let propierties = Object.values(characters[nCharacters]) //OBJECT VALUES NOS TRAE TODOS LO VALORES DEL OBJETO UNO POR UNO
        let propiertiesNames = Object.keys(characters[nCharacters])
        for (let characterPropierty = 0; characterPropierty < propierties.length; characterPropierty++ ){ // POR CADA UNA DE LAS PROPIEDADES ENCONTRADAS EN UN PERSONAJE HAZ LO SIGUIENTE
          dataChar.push({
            value:  propierties[characterPropierty],
            type: typeof propierties[characterPropierty],
            propiertyName: propiertiesNames[characterPropierty]
          })
        }
        formattedChars.push(dataChar) //POR CADA PERSONAJE CREO UNA ROW CON 16 COLUMNAS CORRESPONDIENTES A CADA PROPIEDAD
      }
    }
    return [formattedChars, formattedCharsHeads] //DEVUELVO TODA LA DATA FORMATEADA DE MIS PERSONAJES
  }

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
            filterData={['homeworld', 'eye_color', 'name']}
          />
        </Route>
      </Switch>
    </div>
  )
}
export default StarwarsView