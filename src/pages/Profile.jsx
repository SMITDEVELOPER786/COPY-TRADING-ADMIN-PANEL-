"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import TraderProfile from "./TraderProfile"
import Users from "./Users"
import { getUserById } from "../services/user.service"

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getUserById(id);
        
        // API structure: { status: 'success', message: '...', data: { ...user data... } }
        const userData = response.data || response;
        
        // Transform API data to component format
        const transformedUser = {
          id: userData._id || userData.id,
          _id: userData._id,
          name: userData.username || userData.name || 'N/A',
          email: userData.email || 'N/A',
          phone: userData.phone || '',
          type: userData.role || 'TRADER',
          role: userData.role,
          wallet: userData.wallet || userData.walletAddress || '-',
          market: userData.market || '-',
          broker: userData.broker || '-',
          avatar: userData.profileImage?.url || userData.avatar || userData.profilePicture || 'https://via.placeholder.com/40',
          amountSecured: userData.amountSecured || '$0',
          netProfit: userData.netProfit || '$0',
          avgROI: userData.avgROI || '0%',
          avgDrawdown: userData.avgDrawdown || '0%',
          tag: userData.kycStatus === 'APPROVED' ? 'Profitable' : 
               userData.kycStatus === 'PENDING' ? 'Average' : 
               userData.isFrozen ? 'Unprofitable' : 'Profitable',
          tagColor: userData.kycStatus === 'APPROVED' ? 'green' : 
                    userData.kycStatus === 'PENDING' ? 'orange' : 
                    userData.isFrozen ? 'red' : 'green',
          kycStatus: userData.kycStatus,
          isFrozen: userData.isFrozen,
          userType: userData.role === 'TRADER' ? 'Trader' : userData.role === 'INVESTOR' ? 'Investor' : 'Trader',
          // Include all other fields that TraderProfile might need
          ...userData
        };
        
        setUser(transformedUser);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message || 'Failed to fetch user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id])

  if (isLoading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading profile...</div>
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>Error: {error}</div>
  }

  if (!user) {
    return <p style={{ padding: "20px" }}>User not found</p>
  }

  return user.userType === "Trader" || user.role === "TRADER" ? <TraderProfile user={user} /> : user.userType === "Investor" || user.role === "INVESTOR" ? <Users /> : <TraderProfile user={user} />
}

export default Profile
