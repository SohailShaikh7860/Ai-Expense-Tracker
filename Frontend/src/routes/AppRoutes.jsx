
import { Routes, Route } from 'react-router-dom'
import { Login, Home,Dashboard,ForgotPage } from '../pages/pages.js';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
