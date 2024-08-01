import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


declare interface RightSidebarProps {
    user: User;
    transactions: Transaction[];
    banks: Bank[] & Account[];
  }
  

export default function RightSideBar({
    user,transactions,banks
} : RightSidebarProps
) {
  return (
    <div className='no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll !important'>
        {/* Account Details */}
      <section className='flex flex-col '>
        
        <div className="flex flex-row pl-6  max-xl:justify-center gap-4 items-center">
            <div className="flex-center mt-10 size-14 rounded-full bg-gray-700 border-8 p-2 shadow-profile">
                <span className='text-xl font-bold text-white '>
                    {user.firstName[0]}
                </span>
            </div>

            <div className="flex flex-col mt-10">
                <h1 className='text-14 font-semibold text-gray-900'>
                    {user.firstName} {user.lastName}
                </h1>
                <p className="text-16 font-normal text-gray-600">
                    {user.email}
                </p>
            </div>
        </div>

        {/* Image */}
        <div className="bg-cover bg-no-repeat mt-1">
            <Image
                src={'/icons/finance.svg'}
                alt='background'
                width={260}
                height={100}
            />
        </div>

      </section>

      {/* All Bank Details */}
      <section className='flex flex-col justify-between gap-8 px-6 py-8'>
        <div className="flex w-full justify-between">
            <h2 className='text-18 font-semibold text-gray-900'>My Banks</h2>
            <Link href="/" className='flex gap-2'>
                <Image 
                    src='/icons/plus.svg'
                    alt='add-btn'
                    width={20}
                    height={20}
                />
                <h2 className='text-14 font-semibold text-gray-600'>add bank</h2>
            </Link>
        </div>

        {banks?.length > 0 && (
            <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                <div className="relative z-10">Bank Card 1</div>
                {banks[1] && (
                    <div className="absolute right-0 top-8 z-0 w-[90%]">
                        Bank Card 2
                    </div>
                )}
            </div>
        )}
      </section>
    </div>
  )
}
