import { Input } from "@/components/ui/input"
import React from 'react'
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import { authFormSchema } from "@/lib/utils"


const formSchema = authFormSchema('sign-up')
// TypeScript Declaration
interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

export default function CustomInput(
    { control, name, label, placeholder }: CustomInputProps
) {
    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <div className="flex flex-col gap-2">
                        <div className="mt-4">
                            <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                                {label}
                            </FormLabel>
                        </div>

                        <div className="flex flex-col w-full">
                            <FormControl>
                                <Input
                                    placeholder={placeholder}
                                    className='text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500'
                                    type={name === "password" ? 'password' : 'text'}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-12 text-red-500' />
                        </div>
                    </div>
                )}
            />
        </div>
    )
}
