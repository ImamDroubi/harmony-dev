import React, { useEffect, useRef, useState } from 'react'
import "./upload-track.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faUpload} from '@fortawesome/free-solid-svg-icons';
import {useAuth} from "../../../contexts/AuthContext";
import {getFileRef, uploadFileResumable } from '../../../apiCalls/uploadFile';
import {CircularProgress, LinearProgress } from '@mui/material';
import { deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
export default function UploadTrack({openPopup}) {
  const {currentUser} = useAuth()
  const trackName = useRef();
  const trackCategory = useRef();
  const [currentImage, setCurrentImage]= useState();
  const [currentTrack,setCurrentTrack] = useState();
  const [trackUploadRef,setTrackUploadRef] = useState();
  const [taskUploadRef,setTaskUploadRef] = useState();
  const [imageUploadRef,setImageUploadRef] = useState();
  const [imageUrl,setImageUrl] = useState();
  const [trackUrl,setTrackUrl] = useState();
  const [imageUploading, setImageUploading] = useState(false);
  const [trackUploading, setTrackUploading] = useState(false);
  const [trackUploadProgress,setTrackUploadProgress] = useState(0);
  const [trackDuration,setTrackDuration] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(()=>{
    uploadImage();
  },[currentImage])
  useEffect(()=>{
    uploadTrack();
  },[currentTrack])

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

  const uploadTrack = async ()=>{
    if(currentTrack == null){
      return; 
    }
    if(taskUploadRef){
      taskUploadRef.cancel();
    }
    if(trackUploadRef){
      try{
        const res = deleteObject(trackUploadRef);
        setTrackUrl(null);
      }catch(error){
        console.log(error);
      }
    }
    setTrackUploading(true);
    const fileRef = getFileRef(currentTrack,"track",currentUser.id);
    const uploadTask = uploadBytesResumable(fileRef,currentTrack);
    setTaskUploadRef(uploadTask);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setTrackUploadProgress(progress);
    }, 
    (error) => {
      setTrackUploading(false);
      switch (error.code) {
        case 'storage/canceled':
          console.log("Upload Cancelled...");
          break;
        case 'storage/unknown':
          console.log("Something went wrong...");
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setTrackUploadRef(uploadTask.snapshot.ref);
        setTrackUrl(downloadURL);
        setTrackUploading(false);
      });
    }
    );
  }
  useEffect(()=>{
    if(trackUrl == null)return; 
    const audio = document.createElement("audio");
    audio.src = trackUrl; 
    audio.addEventListener("loadedmetadata", ()=>{
      setTrackDuration(audio.duration);
    });
    audio.play().then(()=>{
      audio.pause();
    }).catch(err=>console.log(err));
  },[trackUrl])

  const createTrack = useMutation({
    queryKey: ["tracks"],
    mutationFn : (payload)=>{
      return axios.post(`/tracks`, payload);
    },
    onMutate:(variables)=>{
      
    },
    onError:(error,variables,context)=>{
      console.log(error);
    },
    onSuccess:async (data,variables,context)=>{
      console.log("Created Successfully");
      postSubmission();
    }
  })
  const submit = (e)=>{
    e.preventDefault();
    setFormSubmitting(true);
    if(!trackName.current.value
      || !trackCategory.current.value
      || !trackUrl
      || !trackDuration){
        return; 
      }
    const payload = {
      name : trackName.current.value,
      category : trackCategory.current.value,
      url : trackUrl,
      photoUrl : imageUrl,
      duration : trackDuration
    }
    createTrack.mutate(payload);
  }
  const postSubmission = ()=>{
    setFormSubmitting(false);
    console.log("Track Uploaded Successfully...");
    openPopup(false);
  }

  return (
    <PopupLayout>
      <div className="popup-upload-track">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Upload A New Track</h2>
        </div>
        <form onSubmit={submit} action="">
        <div className="file-field">
            <label>Track: {currentTrack?.name}</label>
            <input onChange={(e)=>setCurrentTrack(e.target.files[0])} type="file" name="file" id="file" accept='audio/*' hidden/>
            <label htmlFor='file' className='upload-track-button'><FontAwesomeIcon icon={faUpload} /> Upload</label>
            {trackUploading&&<LinearProgress value={trackUploadProgress} style={{width:'100%', marginBottom:'0px'}} />}
          </div>
          <div className="form-field">
            <label>Track Name:</label>
            <input ref={trackName} placeholder='Ocean, Birds, etc...' type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input ref={trackCategory} placeholder='Animals, Nature, etc...' type="text" />
          </div>
          <div className="form-field">
            <label>Track Image:</label>
            <div className="photo">
              <input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="image" id="image" accept="image/*"  hidden/>
              {!imageUploading&&<label htmlFor='image'  className='upload-image-button'>Upload</label>}
              <div className="preview">
                <img src={imageUrl || track} alt="" />
                <OverlayDark/>
              </div>
              
              {/* <input type="file" name="" id="" /> */}
            </div>
          </div>
          {imageUploading&&<LinearProgress style={{width:'100%', marginBottom:'0px'}} />}
          {!formSubmitting && <input disabled={
            trackUrl == null 
            || trackName.current.value == null || trackCategory.current.value == null
            || imageUploading || trackUploading
          } type="submit" value="Save Track" />}
          {formSubmitting && <CircularProgress/>}
        </form>
      </div>
    </PopupLayout>
  )
}
