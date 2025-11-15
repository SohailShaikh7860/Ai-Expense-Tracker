import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const ProtectedRoute = ({children}) => {
    const {isAuthenticated,loading}=useAuth();

    if(loading){
        return(
            <div className='min-h-screen bg-stone-100 flex items-center justify-center'>
        <div className='border-8 border-black bg-yellow-400 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
          <p className='text-2xl font-black uppercase tracking-tight'>Loading...</p>
        </div>
      </div>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
  return children;
}

export default ProtectedRoute
