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

        
        {children}
    </main>
  );
}
