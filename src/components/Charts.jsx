import { useState, useEffect } from "react"
import "../Charts.css"

const Charts = ({ activeTimeFilter, statsData, setStatsData }) => {
  const [activeTab, setActiveTab] = useState("Users")
  const [selectedYear, setSelectedYear] = useState(() => {
    const savedYear = localStorage.getItem("selectedYear")
    return savedYear ? Number.parseInt(savedYear) : new Date().getFullYear()
  })
  const [viewMode, setViewMode] = useState("monthly")
  const [hoverPieIndex, setHoverPieIndex] = useState(null)
  const [selectedBand, setSelectedBand] = useState("£100 - £10,000")
  const [hoverIndex, setHoverIndex] = useState(null) // Track hovered index
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }) // Track tooltip position

  const [chartData, setChartData] = useState({
    "12 Months": {
      Investments: {
        barData: [
          { month: "Jan", value: 20 },
          { month: "Feb", value: 25 },
          { month: "Mar", value: 22 },
          { month: "Apr", value: 30 },
          { month: "May", value: 18 },
          { month: "Jun", value: 25 },
          { month: "Jul", value: 28 },
          { month: "Aug", value: 20 },
          { month: "Sep", value: 15 },
          { month: "Oct", value: 22 },
          { month: "Nov", value: 27 },
          { month: "Dec", value: 30 },
        ],
        yearlyData: {
          2020: { value: 180, growth: 0 },
          2021: { value: 220, growth: 22 },
          2022: { value: 195, growth: -11 },
          2023: { value: 240, growth: 23 },
          2024: { value: 280, growth: 17 },
          2025: { value: 320, growth: 14 },
          2026: { value: 0, growth: 0 },
          2027: { value: 0, growth: 0 },
          2028: { value: 0, growth: 0 },
          2029: { value: 0, growth: 0 },
        },
        revenue: Number.parseFloat(statsData["12 Months"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 23_600_000,
        growth: statsData["12 Months"][0]?.growth
          ? Number.parseFloat(statsData["12 Months"][0].growth.replace("%", ""))
          : 0,
        investmentCount:
          Number.parseInt(statsData["12 Months"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 145,
      },
      Users: {
        barData: [
          { month: "Jan", value: 1000 },
          { month: "Feb", value: 1200 },
          { month: "Mar", value: 1100 },
          { month: "Apr", value: 1300 },
          { month: "May", value: 1050 },
          { month: "Jun", value: 1250 },
          { month: "Jul", value: 1150 },
          { month: "Aug", value: 1000 },
          { month: "Sep", value: 950 },
          { month: "Oct", value: 1100 },
          { month: "Nov", value: 1200 },
          { month: "Dec", value: 1250 },
        ],
        yearlyData: {
          2020: { value: 8500, growth: 0 },
          2021: { value: 10200, growth: 20 },
          2022: { value: 9800, growth: -4 },
          2023: { value: 11500, growth: 17 },
          2024: { value: 12500, growth: 9 },
          2025: { value: 14000, growth: 12 },
          2026: { value: 0, growth: 0 },
          2027: { value: 0, growth: 0 },
          2028: { value: 0, growth: 0 },
          2029: { value: 0, growth: 0 },
        },
        revenue: Number.parseInt(statsData["12 Months"][1]?.value.replace(/,/g, "")) || 12_500,
        growth: Number.parseFloat(statsData["12 Months"][1]?.growth.replace("%", "")) || 12,
      },
      Revenue: {
        barData: [
          { month: "Jan", value: 58 },
          { month: "Feb", value: 85 },
          { month: "Mar", value: 72 },
          { month: "Apr", value: 92 },
          { month: "May", value: 68 },
          { month: "Jun", value: 85 },
          { month: "Jul", value: 78 },
          { month: "Aug", value: 65 },
          { month: "Sep", value: 58 },
          { month: "Oct", value: 85 },
          { month: "Nov", value: 75 },
          { month: "Dec", value: 82 },
        ],
        yearlyData: {
          2020: { value: 650, growth: 0 },
          2021: { value: 780, growth: 20 },
          2022: { value: 720, growth: -8 },
          2023: { value: 850, growth: 18 },
          2024: { value: 920, growth: 8 },
          2025: { value: 1050, growth: 14 },
          2026: { value: 0, growth: 0 },
          2027: { value: 0, growth: 0 },
          2028: { value: 0, growth: 0 },
          2029: { value: 0, growth: 0 },
        },
        revenue: 8_500_100,
        growth: 40,
      },
    },
    "30 Days": {
      Investments: {
        barData: [
          { month: "Day 1-5", value: 15 },
          { month: "Day 6-10", value: 20 },
          { month: "Day 11-15", value: 18 },
          { month: "Day 16-20", value: 25 },
          { month: "Day 21-25", value: 12 },
          { month: "Day 26-30", value: 20 },
        ],
        revenue: Number.parseFloat(statsData["30 Days"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 2_100_000,
        growth: statsData["30 Days"][0]?.growth
          ? Number.parseFloat(statsData["30 Days"][0].growth.replace("%", ""))
          : 0,
        investmentCount:
          Number.parseInt(statsData["30 Days"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 12,
      },
      Users: {
        barData: [
          { month: "Day 1-5", value: 200 },
          { month: "Day 6-10", value: 250 },
          { month: "Day 11-15", value: 220 },
          { month: "Day 16-20", value: 300 },
          { month: "Day 21-25", value: 180 },
          { month: "Day 26-30", value: 250 },
        ],
        revenue: Number.parseInt(statsData["30 Days"][1]?.value.replace(/,/g, "")) || 1_200,
        growth: Number.parseFloat(statsData["30 Days"][1]?.growth.replace("%", "")) || 8,
      },
      Revenue: {
        barData: [
          { month: "Day 1-5", value: 20 },
          { month: "Day 6-10", value: 25 },
          { month: "Day 11-15", value: 22 },
          { month: "Day 16-20", value: 30 },
          { month: "Day 21-25", value: 18 },
          { month: "Day 26-30", value: 25 },
        ],
        revenue: 750_000,
        growth: 10,
      },
    },
    "7 Days": {
      Investments: {
        barData: [
          { month: "Day 1", value: 8 },
          { month: "Day 2", value: 10 },
          { month: "Day 3", value: 7 },
          { month: "Day 4", value: 12 },
          { month: "Day 5", value: 6 },
          { month: "Day 6", value: 9 },
          { month: "Day 7", value: 11 },
        ],
        revenue: Number.parseFloat(statsData["7 Days"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 500_000,
        growth: statsData["7 Days"][0]?.growth
          ? Number.parseFloat(statsData["7 Days"][0].growth.replace("%", ""))
          : 0,
        investmentCount:
          Number.parseInt(statsData["7 Days"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 3,
      },
      Users: {
        barData: [
          { month: "Day 1", value: 50 },
          { month: "Day 2", value: 60 },
          { month: "Day 3", value: 45 },
          { month: "Day 4", value: 70 },
          { month: "Day 5", value: 40 },
          { month: "Day 6", value: 55 },
          { month: "Day 7", value: 65 },
        ],
        revenue: Number.parseInt(statsData["7 Days"][1]?.value.replace(/,/g, "")) || 300,
        growth: Number.parseFloat(statsData["7 Days"][1]?.growth.replace("%", "")) || 5,
      },
      Revenue: {
        barData: [
          { month: "Day 1", value: 10 },
          { month: "Day 2", value: 12 },
          { month: "Day 3", value: 8 },
          { month: "Day 4", value: 15 },
          { month: "Day 5", value: 9 },
          { month: "Day 6", value: 11 },
          { month: "Day 7", value: 13 },
        ],
        revenue: 150_000,
        growth: 5,
      },
    },
    "24 Hour": {
      Investments: {
        barData: [
          { month: "Hour 1-4", value: 3 },
          { month: "Hour 5-8", value: 5 },
          { month: "Hour 9-12", value: 2 },
          { month: "Hour 13-16", value: 4 },
          { month: "Hour 17-20", value: 1 },
          { month: "Hour 21-24", value: 3 },
        ],
        revenue: Number.parseFloat(statsData["24 Hour"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 50_000,
        growth: statsData["24 Hour"][0]?.growth
          ? Number.parseFloat(statsData["24 Hour"][0].growth.replace("%", ""))
          : 0,
        investmentCount:
          Number.parseInt(statsData["24 Hour"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 1,
      },
      Users: {
        barData: [
          { month: "Hour 1-4", value: 10 },
          { month: "Hour 5-8", value: 15 },
          { month: "Hour 9-12", value: 8 },
          { month: "Hour 13-16", value: 12 },
          { month: "Hour 17-20", value: 6 },
          { month: "Hour 21-24", value: 10 },
        ],
        revenue: Number.parseInt(statsData["24 Hour"][1]?.value.replace(/,/g, "")) || 50,
        growth: Number.parseFloat(statsData["24 Hour"][1]?.growth.replace("%", "")) || 2,
      },
      Revenue: {
        barData: [
          { month: "Hour 1-4", value: 5 },
          { month: "Hour 5-8", value: 7 },
          { month: "Hour 9-12", value: 4 },
          { month: "Hour 13-16", value: 6 },
          { month: "Hour 17-20", value: 3 },
          { month: "Hour 21-24", value: 5 },
        ],
        revenue: 20_000,
        growth: 2,
      },
    },
  })

  const profitSplitData = {
    "£100 - £10,000": [
      { label: "Investor", value: 60, color: "#3b82f6" },
      { label: "Trader", value: 30, color: "#10b981" },
      { label: "Company", value: 10, color: "#f59e0b" },
    ],
    "£11,000 - £60,000": [
      { label: "Investor", value: 62.5, color: "#3b82f6" },
      { label: "Trader", value: 30, color: "#10b981" },
      { label: "Company", value: 7.5, color: "#f59e0b" },
    ],
    "£61,000 - £100,000": [
      { label: "Investor", value: 65, color: "#3b82f6" },
      { label: "Trader", value: 30, color: "#10b981" },
      { label: "Company", value: 5, color: "#f59e0b" },
    ],
  }

  useEffect(() => {
    const handleStorageChange = () => {
      const savedYear = localStorage.getItem("selectedYear")
      if (savedYear) {
        setSelectedYear(Number.parseInt(savedYear))
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const getYearlyBarData = () => {
    const currentData = chartData[activeTimeFilter][activeTab]
    if (!currentData.yearlyData) return []
    const years = Object.keys(currentData.yearlyData).sort()
    return years.map((year) => ({
      month: year,
      value: currentData.yearlyData[year].value,
    }))
  }

  const getCurrentDisplayData = () => {
    const currentData = chartData[activeTimeFilter][activeTab]
    if (viewMode === "yearly" && activeTimeFilter === "12 Months") {
      return {
        ...currentData,
        barData: getYearlyBarData(),
      }
    }
    return currentData
  }

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      "12 Months": {
        ...prevChartData["12 Months"],
        Investments: {
          ...prevChartData["12 Months"].Investments,
          revenue: Number.parseFloat(statsData["12 Months"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 23_600_000,
          growth: statsData["12 Months"][0]?.growth
            ? Number.parseFloat(statsData["12 Months"][0].growth.replace("%", ""))
            : 0,
          investmentCount:
            Number.parseInt(statsData["12 Months"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 145,
        },
        Users: {
          ...prevChartData["12 Months"].Users,
          revenue: Number.parseInt(statsData["12 Months"][1]?.value.replace(/,/g, "")) || 12_500,
          growth: Number.parseFloat(statsData["12 Months"][1]?.growth.replace("%", "")) || 12,
        },
      },
      "30 Days": {
        ...prevChartData["30 Days"],
        Investments: {
          ...prevChartData["30 Days"].Investments,
          revenue: Number.parseFloat(statsData["30 Days"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 2_100_000,
          growth: statsData["30 Days"][0]?.growth
            ? Number.parseFloat(statsData["30 Days"][0].growth.replace("%", ""))
            : 0,
          investmentCount:
            Number.parseInt(statsData["30 Days"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 12,
        },
        Users: {
          ...prevChartData["30 Days"].Users,
          revenue: Number.parseInt(statsData["30 Days"][1]?.value.replace(/,/g, "")) || 1_200,
          growth: Number.parseFloat(statsData["30 Days"][1]?.growth.replace("%", "")) || 8,
        },
      },
      "7 Days": {
        ...prevChartData["7 Days"],
        Investments: {
          ...prevChartData["7 Days"].Investments,
          revenue: Number.parseFloat(statsData["7 Days"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 500_000,
          growth: statsData["7 Days"][0]?.growth
            ? Number.parseFloat(statsData["7 Days"][0].growth.replace("%", ""))
            : 0,
          investmentCount:
            Number.parseInt(statsData["7 Days"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 3,
        },
        Users: {
          ...prevChartData["7 Days"].Users,
          revenue: Number.parseInt(statsData["7 Days"][1]?.value.replace(/,/g, "")) || 300,
          growth: Number.parseFloat(statsData["7 Days"][1]?.growth.replace("%", "")) || 5,
        },
      },
      "24 Hour": {
        ...prevChartData["24 Hour"],
        Investments: {
          ...prevChartData["24 Hour"].Investments,
          revenue: Number.parseFloat(statsData["24 Hour"][0]?.value.replace(/[$,M]/g, "")) * 1_000_000 || 50_000,
          growth: statsData["24 Hour"][0]?.growth
            ? Number.parseFloat(statsData["24 Hour"][0].growth.replace("%", ""))
            : 0,
          investmentCount:
            Number.parseInt(statsData["24 Hour"][0]?.subtitle.replace(" Investments", "").replace(",", "")) || 1,
        },
        Users: {
          ...prevChartData["24 Hour"].Users,
          revenue: Number.parseInt(statsData["24 Hour"][1]?.value.replace(/,/g, "")) || 50,
          growth: Number.parseFloat(statsData["24 Hour"][1]?.growth.replace("%", "")) || 2,
        },
      },
    }))
  }, [statsData, activeTimeFilter])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editType, setEditType] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState("")

  const currentData = getCurrentDisplayData()
  const maxValue = Math.max(...currentData.barData.map((d) => d.value))
  const minValue = Math.min(...currentData.barData.map((d) => d.value))
  const chartHeight = 300
  const chartWidth = 600
  const padding = 30
  const xStep = (chartWidth - 2 * padding) / (currentData.barData.length - 1)
  const yRange = maxValue - minValue
  const yScale = (chartHeight - 2 * padding) / (yRange > 0 ? yRange : 1)

  const openDialog = (type, index = null, value = "") => {
    setEditType(type)
    setEditIndex(index)
    setEditValue(value.toString())
    setIsDialogOpen(true)
    setHoverIndex(null) // Hide hover effects when dialog opens
  }

  const handleSave = () => {
    const value = Number(editValue)
    if (isNaN(value)) {
      alert("Please enter a valid number")
      return
    }

    const updatedChartData = { ...chartData }
    const updatedStatsData = { ...statsData }

    if (editType === "bar" && value >= 0) {
      if (viewMode === "yearly" && activeTimeFilter === "12 Months") {
        const year = currentData.barData[editIndex].month
        updatedChartData[activeTimeFilter][activeTab].yearlyData[year].value = value
      } else {
        updatedChartData[activeTimeFilter][activeTab].barData[editIndex].value = value
      }
    } else if (editType === "revenue" && value >= 0) {
      updatedChartData[activeTimeFilter][activeTab].revenue = value
      if (activeTab === "Investments") {
        updatedStatsData[activeTimeFilter][0].value = `$${Math.round(value / 1_000_000)}M`
      } else if (activeTab === "Users") {
        updatedStatsData[activeTimeFilter][1].value = Math.round(value).toLocaleString()
      }
    } else if (editType === "growth" && value >= -100) {
      updatedChartData[activeTimeFilter][activeTab].growth = value
      if (activeTab === "Investments") {
        updatedStatsData[activeTimeFilter][0].growth = `${value >= 0 ? "+" : ""}${value}%`
      } else if (activeTab === "Users") {
        updatedStatsData[activeTimeFilter][1].growth = `${value >= 0 ? "+" : ""}${value}%`
      }
    } else if (editType === "investmentCount" && value >= 0 && activeTab === "Investments") {
      updatedStatsData[activeTimeFilter][0].subtitle = `${Math.round(value).toLocaleString()} Investments`
      updatedChartData[activeTimeFilter][activeTab].investmentCount = value
    } else {
      alert("Invalid value")
      return
    }

    setChartData(updatedChartData)
    setStatsData(updatedStatsData)
    setIsDialogOpen(false)
    setEditValue("")
    setEditType(null)
    setEditIndex(null)
  }

  const Dialog = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          width: "300px",
          textAlign: "center",
          fontFamily: "inherit",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: "16px",
          }}
        >
          Edit{" "}
          {editType === "bar"
            ? `${currentData.barData[editIndex]?.month} Value`
            : editType === "revenue"
              ? "Revenue"
              : editType === "growth"
                ? "Growth"
                : "Investment Count"}
        </h3>
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder={`Enter ${editType}`}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            marginBottom: "16px",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2d6b2d")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "8px 20px",
              background: "#2d6b2d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#4ade80")}
            onMouseOut={(e) => (e.target.style.background = "#2d6b2d")}
          >
            Save
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
            style={{
              padding: "8px 20px",
              background: "#f3f4f6",
              color: "#6b7280",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e5e7eb")}
            onMouseOut={(e) => (e.target.style.background = "#f3f4f6")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )

  const getX = (index) => padding + index * xStep
  const getY = (value) => chartHeight - padding - ((value - minValue) * yScale)

  const generateSmoothPath = () => {
    const points = currentData.barData.map((data, index) => ({
      x: getX(index),
      y: getY(data.value),
    }))
    if (points.length < 2) return ""
    let path = `M ${points[0].x},${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i - 1].x + points[i].x) / 2
      const yc = (points[i - 1].y + points[i].y) / 2
      path += ` Q ${points[i - 1].x},${points[i - 1].y} ${xc},${yc}`
      if (i === points.length - 1) {
        path += ` T ${points[i].x},${points[i].y}`
      }
    }
    return path
  }

  const calculatePieAngles = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    return data.map((item, index, array) => {
      const startAngle = index === 0 ? 0 : array.slice(0, index).reduce((sum, s) => sum + s.value, 0) / total * 360
      const endAngle = startAngle + (item.value / total) * 360
      return {
        ...item,
        percentage: (item.value / total) * 100,
        startAngle,
        endAngle,
      }
    })
  }

  const pieChartData = calculatePieAngles(profitSplitData[selectedBand])

  // Improved hover handlers with debouncing
  const handleDataPointHover = (index, event) => {
    setHoverIndex(index)
    const rect = event.currentTarget.closest('.line-chart-container').getBoundingClientRect()
    setTooltipPosition({
      x: getX(index),
      y: getY(currentData.barData[index].value)
    })
  }

  const handleDataPointLeave = () => {
    setHoverIndex(null)
  }

  return (
    <div className="charts-section">
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-tabs">
            {["Investments", "Users", "Revenue"].map((tab) => (
              <button
                key={tab}
                className={`chart-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTimeFilter === "12 Months" && (
            <div className="chart-controls">
              <div className="view-mode-selector">
                <button
                  className={`view-mode-btn ${viewMode === "monthly" ? "active" : ""}`}
                  onClick={() => setViewMode("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`view-mode-btn ${viewMode === "yearly" ? "active" : ""}`}
                  onClick={() => setViewMode("yearly")}
                >
                  Yearly
                </button>
              </div>

              {viewMode === "monthly" && (
                <div className="year-selector">
                  <label>Year:</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      const newYear = Number.parseInt(e.target.value)
                      setSelectedYear(newYear)
                      localStorage.setItem("selectedYear", newYear.toString())
                    }}
                    className="year-select-small"
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() - 5 + i
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}

              <div className="band-selector">
                <label>Capital Band:</label>
                <select
                  value={selectedBand}
                  onChange={(e) => setSelectedBand(e.target.value)}
                  className="year-select-small"
                >
                  {Object.keys(profitSplitData).map((band) => (
                    <option key={band} value={band}>
                      {band}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="chart-stats">
          <h3
            className="chart-value"
            style={{ cursor: "pointer" }}
            onClick={() => openDialog("revenue", null, currentData.revenue)}
          >
            {activeTab === "Investments"
              ? `$${Math.round(currentData.revenue / 1_000_000)}M`
              : currentData.revenue.toLocaleString()}
          </h3>
          <span
            className="chart-growth"
            style={{ cursor: "pointer" }}
            onClick={() => openDialog("growth", null, currentData.growth)}
          >
            {currentData.growth >= 0 ? "+" : ""}
            {currentData.growth}%
          </span>
          {activeTab === "Investments" && (
            <span
              className="chart-subtitle"
              style={{ cursor: "pointer" }}
              onClick={() => openDialog("investmentCount", null, currentData.investmentCount)}
            >
              {statsData[activeTimeFilter][0]?.subtitle || "0 Investments"}
            </span>
          )}

          {viewMode === "monthly" && activeTimeFilter === "12 Months" && (
            <span className="chart-year-display">{selectedYear}</span>
          )}
        </div>

        <div className="line-chart-container" style={{ position: "relative", height: `${chartHeight}px`, width: `${chartWidth}px` }}>
          <svg width={chartWidth} height={chartHeight}>
            {/* Grid lines */}
            {Array.from({ length: 6 }).map((_, i) => {
              const yValue = minValue + (i * yRange) / 5
              return (
                <line
                  key={i}
                  x1={padding}
                  y1={getY(yValue)}
                  x2={chartWidth - padding}
                  y2={getY(yValue)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              )
            })}
            {/* X-axis */}
            <line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            {/* Y-axis */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={chartHeight - padding}
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            {/* X-axis labels */}
            {currentData.barData.map((data, index) => (
              <text
                key={index}
                x={getX(index)}
                y={chartHeight - padding + 25}
                textAnchor="middle"
                fontSize="14"
                fill="#4b5563"
                fontWeight="500"
              >
                {data.month}
              </text>
            ))}
            {/* Y-axis labels and ticks */}
            {Array.from({ length: 6 }).map((_, i) => {
              const yValue = minValue + (i * yRange) / 5
              return (
                <g key={i}>
                  <text
                    x={padding - 15}
                    y={getY(yValue) + 5}
                    textAnchor="end"
                    fontSize="14"
                    fill="#4b5563"
                    fontWeight="500"
                  >
                    {Math.round(yValue)}
                  </text>
                  <line
                    x1={padding - 5}
                    y1={getY(yValue)}
                    x2={padding + 5}
                    y2={getY(yValue)}
                    stroke="#6b7280"
                    strokeWidth="1.5"
                  />
                </g>
              )
            })}
            {/* Smooth line path with gradient */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#4ade80", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#2d6b2d", stopOpacity: 1 }} />
              </linearGradient>
              <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2"/>
              </filter>
            </defs>
            <path
              d={generateSmoothPath()}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Data points with improved hover areas */}
            {currentData.barData.map((data, index) => (
              <g key={index}>
                {/* Invisible larger circle for better hover detection */}
                <circle
                  cx={getX(index)}
                  cy={getY(data.value)}
                  r="12"
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onClick={() => openDialog("bar", index, data.value)}
                  onMouseEnter={(e) => handleDataPointHover(index, e)}
                  onMouseLeave={handleDataPointLeave}
                />
                {/* Outer glow effect when hovered */}
                {hoverIndex === index && (
                  <circle
                    cx={getX(index)}
                    cy={getY(data.value)}
                    r="10"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2"
                    opacity="0.6"
                    className="pulse-animation"
                  />
                )}
                {/* Main data point */}
                <circle
                  cx={getX(index)}
                  cy={getY(data.value)}
                  r={hoverIndex === index ? "7" : "6"}
                  fill={hoverIndex === index ? "#4ade80" : "#2d6b2d"}
                  stroke="#ffffff"
                  strokeWidth="2"
                  filter={hoverIndex === index ? "url(#dropShadow)" : "none"}
                  style={{ 
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out"
                  }}
                  onClick={() => openDialog("bar", index, data.value)}
                  onMouseEnter={(e) => handleDataPointHover(index, e)}
                  onMouseLeave={handleDataPointLeave}
                />
              </g>
            ))}
          </svg>
          {/* Fixed positioned tooltip */}
          {hoverIndex !== null && (
            <div
              className="chart-tooltip"
              style={{
                position: "absolute",
                top: `${tooltipPosition.y - 60}px`,
                left: `${tooltipPosition.x}px`,
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              <div className="tooltip-content">
                <div className="tooltip-label">{currentData.barData[hoverIndex].month}</div>
                <div className="tooltip-value">{currentData.barData[hoverIndex].value.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="revenue-section">
        <div className="revenue-card">
          <h2
            className="revenue-value"
            style={{ cursor: "pointer" }}
            onClick={() => openDialog("revenue", null, currentData.revenue)}
          >
            {activeTab === "Investments"
              ? `$${Math.round(currentData.revenue / 1_000_000)}M`
              : currentData.revenue.toLocaleString()}
          </h2>
          <p className="revenue-label">{activeTab} Total</p>
          <div className="revenue-growth">
            <span style={{ cursor: "pointer" }} onClick={() => openDialog("growth", null, currentData.growth)}>
              {currentData.growth >= 0 ? "↗" : "↘"} {Math.abs(currentData.growth)}% vs Last{" "}
              {viewMode === "yearly" ? "Year" : activeTimeFilter}
            </span>
          </div>
        </div>
        <div className="pie-chart-card">
          <div className="pie-chart" style={{ position: "relative" }}>
            <svg width="150" height="150">
              <g transform="translate(75, 75)">
                {pieChartData.map((slice, index) => {
                  const startAngle = slice.startAngle
                  const endAngle = slice.endAngle
                  const largeArc = slice.endAngle - startAngle > 180 ? 1 : 0
                  const x1 = 75 * Math.cos((startAngle - 90) * Math.PI / 180)
                  const y1 = 75 * Math.sin((startAngle - 90) * Math.PI / 180)
                  const x2 = 75 * Math.cos((endAngle - 90) * Math.PI / 180)
                  const y2 = 75 * Math.sin((endAngle - 90) * Math.PI / 180)
                  return (
                    <g key={index}>
                      <path
                        d={`M 0 0 L ${x1} ${y1} A 75 75 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={slice.color}
                        onMouseEnter={() => setHoverPieIndex(index)}
                        onMouseLeave={() => setHoverPieIndex(null)}
                      />
                    </g>
                  )
                })}
              </g>
            </svg>
            {hoverPieIndex !== null && (
              <div
                className="chart-tooltip"
                style={{
                  position: "absolute",
                  top: 75 + (50 * Math.sin((pieChartData[hoverPieIndex].startAngle + pieChartData[hoverPieIndex].endAngle) / 2 - 90) * Math.PI / 180) - 30,
                  left: 75 + (50 * Math.cos((pieChartData[hoverPieIndex].startAngle + pieChartData[hoverPieIndex].endAngle) / 2 - 90) * Math.PI / 180) - 40,
                  transform: "translate(-50%, -100%)",
                  pointerEvents: "none",
                }}
              >
                <div className="tooltip-content">
                  <div className="tooltip-label">{pieChartData[hoverPieIndex].label}</div>
                  <div className="tooltip-value">{pieChartData[hoverPieIndex].value}%</div>
                </div>
              </div>
            )}
          </div>
          <div className="pie-legend">
            {pieChartData.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDialogOpen && <Dialog />}
    </div>
  )
}

export default Charts