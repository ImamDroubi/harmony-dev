import React, { useEffect, useState } from 'react'
import "./edit-combination.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { deleteObject, getDownloadURL } from 'firebase/storage';
import { uploadFileResumable } from '../../../apiCalls/uploadFile';
import { useAuth } from '../../../contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { updateResource } from '../../../apiCalls/resources';
import { CircularProgress } from '@mui/material';
export default function EditCombination({openPopup,combination}) {
  const {currentUser} = useAuth();
  const [currentName,setCurrentName] = useState();
  const [currentCategory,setCurrentCategory] = useState();
  const [currentImage,setCurrentImage] = useState();
  const [currentDescription,setCurrentDescription] = useState();
  const [imageUploadRef,setImageUploadRef] = useState();
  const [imageUrl,setImageUrl] = useState();
  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting,setFormSubmitting] = useState(false);
  
  useEffect(()=>{
    setCurrentName(combination?.name);
    setCurrentCategory(combination?.category);
    setCurrentImage(combination?.photo);
    setCurrentDescription(combination?.description);
    setImageUrl(combination.photoUrl);
  },[combination]);

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
    mutationKey : ["combinations"],
    mutationFn : ()=>updateResource("combinations", combination.id,{
      name: currentName || undefined,
      category : currentCategory || undefined,
      photoUrl : imageUrl || undefined,
      description : currentDescription || undefined
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
      <div className="popup-save-combination">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Save Combination</h2>
        </div>
        <form onSubmit={handleUpdate} action="">
          <div className="form-field">
            <label>Combination Name:</label>
            <input onChange={(e)=>setCurrentName(e.target.value)} value={currentName} type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input onChange={(e)=>setCurrentCategory(e.target.value)} value={currentCategory} type="text" />
          </div>
          <div className="row-fields">
            <div className="form-field">
              <label>Descrption:</label>
              <textarea onChange={(e)=>setCurrentDescription(e.target.value)} value={currentDescription} name="" id=""></textarea>
              
            </div>
            <div className="form-field">
              <label>Combination Image:</label>
              <div className="photo">
                <input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="combination-image" id="combination-image" hidden/>
                {!imageUploading&&<label className='combination-image-upload' htmlFor='combination-image'>Upload</label>}
                <div className="preview">
                  <img src={imageUrl || combination.photoUrl} alt="" />
                  <OverlayDark/>
                </div>
                
              </div>
            </div>
          </div>
          
          {!formSubmitting && <input disabled={
            currentName === combination.name 
            && currentCategory === combination.category
            && currentDescription === combination.description
            && imageUrl === combination.photoUrl
            } type="submit" value="Save Combination" />}
          {formSubmitting && <CircularProgress/>}
        </form>
      </div>
    </PopupLayout>
  )
}
