import React from 'react'
import "./topbar.scss"
import Logo from '../logo/Logo'
import UserIcon from '../user-icon/UserIcon'
import ContainerWide from '../../containers/container-wide/ContainerWide'
import { useAuth } from '../../../contexts/AuthContext'
import AuthButtons from '../auth-buttons/AuthButtons'
export default function Topbar({showAuth = true}) {
  const {currentUser} = useAuth();
  return (
    <div className='topbar'>
      <ContainerWide>
        <Logo/>
        {showAuth &&(
          currentUser? 
          <UserIcon user={currentUser}/>
          :
          <AuthButtons/>
        )}
        
      </ContainerWide>
    </div>
  )
}
