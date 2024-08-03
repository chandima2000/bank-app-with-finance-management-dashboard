'use client'

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer';


declare interface MobileNavProps {
    user: User;
}

export default function MobileNavBar(
    { user }: MobileNavProps
) {

    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={30}
                        height={30}
                        alt='hamburger-menu' />
                </SheetTrigger>
                <SheetContent
                    side='left'
                    className='border-none bg-white '>

                    {/* Navigation */}

                    <Link href="/" className='flex cursor-pointer items-center gap-2 px-4'>
                        <Image
                            src="/icons/logo.svg"
                            width={34}
                            height={34}
                            alt='logo'
                        />
                        <h1
                            className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                            SwiftBank
                        </h1>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>

                            <nav className='flex flex-col h-full gap-6 pt-16 text-white'>
                                {/* Create Navigation*/}
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                href={item.route}
                                                key={item.label}
                                                className={cn(
                                                    'flex gap-3 items-center p-4 rounded-lg w-full max-w-60',
                                                    { 'bg-bank-gradient': isActive }
                                                )}>
                                                <div className="relative size-6">
                                                    <Image
                                                        src={item.imgURL}
                                                        alt={item.label}
                                                        width={20}
                                                        height={20}
                                                        
                                                        className={cn({
                                                            'brightness-[3] invert-0': isActive
                                                        })}
                                                    />
                                                </div>
                                                <p className={cn(
                                                    'text-20 font-bold text-black-2',
                                                    { ' !text-white': isActive }
                                                )}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </nav>
                        </SheetClose>
                        <Footer user={user} type="mobile"/>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
