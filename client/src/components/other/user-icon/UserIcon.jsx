import React, { useEffect, useState } from 'react'
import "./user-icon.scss";
import userImage from "../../../assets/images/person1.jpg";
import MenuDropdown from '../../menus/dropdown/MenuDropdown';
import { useAuth } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function UserIcon() {
  const {currentUser:user} = useAuth();
  const [menuOpen,setMenuOpen] = useState(false);
  const {logout} = useAuth();
  const handleMenu = ()=>{
    setMenuOpen((prev)=>!prev);
  }

  const handleLogout = ()=>{
    logout();
  }
  return (
    <div className='user-icon'>
      <p>{user.username}</p>
      <img src={user.profilePicture || userImage} onClick={handleMenu}/>
      {menuOpen && 
        <MenuDropdown list={[
          <Link to={'/profile'}><FontAwesomeIcon icon={faUser} size="sm" style={{color: "#5dbcbc",}} />Profile Page</Link>,
          <a onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" size="sm" style={{color: "#5dbcbc",}} />Logout</a>
        ]} />
      }
    </div>
  )
}
