import { useState, useEffect } from "react"
import "../Dashboard.css"
import Header from "../components/Header"
import StatsCards from "../components/StatsCards"
import Charts from "../components/Charts"
import DataTable from "../components/DataTable"
import { Toaster } from "react-hot-toast"


export default function Home() {
  const [activeTimeFilter, setActiveTimeFilter] = useState("12 Months")
  const [isLoading, setIsLoading] = useState(false)
  const [statsData, setStatsData] = useState(() => {
    const savedStats = localStorage.getItem("statsData")
    return savedStats
      ? JSON.parse(savedStats)
      : {
          "12 Months": [
            {
              title: "Total Investments",
              value: "$23.6M",
              subtitle: "145 Investments",
              type: "primary",
              growth: null,
              chart: null,
            },
            {
              title: "Total Users",
              value: "12,500",
              growth: "+12%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Investors",
              value: "5,000",
              growth: "+12%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Traders",
              value: "6,500",
              growth: "+12%",
              type: "secondary",
              chart: "line-down",
            },
          ],
          "30 Days": [
            {
              title: "Total Investments",
              value: "$2.1M",
              subtitle: "12 Investments",
              type: "primary",
              growth: null,
              chart: null,
            },
            {
              title: "Total Users",
              value: "1,200",
              growth: "+8%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Investors",
              value: "450",
              growth: "+10%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Traders",
              value: "600",
              growth: "-5%",
              type: "secondary",
              chart: "line-down",
            },
          ],
          "7 Days": [
            {
              title: "Total Investments",
              value: "$0.5M",
              subtitle: "3 Investments",
              type: "primary",
              growth: null,
              chart: null,
            },
            {
              title: "Total Users",
              value: "300",
              growth: "+5%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Investors",
              value: "100",
              growth: "+7%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Traders",
              value: "150",
              growth: "-2%",
              type: "secondary",
              chart: "line-down",
            },
          ],
          "24 Hour": [
            {
              title: "Total Investments",
              value: "$0.05M",
              subtitle: "1 Investment",
              type: "primary",
              growth: null,
              chart: null,
            },
            {
              title: "Total Users",
              value: "50",
              growth: "+2%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Investors",
              value: "20",
              growth: "+3%",
              type: "secondary",
              chart: "line-up",
            },
            {
              title: "Total Traders",
              value: "25",
              growth: "-1%",
              type: "secondary",
              chart: "line-down",
            },
          ],
        }
  })

  useEffect(() => {
    localStorage.setItem("statsData", JSON.stringify(statsData))
  }, [statsData])

  useEffect(() => {
    const hasSeenLoading = localStorage.getItem("hasSeenLoading")
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!hasSeenLoading && isLoggedIn) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
        localStorage.setItem("hasSeenLoading", "true")
      }, 5500) // 5.5 seconds for loading
      return () => clearTimeout(timer)
    }
  }, [])

  

  return (
    <div className="app">
<Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    // Default style
    style: {
      fontSize: "14px",
      borderRadius: "8px",
      padding: "12px 16px",
      fontWeight: 500,
    },
    success: {
      style: {
        background: "#2d6b2d", // dark green
        color: "#fff",
      },
      iconTheme: {
        primary: "#4ade80", // light green
        secondary: "#fff",
      },
    },
    error: {
      style: {
        background: "#dc2626", // red
        color: "#fff",
      },
      iconTheme: {
        primary: "#f87171", // lighter red
        secondary: "#fff",
      },
    },
    loading: {
      style: {
        background: "#374151", // gray
        color: "#f3f4f6",
      },
    },
  }}
