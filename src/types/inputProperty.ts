import { ChangeEventHandler } from "react"

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
    value: string,
}

export default InputProperty