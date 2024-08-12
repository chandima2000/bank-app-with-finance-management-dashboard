'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'

import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'


export default function AuthForm({ type }: { type: string }) {

    const router = useRouter();

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Create utility function for User Input validation
    const formSchema = authFormSchema(type)

    // This is from NextJs/Form package
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            city:"",
            state: "",
            postalCode: "",
            dob: "",
            ssn: "",
            email: "",
            password: "",
        },
    })

    
    // Define the Form Submit Handler
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.


        try {

            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address: data.address!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dob!,
                ssn: data.ssn!,
                email: data.email,
                password: data.password

            }
            
            if(type === 'sign-up'){
                const newUser = await signUp(userData) // Create a NewUser
                setUser(newUser)
            }

            // Destructure email, password from the FormData
            const {email,password} = data

            if(type === 'sign-in'){
            
                const response = await signIn({email,password})
                if(response) {
                    router.push("/")
                }
             }

        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <section
            className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className='flex mb-12 cursor-pointer items-center gap-2'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="logo"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24"
                    />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold text-black">
                        SwiftBank
                    </h1>

                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? "Link Account"
                            : (type === "sign-in"
                                ? "Sign In"
                                : "Sign Up")
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ?
                                "Link your account to get started" :
                                "Please enter your details"
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    {/* Paid Link */}
                    <PlaidLink user={user} variant="primary"/>
                </div>
            ) : (
                <div>

                    {/* Form */}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                            {/* Signup form */}

                            {type === 'sign-up' && (
                                <div className="">



                                    <div className="flex gap-4">

                                        {/* First Name */}
                                        <CustomInput
                                            control={form.control}
                                            name="firstName"
                                            label='First Name'
                                            placeholder='Enter your first name'
                                        />

                                        {/* Last Name */}
                                        <CustomInput
                                            control={form.control}
                                            name="lastName"
                                            label='Last Name'
                                            placeholder='Enter your last name'
                                        />

                                    </div>

                                    <div className='flex gap-4'>
                                        {/* Address */}
                                        <CustomInput
                                            control={form.control}
                                            name="address"
                                            label='Address'
                                            placeholder='Enter your address'
                                        />

                                         {/* City */}
                                         <CustomInput
                                            control={form.control}
                                            name="city"
                                            label='City'
                                            placeholder='Enter your city'
                                        />
                                    </div>
                                    
                                <div className="flex gap-4">
                                    {/* State */}
                                    <CustomInput
                                        control={form.control}
                                        name="state"
                                        label='State'
                                        placeholder='ex: NY'
                                    />

                                    {/* Postal Code */}
                                    <CustomInput
                                        control={form.control}
                                        name="postalCode"
                                        label='Postal Code'
                                        placeholder='ex: 1234'
                                    />
                                </div>
                                    
                                <div className="flex gap-4">
                                    {/* DOB */}
                                    <CustomInput
                                        control={form.control}
                                        name="dob"
                                        label='Date of Birth'
                                        placeholder='yyyy-mm-dd'
                                    />

                                    {/* SSN */}
                                    <CustomInput
                                        control={form.control}
                                        name="ssn"
                                        label='SSN'
                                        placeholder='ex: 5678'
                                    />
                                </div>
                                    
                                    <div>
                                        {/* Email Field */}
                                    <CustomInput
                                        control={form.control}
                                        name="email"
                                        label='Email'
                                        placeholder='Enter your email'
                                    />

                                    {/* Password Field */}
                                    <CustomInput
                                        control={form.control}
                                        name="password"
                                        label='Password'
                                        placeholder='Enter your password'
                                    />
                                    </div>
                                    
                                </div>
                            )}


                            {/* Sign In */}
                            {type === 'sign-in' && (

                                <div className="">
                                    {/* Email Field */}
                                    < CustomInput
                                        control={form.control}
                                        name="email"
                                        label='Email'
                                        placeholder='Enter your email'
                                    />

                                    {/* Password Field */}
                                    <CustomInput
                                        control={form.control}
                                        name="password"
                                        label='Password'
                                        placeholder='Enter your password'
                                    />
                                </div>

                            )}


                            <Button
                                type="submit"
                                className='text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form w-auto'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className='flex'>
                                        <Loader2 size={20}
                                            className='animate-spin' /> &nbsp;
                                        Loading ...
                                    </div>
                                ) : (
                                    type === "sign-in" ? (
                                        "Sign In"
                                    ) : ("Sign Up")
                                )
                                }

                            </Button>
                        </form>
                    </Form>

                    <footer
                        className='flex justify-start gap-2'>
                        <p
                            className='text-14 font-normal text-gray-600 mt-5'>
                            {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                            <Link
                                href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                                className="text-14 cursor-pointer font-medium text-bankGradient ml-1">
                                {type === 'sign-in' ? ('Sign Up') : ('Sign In')}
                            </Link>
                        </p>
                    </footer>
                </div>
            )
            }
        </section>
    )
}
