import React, { useEffect, useRef, useState } from 'react'
import "./edit-profile.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons';
import person1 from '../../../assets/images/person1.jpg';
import { useAuth } from '../../../contexts/AuthContext';
import { uploadFileResumable } from '../../../apiCalls/uploadFile';
import { deleteObject, getDownloadURL } from 'firebase/storage';
import { useMutation } from '@tanstack/react-query';
import { editUserProfile, updatePassword } from '../../../apiCalls/users';
import { CircularProgress } from '@mui/material';
export default function EditProfile() {
  const {currentUser} = useAuth();
  const [isPasswordUpdate,setIsPasswordUpdate] = useState(false);
  const [currentImage,setCurrentImage] = useState();
  const [imageUploadRef,setImageUploadRef] = useState();
  const [imageUrl,setImageUrl] = useState(currentUser?.profilePicture);
  const [imageUploading, setImageUploading] = useState(false);
  useEffect(()=>{
    uploadImage();
  },[currentImage])
  const uploadImage = async ()=>{
    if(currentImage == null){
      return; 
    }
    if(imageUploadRef){
      try{
        const res = deleteObject(imageUploadRef);
        setImageUrl(null);
      }catch(error){
        console.log(error);
      }
      
    }
    setImageUploading(true);
    try{
      const response = await uploadFileResumable(currentImage,"image", currentUser.id);
      const url = await getDownloadURL(response.ref);
      setImageUploadRef(response.ref);
      setImageUrl(url);
    }catch(error){
      console.log(error);
    }finally{
      setImageUploading(false);
    }
  }
  useEffect(()=>{
    setImageUrl(currentUser?.profilePicture);
  },[currentUser])
  return (
    <div className='edit-profile'>
      <ContainerWide>
        <div className="card">
          <div className="left">
            <div className="info">
              <div className="picture">
                <img src={imageUrl || person1} />
                {!isPasswordUpdate&&<><input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="profile-picture" id="profile-picture" accept="image/*" hidden />
                {!imageUploading&&<label htmlFor='profile-picture'>Upload</label>}</>}
              </div>
              <h2 className='name'>John Doe</h2>
              <p className='followers'>0 followers</p>
            </div>
          </div>
          <div className="right">
                
                {
                isPasswordUpdate
                ?<UpdatePasswordForm imageUrl={imageUrl} toggle = {setIsPasswordUpdate}/>
                :<PersonalInfoForm imageUrl={imageUrl} toggle={setIsPasswordUpdate}/>
                }
                
              </div>
        </div>
      </ContainerWide>
    </div>
  )
}

const UpdatePasswordForm = ({toggle,imageUrl})=>{
  const {currentUser} = useAuth();
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const repeatPassRef = useRef();
  const [submitable,setSubmitable] = useState(false);
  const [responseMessage,setResponseMessage] = useState();
  const [formSubmitting, setFormSubmitting]= useState();
  const onFormChange = ()=>{
    const oldPass = oldPassRef.current.value;
    const newPass = newPassRef.current.value;
    const repeatPass = repeatPassRef.current.value;
    setResponseMessage(null);
    if(!oldPass || !newPass || !repeatPass  || newPass!==repeatPass){
      setSubmitable(false);
    }else setSubmitable(true);
  }
  const updateTask = useMutation({
    mutationFn : ()=> updatePassword(currentUser?.id,{
      oldPassword : oldPassRef.current.value,
      password : newPassRef.current.value, 
    }),
    onMutate:()=>{
      setFormSubmitting(true);
      setResponseMessage(null);
    },
    onSuccess:()=>{
      const successMessage = "Password updated successfully.";
      setResponseMessage(successMessage);
    },
    onError:(error)=>{
      setResponseMessage(error.response.data.message);
    },
    onSettled:()=>{
      setFormSubmitting(false);
    }
  })
  const checkInputs = ()=>{
    if(newPassRef.current.value !== repeatPassRef.current.value)
    return false; 
    return true;
  }
  const submit = (e)=>{
    e.preventDefault();
    if(!checkInputs()){
      setResponseMessage("New Passwords didn't match!");
      return ;
    }
    updateTask.mutate();
  }
  return (
    <>
      <div className="title">
        <h2>Update Password</h2>
      </div>
      <form onSubmit={submit} onInput={onFormChange} action="">
        <div className="form-field">
          <FontAwesomeIcon icon={faKey} />
          <label>Old Password:</label>
          <input ref={oldPassRef}  type="password" />
        </div>
        <div className="form-field">
          <FontAwesomeIcon icon={faKey} />
          <label>New Password:</label>
          <input ref={newPassRef}  type="password" />
        </div>
        <div className="form-field">
          <FontAwesomeIcon icon={faKey} />
          <label>Repeat New Password:</label>
          <input ref={repeatPassRef}  type="password" />
        </div>
        <p>{responseMessage}</p>
        <a onClick={()=>toggle(false)}>Personal Information</a>
        {!formSubmitting&&<input disabled={!submitable} type="submit" value="Submit" />}
        {formSubmitting&& <CircularProgress/>}
      </form>
    </>
  )
}
const PersonalInfoForm = ({toggle,imageUrl})=>{
  const {currentUser} = useAuth();
  const [username,setUserName] = useState();
  const [email,setEmail] = useState();
  const [oldUsername,setOldUserName] = useState();
  const [oldEmail,setOldEmail] = useState();
  const [changed, setChanged] = useState(false);
  const [responseMessage,setResponseMessage] = useState();
  const [formSubmitting, setFormSubmitting]= useState();
  useEffect(()=>{
    setUserName(currentUser?.username);
    setEmail(currentUser?.email);
    setOldEmail(currentUser?.email);
    setOldUserName(currentUser?.username);

  },[currentUser])

  useEffect(()=>{
    if(username===oldUsername && email ===oldEmail && imageUrl === currentUser?.profilePicture){
      setChanged(false);
    }else setChanged(true);
  },[username,email,imageUrl])

  const updateTask = useMutation({
    mutationFn : ()=> editUserProfile(currentUser?.id,{
      username : username,
      email : email, 
      profilePicture : imageUrl
    }),
    onMutate:()=>{
      setFormSubmitting(true);
      setResponseMessage(null);
    },
    onSuccess:()=>{
      const successMessage = "Info Updated Successfully.";
      setResponseMessage(successMessage);
    },
    onError:(error)=>{
      setResponseMessage(error.response.data.message);
    },
    onSettled:()=>{
      setFormSubmitting(false);
    }
  })

  const submit = (e)=>{
    e.preventDefault();
    updateTask.mutate();
  }
  return (
    <>
      <div className="title">
        <h2>Personal Information</h2>
      </div>
      <form onInput={()=>setResponseMessage(null)} onSubmit={submit} action="">
        <div className="form-field">
          <FontAwesomeIcon icon={faUser} size="sm"/>
          <label>Username:</label>
          <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" />
        </div>
        <div className="form-field">
          <FontAwesomeIcon icon={faEnvelope} />
          <label>Email Address:</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" />
        </div>
        <p>{responseMessage}</p>
        <a onClick={()=>toggle(true)}>Update Password</a>
        {!formSubmitting && <input disabled={!changed} type="submit" value="Submit" />}
        {formSubmitting && <CircularProgress/>}
      </form>
    </>
  )
}