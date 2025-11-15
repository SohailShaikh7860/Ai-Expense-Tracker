import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  
  const stats = {
    totalTrips: 45,
    totalIncome: 432500,
    totalExpenses: 287300,
    netProfit: 145200,
    pendingAmount: 85000
  }

  const recentTrips = [
    { id: 1, vehicle: 'MH48B7830', route: 'Sakur-Takli', date: '2025-11-10', income: 9625, status: 'completed' },
    { id: 2, vehicle: 'MH12C4567', route: 'Mumbai-Pune', date: '2025-11-09', income: 15000, status: 'completed' },
    { id: 3, vehicle: 'MH48B7830', route: 'Nasik-Dhule', date: '2025-11-08', income: 12500, status: 'pending' },
  ]

  return (
    <div className='min-h-screen bg-stone-100 p-4 md:p-8'>
      
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl md:text-5xl font-black uppercase tracking-tight border-b-4 border-black inline-block pb-2 bg-yellow-400 px-4 transform -rotate-1'>
            Dashboard
          </h1>
          <p className='mt-3 font-bold uppercase text-sm tracking-tight'>
            Welcome back, Transport Owner
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/add-trip')}
          className='bg-black text-yellow-400 font-black text-lg uppercase py-3 px-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all select-none'
        >
          + Add Trip
        </button>
      </div>

     
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
        
        <div className='bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <p className='text-xs font-black uppercase tracking-wider mb-2'>Total Trips</p>
          <p className='text-3xl font-black'>{stats.totalTrips}</p>
        </div>

        
        <div className='bg-green-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <p className='text-xs font-black uppercase tracking-wider mb-2'>Total Income</p>
          <p className='text-2xl font-black'>₹{stats.totalIncome.toLocaleString('en-IN')}</p>
        </div>

        
        <div className='bg-red-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <p className='text-xs font-black uppercase tracking-wider mb-2'>Total Expenses</p>
          <p className='text-2xl font-black'>₹{stats.totalExpenses.toLocaleString('en-IN')}</p>
        </div>

        
        <div className='bg-yellow-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1'>
          <p className='text-xs font-black uppercase tracking-wider mb-2'>Net Profit</p>
          <p className='text-2xl font-black'>₹{stats.netProfit.toLocaleString('en-IN')}</p>
        </div>

        
        <div className='bg-orange-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <p className='text-xs font-black uppercase tracking-wider mb-2'>Pending</p>
          <p className='text-2xl font-black'>₹{stats.pendingAmount.toLocaleString('en-IN')}</p>
        </div>
      </div>

     
      <div className='flex flex-wrap gap-2 mb-6 border-b-4 border-black pb-4'>
        <button 
          onClick={() => setActiveTab('overview')}
          className={`font-black text-sm md:text-base uppercase py-2 px-4 border-4 border-black transition-all ${
            activeTab === 'overview' 
              ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white hover:bg-yellow-400'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('trips')}
          className={`font-black text-sm md:text-base uppercase py-2 px-4 border-4 border-black transition-all ${
            activeTab === 'trips' 
              ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white hover:bg-yellow-400'
          }`}
        >
          All Trips
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`font-black text-sm md:text-base uppercase py-2 px-4 border-4 border-black transition-all ${
            activeTab === 'reports' 
              ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white hover:bg-yellow-400'
          }`}
        >
          Reports
        </button>
      </div>

      
      <div className='bg-white border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
        <div className='bg-yellow-400 border-b-4 border-black p-4'>
          <h2 className='text-xl md:text-2xl font-black uppercase tracking-tight'>
            Recent Trips
          </h2>
        </div>

        
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-black text-yellow-400'>
              <tr>
                <th className='text-left p-4 font-black uppercase text-sm border-r-4 border-white'>Vehicle</th>
                <th className='text-left p-4 font-black uppercase text-sm border-r-4 border-white'>Route</th>
                <th className='text-left p-4 font-black uppercase text-sm border-r-4 border-white'>Date</th>
                <th className='text-left p-4 font-black uppercase text-sm border-r-4 border-white'>Income</th>
                <th className='text-left p-4 font-black uppercase text-sm border-r-4 border-white'>Status</th>
                <th className='text-left p-4 font-black uppercase text-sm'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip, index) => (
                <tr key={trip.id} className={`border-t-4 border-black ${index % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
                  <td className='p-4 font-bold'>{trip.vehicle}</td>
                  <td className='p-4 font-bold'>{trip.route}</td>
                  <td className='p-4 font-bold'>{new Date(trip.date).toLocaleDateString('en-IN')}</td>
                  <td className='p-4 font-black text-green-600'>₹{trip.income.toLocaleString('en-IN')}</td>
                  <td className='p-4'>
                    <span className={`font-black uppercase text-xs px-3 py-1 border-2 border-black ${
                      trip.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'
                    }`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className='p-4'>
                    <button className='bg-yellow-400 border-2 border-black px-3 py-1 font-bold text-xs uppercase hover:bg-black hover:text-yellow-400 transition-colors'>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className='md:hidden'>
          {recentTrips.map((trip) => (
            <div key={trip.id} className='border-t-4 border-black p-4 bg-white'>
              <div className='flex justify-between items-start mb-2'>
                <div>
                  <p className='font-black text-lg'>{trip.vehicle}</p>
                  <p className='font-bold text-sm text-gray-600'>{trip.route}</p>
                </div>
                <span className={`font-black uppercase text-xs px-3 py-1 border-2 border-black ${
                  trip.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'
                }`}>
                  {trip.status}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-xs font-bold uppercase text-gray-600'>Income</p>
                  <p className='font-black text-xl text-green-600'>₹{trip.income.toLocaleString('en-IN')}</p>
                </div>
                <button className='bg-yellow-400 border-2 border-black px-4 py-2 font-bold text-sm uppercase hover:bg-black hover:text-yellow-400 transition-colors'>
                  View
                </button>
              </div>
              <p className='text-xs font-bold text-gray-500 mt-2'>{new Date(trip.date).toLocaleDateString('en-IN')}</p>
            </div>
          ))}
        </div>

        <div className='border-t-4 border-black p-4 bg-stone-50 text-center'>
          <button className='font-black uppercase text-sm underline decoration-4 decoration-black hover:text-yellow-600 transition-colors'>
            View All Trips →
          </button>
        </div>
      </div>

      
      <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <button className='bg-white border-4 border-black p-6 font-black uppercase text-left hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'>
          <span className='text-3xl block mb-2'>📊</span>
          Generate Report
        </button>
        <button className='bg-white border-4 border-black p-6 font-black uppercase text-left hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'>
          <span className='text-3xl block mb-2'>🚚</span>
          Manage Vehicles
        </button>
        <button className='bg-white border-4 border-black p-6 font-black uppercase text-left hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'>
          <span className='text-3xl block mb-2'>⚙️</span>
          Settings
        </button>
      </div>
    </div>
  )
}

export default Dashboard