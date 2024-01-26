import React, { useEffect, useRef, useState } from 'react'
import "./sign-in.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import person1 from "../../../assets/images/person1_small.jpg";
import OverlayDark from '../../overlays/black/OverlayDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { signInCall } from '../../../apiCalls/authentication';

export default function SignIn() {
  // redirect if logged in 
  const {login,currentUser} = useAuth();
  const [authenticationError, setAuthenticationError] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submit = async(e)=>{
    e.preventDefault();

    const payload = {
      email : emailRef.current.value,
      password : passwordRef.current.value,
    }
    const {error, result} = await signInCall(payload);
    if(error){
      setAuthenticationError(error);
    }else{
      login(result);
      navigate("/");
    }
  }

  return (
    <div className='sign-in'>
      {/* <Topbar showAuth = {false}/> */}
        <ContainerWide>
          {/* <ButtonBack/> */}
          <div className="content">
            <div className="form-container">
              <div className="left">
                  <div className="title">
                    <h2>Sign In</h2>
                  </div>
                  <form onSubmit={async(e)=>submit(e)}>
                    <div className="form-field">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <label>Email Address:</label>
                      <input onChange={()=>setAuthenticationError(undefined)} ref={emailRef} required type="email" />
                    </div>
                    <div className="form-field">
                      <FontAwesomeIcon icon={faKey} />
                      <label>Password:</label>
                      <input onChange={()=>setAuthenticationError(undefined)} ref={passwordRef} required type="password" />
                    </div>
                    <p className="error">{authenticationError}</p>
                    <input type="submit" value="Sign in" />
                  </form>
                  <p>Need an account? <span><Link to={"/register"}>Sign up</Link></span></p>
              </div>
              <div className="right" style={{backgroundImage : `url(${person1}`}}>
                <OverlayDark />
              </div>
            </div>
          </div>
        </ContainerWide>
    </div>
  )
}
