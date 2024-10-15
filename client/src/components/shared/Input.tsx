import { FC } from 'react'

type InputTextProps = {
    type?: 'text' | 'email' | 'password' | 'tel'
    placeholder: string
    lable: string
    className?: string
}

const InputText: FC<InputTextProps> = ({
    type = 'text',
    placeholder,
    lable,
    className,
}: InputTextProps) => {
    return (
        <label className={` flex flex-col ` + (className ? className : '')}>
            {lable}
            <input
                type={type}
                placeholder={placeholder}
                className={`border border-foreground-secondary/20 shadow-inner py-3 px-4 rounded mt-2`}
            />
        </label>
    )
}

export default InputText
