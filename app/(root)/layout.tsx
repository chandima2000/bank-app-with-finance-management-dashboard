import MobileNavBar from "@/components/MobileNavBar";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = { firstName: "Chandima", lastName:"Maduwantha"};

  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>

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