/>

      {isLoading && (
        <div className="loading-overlay">
          {/* <div className="loading-text">Loading Admin Dashboard...</div> */}
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Admin Dashboard...</div>
          </div>
        </div>
      )}
      <main className={`main-content ${isLoading ? "blurred" : ""}`}>
        <Header />
        <div className="time-filters">
          {["12 Months", "30 Days", "7 Days", "24 Hour"].map((filter) => (
            <button
              key={filter}
              className={`time-filter ${activeTimeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <StatsCards
          stats={statsData[activeTimeFilter]}
          setStats={(newStats) => setStatsData({ ...statsData, [activeTimeFilter]: newStats })}
          activeTimeFilter={activeTimeFilter}
        />
        <Charts activeTimeFilter={activeTimeFilter} statsData={statsData} setStatsData={setStatsData} />
        <DataTable />
      </main>
    </div>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import "../Dashboard.css"
// import Header from "../components/Header"
// import StatsCards from "../components/StatsCards"
// import Charts from "../components/Charts"
// import DataTable from "../components/DataTable"

// export default function Home() {
//   const [activeTimeFilter, setActiveTimeFilter] = useState("12 Months")
//   const [statsData, setStatsData] = useState(() => {
//     const savedStats = localStorage.getItem("statsData")
//     return savedStats
//       ? JSON.parse(savedStats)
//       : {
//           "12 Months": [
//             {
//               title: "Total Investments",
//               value: "$23.6M",
//               subtitle: "145 Investments",
//               type: "primary",
//               growth: null,
//               chart: null,
//             },
//             {
//               title: "Total Users",
//               value: "12,500",
//               growth: "+12%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Investors",
//               value: "5,000",
//               growth: "+12%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Traders",
//               value: "6,500",
//               growth: "+12%",
//               type: "secondary",
//               chart: "line-down",
//             },
//           ],
//           "30 Days": [
//             {
//               title: "Total Investments",
//               value: "$2.1M",
//               subtitle: "12 Investments",
//               type: "primary",
//               growth: null,
//               chart: null,
//             },
//             {
//               title: "Total Users",
//               value: "1,200",
//               growth: "+8%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Investors",
//               value: "450",
//               growth: "+10%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Traders",
//               value: "600",
//               growth: "-5%",
//               type: "secondary",
//               chart: "line-down",
//             },
//           ],
//           "7 Days": [
//             {
//               title: "Total Investments",
//               value: "$0.5M",
//               subtitle: "3 Investments",
//               type: "primary",
//               growth: null,
//               chart: null,
//             },
//             {
//               title: "Total Users",
//               value: "300",
//               growth: "+5%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Investors",
//               value: "100",
//               growth: "+7%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Traders",
//               value: "150",
//               growth: "-2%",
//               type: "secondary",
//               chart: "line-down",
//             },
//           ],
//           "24 Hour": [
//             {
//               title: "Total Investments",
//               value: "$0.05M",
//               subtitle: "1 Investment",
//               type: "primary",
//               growth: null,
//               chart: null,
//             },
//             {
//               title: "Total Users",
//               value: "50",
//               growth: "+2%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Investors",
//               value: "20",
//               growth: "+3%",
//               type: "secondary",
//               chart: "line-up",
//             },
//             {
//               title: "Total Traders",
//               value: "25",
//               growth: "-1%",
//               type: "secondary",
//               chart: "line-down",
//             },
//           ],
//         }
//   })

//   useEffect(() => {
//     localStorage.setItem("statsData", JSON.stringify(statsData))
//   }, [statsData])

//   return (
//     <div className="app">
//       <main className="main-content">
//         <Header />
//         <div className="time-filters">
//           {["12 Months", "30 Days", "7 Days", "24 Hour"].map((filter) => (
//             <button
//               key={filter}
//               className={`time-filter ${activeTimeFilter === filter ? "active" : ""}`}
//               onClick={() => setActiveTimeFilter(filter)}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//         <StatsCards
//           stats={statsData[activeTimeFilter]}
//           setStats={(newStats) => setStatsData({ ...statsData, [activeTimeFilter]: newStats })}
//           activeTimeFilter={activeTimeFilter}
//         />
//         <Charts activeTimeFilter={activeTimeFilter} statsData={statsData} setStatsData={setStatsData} />
//         <DataTable />
//       </main>
//     </div>
//   )
// }


