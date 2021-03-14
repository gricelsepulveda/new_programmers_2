import React from 'react'

type ButtonProps = {
  text: string,
  disabled: boolean,
  action: (_name:string) => void, //TIPO PARA DEFINIR QUE VA A SER UNA FUNCION EJECUTABLE
  name: string
}

const Button:React.FunctionComponent<ButtonProps> = (props) => {

  const funcionDelBoton = () => {
    props.action(props.name)
  }

  return (
    <button
      name={props.name}
      disabled={props.disabled}
      onClick={funcionDelBoton}
    >
      {props.text}
    </button>
  )
}
export default Button