import React, { useEffect, useState } from 'react'
import "./edit-track.scss";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faUpload} from '@fortawesome/free-solid-svg-icons';
import OverlayDark from '../../overlays/black/OverlayDark';
import {uploadFileResumable } from '../../../apiCalls/uploadFile';
import {CircularProgress, LinearProgress } from '@mui/material';
import { getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../../contexts/AuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateResource } from '../../../apiCalls/resources';
export default function EditTrack({openPopup,track}) {
  const {currentUser} = useAuth();
  const [currentImage, setCurrentImage]= useState();
  const [currentName, setCurrentName] = useState();
  const [currentCategory,setCurrentCategory] = useState();
  const [imageUploadRef,setImageUploadRef] = useState();
  const [imageUrl,setImageUrl] = useState(track.photoUrl);
  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting,setFormSubmitting] = useState(false);
  const handleNameChange = (e)=>{
    setCurrentName(e.target.value);
  }
  const handleCategoryChange = (e)=>{
    setCurrentCategory(e.target.value);
  }

  useEffect(()=>{
    setCurrentName(track?.name);
    setCurrentCategory(track?.category);
  },[track])

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
    setFormSubmitting(true);
    try{
      const response = await uploadFileResumable(currentImage,"image", currentUser.id);
      const url = await getDownloadURL(response.ref);
      setImageUploadRef(response.ref);
      setImageUrl(url);
    }catch(error){
      console.log(error);
    }finally{
      setImageUploading(false);
      setFormSubmitting(false);
    }
  }
  const updateTask = useMutation({
    mutationKey : ["tracks"],
    mutationFn : ()=>updateResource("tracks", track.id,{
      name: currentName || undefined,
      category : currentCategory || undefined,
      photoUrl : imageUrl || undefined
    }),
    onSuccess : ()=>{
      openPopup(false);
    },
    onError:(error)=>{
      console.log(error);
      setFormSubmitting(false);
    }
  })
  const handleUpdate = (e)=>{
    e.preventDefault();
    setFormSubmitting(true);
    updateTask.mutate();
  }

  return (
    <PopupLayout>
      <div className="popup-upload-track">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Edit Track</h2>
        </div>
        <form onSubmit={(e)=>handleUpdate(e)} action="">
          <div className="form-field">
            <label>Track Name:</label>
            <input onChange={(e)=>handleNameChange(e)} value={currentName} type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input onChange={(e)=>handleCategoryChange(e)} value={currentCategory} type="text" />
          </div>
          <div className="form-field">
            <label>Track Image:</label>
            <div className="photo">
              <input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="image" id="image" accept="image/*"  hidden/>
              {!imageUploading&&<label htmlFor='image'  className='upload-image-button'>Upload</label>}
              <div className="preview">
                <img src={imageUrl || track?.photoUrl} alt="" />
                <OverlayDark/>
              </div>
              
              {/* <input type="file" name="" id="" /> */}
            </div>
          </div>
          {!formSubmitting&&<input 
          disabled={
            currentName === track?.name
            && currentCategory === track?.category
            && imageUrl === track?.photoUrl
          } type="submit" value="Save Track" />}
          {formSubmitting && <CircularProgress/>}
        </form>
      </div>
    </PopupLayout>
  )
}
