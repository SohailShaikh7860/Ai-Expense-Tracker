import { useState } from 'react'
import './App.css'
import Header from './Components/Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-stone-100 min-h-screen w-full'>
      <div>

      <Header />
      </div>
    </div>
    </>
  )
}
export default App