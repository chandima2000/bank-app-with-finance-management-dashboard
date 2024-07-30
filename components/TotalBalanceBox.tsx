import React from 'react'
import CountUpBox from './CountUpBox'

export default function TotalBalanceBox({
    accounts = [],
    totalBanks,
    totalCurrentBalance

}: TotalBalanceBoxProps

) {
    return (
        <section className='total-balance'>
            <div className="total-balance-chart">
                {/* DoughnutChart */}
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Bank Account(s) : {totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <div className="total-balance-label">
                        Total Balance
                    </div>
                    <div className="total-balance-amount text-center gap-2">
                       <CountUpBox amount = {totalCurrentBalance} />
                    </div>
                </div>
            </div>
        </section>
    )
}
