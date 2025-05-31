import { ComponentProps } from "react";

type IInput = {
  label: string;
  prefixText?: string;
 }

 export function Input({
   label,
   placeholder,
   prefixText,
   ...props
 }: ComponentProps<"input"> & IInput) {
   return(
   <div className="flex flex-col gap-2">
    <label className="text-custom-gray-800 text-xs font-thin ">{label}</label>
    {prefixText ? (
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
          {prefixText}
        </span>
        <input
          className="pl-16 p-3 rounded-lg border border-gray-300 text-custom-gray-800 text-sm w-full"
          {...props}
        />
      </div>
    ) :
      <input className="p-3 rounded-lg border border-gray-300 text-custom-gray-800 text-sm" {...props} />
    }
   </div>
  )

 }