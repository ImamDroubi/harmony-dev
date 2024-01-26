import React, { useEffect, useRef, useState } from 'react'
import "./sign-up.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import person2 from "../../../assets/images/person2.jpg";
import OverlayDark from '../../overlays/black/OverlayDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { signUpCall, verifyData } from '../../../apiCalls/authentication';
import { useAuth } from '../../../contexts/AuthContext';
export default function SignUp() {
  const {login,currentUser} = useAuth();
  // redirect if logged in 
  const [usernameError, setUsernameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [repeatPasswordError, setRepeatPasswordError] = useState();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const navigate = useNavigate();

  const submit = async(e)=>{
    e.preventDefault();
    const payload = {
      username : usernameRef.current.value,
      email : emailRef.current.value,
      password : passwordRef.current.value,
      repeatPassword : repeatPasswordRef.current.value,
    }
    const test = verifyData(payload);
    if(!test.valid){
      setUsernameError(test.errors[0]);
      setEmailError(test.errors[1]);
      setPasswordError(test.errors[2]);
      setRepeatPasswordError(test.errors[3]);
      return ;
    }

    const {error, result} = await signUpCall(test.data);
    if(error){
      console.log(error);
    }else{
      login(result);
      navigate("/");
    }
  }
  return (
    <div className='sign-up'>
      {/* <Topbar showAuth = {false}/> */}
        <ContainerWide>
          {/* <ButtonBack/> */}
          <div className="content">
            <div className="form-container">
              <div className="left" style={{backgroundImage : `url(${person2}`}}>
                <OverlayDark />
              </div>
              <div className="right">
                <div className="title">
                  <h2>Sign Up</h2>
                </div>
                <form onSubmit={async(e)=>submit(e)}>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faUser} size="sm"/>
                    <label>Username:</label>
                    <input onChange={()=>setUsernameError(undefined)} ref={usernameRef} type="text" />
                    <p className="error">{usernameError}</p>
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <label>Email Address:</label>
                    <input onChange={()=>setEmailError(undefined)} ref={emailRef} type="email" />
                    <p className="error">{emailError}</p>
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faKey} />
                    <label>Password:</label>
                    <input onChange={()=>setPasswordError(undefined)} ref={passwordRef} type="password" />
                    <p className="error">{passwordError}</p>
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faKey} />
                    <label>Repeat Password:</label>
                    <input onChange={()=>setRepeatPasswordError(undefined)} ref={repeatPasswordRef} type="password" />
                    <p className="error">{repeatPasswordError}</p>
                  </div>
                  <input type="submit" value="Sign up" />
                </form>
                <p>Already have an account? <span><Link to={"/login"}>Sign in</Link></span></p>
              </div>
            </div>
          </div>
        </ContainerWide>
    </div>
  )
}
