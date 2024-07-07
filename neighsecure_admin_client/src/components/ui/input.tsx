import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string
    label?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,label, errorMessage, type, ...props }, ref) => {
    return (
    <label className={'flex flex-col gap-6 text-color-base-brown text-[18px]'}>
      {label}
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-[8px] border border-input bg-transparent px-3 py-8 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondaryText  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${errorMessage? "border-red-700": ""}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {
          errorMessage &&
          <small className={'text-red-700 font-normal text-xs'}>{errorMessage}</small>
        }
      </label>
    )
  }
)
Input.displayName = "Input"

export { Input }
