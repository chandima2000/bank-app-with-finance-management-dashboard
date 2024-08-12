"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  accounts
}: DoughnutChartProps) {

  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance)

  const data = {
    datasets: [
      {
        labels: "Banks",
        data: [1250, 2574, 3420],
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3']
  }
  return (
    <Doughnut 
      data={data}
      options={{
        cutout:"60%",
        plugins: {
          legend: {
            display: false
          }
        }
      }} />
  )
}
