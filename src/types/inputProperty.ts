import { ChangeEventHandler } from "react"
import { FieldErrors, UseFormRegister, ValidationRule } from "react-hook-form"

type InputProperty = {
    type: string,
    onChange: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement>,
    name: string,
    placeholder: string,
    width?: string,
    error?: string | undefined | false,
    usingIcon: boolean
    onClick?: React.MouseEventHandler,
    label?: string,
    value?: string,
    required?: string | ValidationRule<boolean>,
    errors?: FieldErrors,
    register: UseFormRegister<any>,
    pattern?: ValidationRule<RegExp>,
    minLength?: ValidationRule<string | number>,
}

export default InputProperty