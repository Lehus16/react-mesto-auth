import React from 'react'
import AuthForm from './AuthForm'
import { Controller, FormProvider, useForm } from "react-hook-form";
import AuthInput from './AuthInput';
const Login = ({ submitHandler }) => {


  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = methods

  function onSubmit(data) {
    submitHandler(data)
    reset()
  }


  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={handleSubmit(onSubmit)} title={'Вход'} buttonText={'Войти'} >
        <Controller name={"email"} control={control} render={({ field: { value, onChange, onBlur } }) => (<AuthInput onChange={onChange} onBlur={onBlur} value={value} type='email' placeholder='email' />)} />
        <Controller name={"password"} control={control} render={({ field: { value, onChange, onBlur } }) => (<AuthInput onChange={onChange} onBlur={onBlur} value={value} type='password' placeholder='password' />)} />
      </AuthForm>
    </FormProvider>
  )
}

export default Login
