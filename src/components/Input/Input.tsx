import React, {useRef, useEffect} from "react"

type InputProps = {
  placeholder: string,
  name: string,
  disabled: boolean,
  readonly: boolean,
  value: string,
  onChange: (val:string[]) => void
}

const Input:React.FunctionComponent<InputProps> = (props) => {

  const sandia = useRef(null)

  useEffect(() => {
    if (sandia.current != null){
      //@ts-ignore
      sandia.current.value = props.value
    }
  }, [])

  const handleChange = () => {
    if (sandia.current != null){
      //@ts-ignore
      props.onChange([props.name, sandia.current.value])
    }
  }

  return (
    <input
      ref={sandia} 
      type="text"
      placeholder={props.placeholder}
      name={props.name}
      disabled={props.disabled}
      readOnly={props.readonly}
      onChange={handleChange}
    />
  )
}

export default Input