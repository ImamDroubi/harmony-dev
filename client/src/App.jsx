import './App.css'
import AnonymousLayout from './components/screens/anonymous-layout/AnonymousLayout';
import EditProfile from './components/screens/edit-profile/EditProfile';
import MainLayout from './components/screens/main-layout/MainLayout';
import ProtectedRoutes from './components/screens/protected-routes/ProtectedRoutes';
import QuickTry from './components/screens/quick-try/QuickTry';
import SignIn from './components/screens/sign-in/SignIn';
import SignUp from './components/screens/sign-up/SignUp';
import TopbarLayout from './components/screens/topbar-layout/TopbarLayout';
import UserProfile from './components/screens/user-profile/UserProfile';
import Welcome from './components/screens/welcome/Welcome'
import PublicContent from './components/screens/public-content/PublicContent'
import { Routes,Route, Router, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route path='/' element ={<Welcome/>} />
          <Route path='/try' element ={<QuickTry/>} />
          
          <Route path='/*' element={<TopbarLayout/>}>
            <Route path='' element={<AnonymousLayout/>}>
              <Route path='login' element ={<SignIn/>} />
              <Route path='register' element ={<SignUp />}/>
            </Route>
            <Route path='profile/:userId' element ={<UserProfile/>}/>
            <Route path='profile' element ={<EditProfile/>}/>
          </Route>

          <Route path='/*' element ={<MainLayout />}>
            <Route path='user/*' element={<ProtectedRoutes/>}/>
            <Route path='public/:category' element={<PublicContent/>}/>
            
          </Route>
        </Routes>
      </AuthProvider>
  )
}

export default App
