import { SubmitHandler, useForm } from "react-hook-form"
import InputProperty from '../types/inputProperty';

const useInputLogic = () => {
  const { register,handleSubmit,formState: { errors } } = useForm<InputProperty>()

  const onSubmit: SubmitHandler<InputProperty> = (data) => {
    console.log(data)
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors
  }
}

export default useInputLogic