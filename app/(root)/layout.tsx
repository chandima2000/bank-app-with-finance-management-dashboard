import MobileNavBar from "@/components/MobileNavBar";
import LeftSideBar from "@/components/LeftSideBar";
import Image from "next/image";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = await getLoggedInUser();
  if(!loggedIn){
    redirect("/sign-in")
  }

  return (
    <main className="flex h-screen w-full font-inter">
        <LeftSideBar user={loggedIn}/>

        <div className="flex flex-col size-full">
          <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
            <Image 
              src="/icons/logo.svg"
              width={30}
              height={30}
              alt = "logo"
              />
              <div >
                <MobileNavBar user={loggedIn}/>
              </div>
          </div>
          {children}
        </div>
        
        
    </main>
  );
}
