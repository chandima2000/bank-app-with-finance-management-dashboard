import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { Button } from './ui/button';

declare interface PlaidLinkProps {
    user: User;
    variant?: "primary" | "ghost";
    dwollaCustomerId?: string;
}


const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
  
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const getLinkToken = async () => {
        
        // Server action
        const data = await createLinkToken(user);
  
        setToken(data?.linkToken);
      }
  
      getLinkToken();
    }, [user]);
  
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    
        // Server action
      await exchangePublicToken({
        publicToken: public_token,
        user,
      })
  
      router.push('/');
    }, [user])
    
    const config: PlaidLinkOptions = {
      token,
      onSuccess
    }
  
    const { open, ready } = usePlaidLink(config);
    
    return (
      <>
        {variant === 'primary' ? (
          <Button
            onClick={() => open()}
            disabled={!ready}
            className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
          >
            Connect bank
          </Button>
        ): variant === 'ghost' ? (
          <Button onClick={() => open()} variant="ghost" className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start">
            {/* <Image 
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}
            /> */}
            <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
          </Button>
        ): (
          <Button onClick={() => open()} className="flex !justify-start cursor-pointer gap-3 rounded-lg !bg-transparent flex-row">
            {/* <Image 
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}
            /> */}
            <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
          </Button>
        )}
      </>
    )
  }
  
  export default PlaidLink