"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import TraderProfile from "./TraderProfile"
import Users from "./Users"

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedData = localStorage.getItem("tableData")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      const allUsers = [...parsed["Top Investors"], ...parsed["Top Traders"], ...parsed["Awaiting Approvals"]]
      const found = allUsers.find((u) => u.id.toString() === id)
      setUser(found || null)
    }
  }, [id])

  if (!user) {
    return <p style={{ padding: "20px" }}>User not found</p>
  }

  return user.userType === "Trader" ? <TraderProfile user={user} /> : user.userType === "Investor" ? <Users /> : null
}

export default Profile
