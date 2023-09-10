import React, { useState, useEffect } from 'react'

const AuthInput = (props) => {

  const [value, setValue] = useState(props.value || '');


  useEffect(() => {
    setValue(props.value);
  }, [props.value])


  return (
    <>
      <input onChange={props.onChange} value={value} name={props.name} className='register-form__input' placeholder={props.placeholder}></input>
      <span className='register-form__input-span'></span>
    </>

  )
}

export default AuthInput
