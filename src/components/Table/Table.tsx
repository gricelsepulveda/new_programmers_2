import React, { useEffect, useState } from "react"
import TableHead from "./TableHead"
import TableRow from "./TableRow"

export type columnType = {
  value: any,
  type: string,
  propiertyName: string
}

type TableProps = {
  tableData: any,
  tableDataHeads: string[] | undefined,
  filterData: string[]
}

const Table:React.FunctionComponent<TableProps> = (props) => {
  const [filterData, setFilterData] = useState<any>([])
  const [filterHeaders, setFilterHeaders] = useState<any>([])

  useEffect(() => {
    if (props.tableDataHeads != undefined ){ //CHEQUEO QUE LA DATA DE LA API YA VENGA CARGADA EN EL COMPONENTE
      let result:any //CREO UNA VARIABLE DONDE GUARDO MIS RESULTADOS FILTRADOS
      result = props.tableDataHeads.filter(heads => !props.filterData.includes(heads)) //FILTRO LOS ENCABEZADOS ORIGINALES UNO POR UNO CON INCLUDES CHEQUEANDO QUE EL NOMBRE DEL ENCABEZADO ORIGINAL NO COINCIDA CON LO QUE PUSE EN PROPS.FILTERDATA
      setFilterHeaders(result) //GUARDO EN EL ESTADO DE ENCABEZADOS FILTRADOS, MIS ENCABEZADOS FILTRADOS
    }
    if (props.tableData != undefined){ //CHEQUEO QUE LA DATA DE LA API YA VENGA CARGADA EN EL COMPONENTE
      let newData:any[] = [] //CREO UNA VARIABLE PARA GUARDAR MIS PERSONAJES CON LA DATA FILTRADA
      let result:any //CREAR UNA VARIABLE QUE GUARDE CADA UNA DE LAS COLUMNAS FILTRADAS
      for (let i= 0; i < props.tableData.length; i++){ //RECORRO CADA UNO DE LOS PERSONAJES Y FILTRO SEGUN EL PROPIERTY NAME
        //@ts-ignore
        result = props.tableData[i].filter(data => !props.filterData.includes(data.propiertyName)) //EVITO AQUELLAS COLUMNAS QUE NO QUIERO
        newData.push(result) //GUARDO LAS COLUMNAS DE CADA PERSONAJE EN UN ARRAY DIFERENTE (UNO POR CADA PERSNAJE)
      }
      setFilterData(newData) //GUARDO EN EL ESTADO DE DATA FILTRADA LA INFORMACION DE MIS PERSONAJES FILTRADA
    }
  }, [props.tableDataHeads, filterHeaders.length, props.tableData, filterData.length])
  
  return (
    <table>
      <thead>
        <TableHead 
          headers={filterHeaders}
        />
      </thead>
      <tbody>
        {
          filterData.map((tData:any, nData:number) => 
            <TableRow
              colData={tData}
              key={`tableRow-${nData}`}
            />
          )
        }
      </tbody>
    </table>
  )
}

export default Table