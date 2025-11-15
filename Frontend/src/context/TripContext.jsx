import React, {createContext,useContext, useState, useEffect, Children} from 'react'
import axios from '../config/Axios';

const TripContext = createContext();


export const TripProvider = ({children}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTrip = async(tripData)=>{
       try {
          const response = await axios.post('/trip/trip-expense', tripData);
          setTrips([response.data.tripExpense, ...trips]);
          setLoading(false);
          return { success: true, data: response.data };
       } catch (error) {
          console.log("Error",error);
          setLoading(false);
          return { success: false, message: error.response?.data?.message || 'Failed to add trip' };
       }
  }

  const value = {
    trips,
    setTrips,
    loading,
    setLoading,
    addTrip
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


