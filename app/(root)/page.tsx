import Header from "@/components/Header";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";


export default function Home() {

  const loggedIn = {
    firstName: "Chandima", 
    lastName:"Maduwantha",
    email:"hychandima2000@gmail.com"
   }
  return (
    <section className="no-scrollbar flex flex-row w-full max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <Header
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "guest"}
            subtext="Access and Manage your accounts and Transactions Efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={3}
            totalCurrentBalance={425868}
          />

        </header>

        {/* Recent Transaction */}
      </div>

      {/* Right Sidebar Component */}
      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 423.50},{currentBalance:500.00}]}
      />

    </section>

  )
}
