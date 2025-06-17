
import ProtectedRoute from './components/ProtectedRoute'
import useAuthOnLoad from './services/useAuthonLoad'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/LoginForm'
import useAuthStore from './services/useAuthStore'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout.jsx/Layout'
import SubscriptionsTable from './pages/SubscriptionTable'

import AdminRoutes from './components/AdminRoutes'
import UsersTable from './pages/UsersTable'
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader'
import Notifications from './pages/Notifications'

import ContentNotFound from './pages/NotFound'
import AuditLogs from './pages/AuditLogs'
import Settings from './pages/Settings'

import ForgotPassword from './pages/ForgetPassword'

import ResetPassword from './pages/ResetPassword'

import UnauthorizedPage from './pages/NotAuthorized'

function App() {
   
  return(
    <>
    <Toaster position='top-center' />
    
    <Routes>
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
      <Route path='forget-password' element={<ForgotPassword/>} />
      <Route path='reset-password' element={<ResetPassword/>} />
      <Route path='unauthorized' element={<UnauthorizedPage/>} />
      

      <Route path='*' element={<AdminRoutes/>}>
        <Route path='dashboard' element={<Layout />}>
        <Route path='users' element={<UsersTable/>} />
        <Route path='subscriptions' element={<SubscriptionsTable/>}/>
        <Route path='notifications' element={<Notifications/>}/>
        <Route path='auditlogs' element={<AuditLogs/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='' element={<Dashboard/>}/>
        <Route path='*' element={<ContentNotFound/>}/>
        </Route>
      </Route>
    
    </Routes>
    </>

  )
}

export default App
