import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto' //eslint-disable-line 
import './BarChart.css'

const BarChart = () => {
     const data = {
        "Jan":0,
        "feb":2, 
        "Mar":0, 
        "April":5, 
        "May":3,
        "June":0, 
        "July":0, 
        "Aug":10,
        "Sept":16,
        "Oct":0,
        "Nov":0,
        "Dec":0,
     }
  return (
    <div className='chart'>
        <h2>Monthly Applications</h2>
      <div className='chart-container'>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["Jan", "feb", "Mar", "April", "May","June", "July", "Aug","Sept","Oct","Nov","Dec"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: Object.values(data),
                // Color of each bar
                backgroundColor: "#364DD9",
                // Border color of each bar
                //borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
        
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default BarChart
