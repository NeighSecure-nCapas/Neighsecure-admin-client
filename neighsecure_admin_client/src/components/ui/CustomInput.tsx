interface InputProps {
  label: string
  placeholder: string
  description?: string
  value?: string
  type?: string,
  required?: boolean
  name?: string
  errorMessage?: string
}

const Input = ({
  label,
  placeholder,
  type,
  description,
  required = false,
  name,
  errorMessage
               } : InputProps) => {
  return (
    <label className={'flex flex-col gap-6 text-color-base-brown text-[18px]'}>
      {label}
      <input
        type={type || 'text'}
        name={name}
        required={required}
        placeholder={placeholder}
        className={`p-6 rounded-lg w-full border text-color-base-brown-opacity placeholder:font-light ${errorMessage? "border-red-700": ""} placeholder:text-[16px]`}
      />
      {
        errorMessage &&
        <small className={'text-red-700 w-4/5 font-light text-xs text-wrap'}>{errorMessage}</small>
      }
      {
        description &&
        <small className={'font-light w-4/5 text-color-base-secundary-text text-[16px] text-wrap'}>{description}</small>
      }
    </label>
  )
}

export default Input
