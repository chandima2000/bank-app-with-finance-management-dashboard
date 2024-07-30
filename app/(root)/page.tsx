import Header from "@/components/Header";


export default function Home() {

  const loggedIn = {firstName : "Chandima"}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="welcome"
            user= {loggedIn?.firstName || "guest"}
            subtext="Access and Manage your accounts and Transactions Efficiently."
          />
        </header>
      </div>
    </section>

  )
}
