import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image';
import React from 'react'

declare interface FooterProps {
    user: User;
    type?: 'mobile' | 'desktop'
}

export const Footer = ({ user, type = "desktop" }: FooterProps) => {

    const handleLogOut = async () => {
        await logoutAccount()

    }

    return (
        <div className='flex cursor-pointer items-center justify-between gap-2 py-6'>

            {/* Profile First Name */}
            <div className={type === 'mobile' ? "footer_name-mobile" : "footer_name-desktop"}>
                <p className='text-xl font-bold text-gray-700'>
                    {user?.name[0]}
                </p>
            </div>

            {/* Username & Email */}
            <div className={type === 'mobile' ? "footer_email-mobile" : "footer_email-desktop"}>
                <p className='text-14 truncate font-normal text-gray-600'>{user?.email}</p>
                <h1 className='text-14 truncate text-gray-700 font-semibold'>{user?.name}</h1>
            </div>

            {/* Logout Button */}
            <div 
                className="footer_image-desktop"
                onClick={handleLogOut}
            >
                <Image 
                    src={"icons/logout.svg"}
                    alt='logout'
                    width={24}
                    height={24}
                />
            </div>
        </div>
    )
}
