import Header from "@/components/Header";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";


declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId : loggedIn.$id});

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appWriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appWriteItemId })

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
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />

        </header>

        {/* Recent Transaction */}
      </div>

      {/* Right Sidebar Component */}
      <RightSideBar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0,2)}
      />

    </section>

  )
}

export default Home;
