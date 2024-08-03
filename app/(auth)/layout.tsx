import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">

          {children}
          <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-sky-1 max-lg:hidden">
              <div className="">
                <Image
                  src={"/icons/p1.png"}
                  alt="dashboard"
                  width={960}
                  height={911}
                  />
              </div>
          </div>
      </main>
    );
  }
  