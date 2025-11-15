import React, {createContext, useContext, useState} from 'react'
import axios from '../config/Axios';

const TripContext = createContext();

export const TripProvider = ({children}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripStats, setTripStats] = useState({
    totalTrips: 0,
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    pendingAmount: 0
  });

  const addTrip = async(tripData)=>{
       try {
          setLoading(true);
          const response = await axios.post('/trip/trip-expense', tripData);
          setTrips([response.data.tripExpense, ...trips]);
          return { success: true, data: response.data };
       } catch (error) {
          console.error("Add trip error:", error);
          return { success: false, message: error.response?.data?.message || 'Failed to add trip' };
       } finally {
          setLoading(false);
       }
  }

  const fetchTrips = async()=>{
    try {
      setLoading(true);
      const response = await axios.get('/trip/trip-expenses');
      setTrips(response.data.trips);
      calculateStats(response.data.trips);
    } catch (error) {
      console.error('Fetching trip error', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  }

  // Calculate statistics from trips data
const calculateStats = (tripsData) => {
  const totalTrips = tripsData.length;
  
  const totalIncome = tripsData.reduce((sum, trip) => sum + (trip.totalIncome || 0), 0);
  
  const totalExpenses = tripsData.reduce((sum, trip) => {
    const expense = 
      (trip.fuelCost || 0) +
      (trip.hamaali || 0) +
      (trip.paidTransport || 0) +
      (trip.maintenanceCost || 0) +
      (trip.otherExpenses || 0) +
      (trip.commission || 0) +
      (trip.driverAllowance?.paid || 0);
    return sum + expense;
  }, 0);
  
  const netProfit = tripsData.reduce((sum, trip) => sum + (trip.netProfit || 0), 0);
  
  const pendingAmount = tripsData.reduce((sum, trip) => {
    if (trip.paymentStatus === 'Pending') {
      return sum + (trip.pendingAmount || 0);
    }
    return sum;
  }, 0);

  setTripStats({
    totalTrips,
    totalIncome,
    totalExpenses,
    netProfit,
    pendingAmount
  });
};

  const value = {
    trips,
    setTrips,
    loading,
    setLoading,
    addTrip,
    fetchTrips,
    tripStats
  }

  return (
    <TripContext.Provider value={value}>{children}</TripContext.Provider>
  )
    
}

export const useTrip = ()=>{
    const context = useContext(TripContext);
    if(!context){
        throw new Error("useTrip must be used within a TripProvider");
    }
    return context;
}


