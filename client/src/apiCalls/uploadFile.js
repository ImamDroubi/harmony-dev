import { v4 as uuidv4 } from 'uuid';
import {storage} from "../storage/firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
export const uploadFileResumable= async(file, type, userId)=>{
  if(!file || !userId || !type)return ;
  const uniqueId = uuidv4();
  const fileName = `${type}_${uniqueId}_${file.name}` ;
  const folderName = `user_${userId}/${type}s`;
  const fileRef = ref(storage, `${folderName}/${fileName}`);
  return uploadBytesResumable(fileRef, file);
  // try{
  //   const response = await uploadBytes(fileRef,file); 
  //   const url = await getDownloadURL(response.ref);
  //   console.log(url);
  // }catch(error){
  //   console.log(error);
  // }
}
export const getFileRef= (file,type,userId)=>{
  if(!file || !userId || !type)return ;
  const uniqueId = uuidv4();
  const fileName = `${type}_${uniqueId}_${file.name}` ;
  const folderName = `user_${userId}/${type}s`;
  const fileRef = ref(storage, `${folderName}/${fileName}`);
  return fileRef;
}
export const uploadTrackWithImage= async(track, image, userId)=>{
  if(!track || !image || !userId)return ;
  const uniqueId = uuidv4();
  const trackName = `sound_${uniqueId}_${file.name}` ;
  const imageName = `image_${uniqueId}_${file.name}` ;
  const folderName = `user_${userId}/${type}s`;
  const fileRef = ref(storage, `${folderName}/${fileName}`);
  console.log("Attepting to upload.");
  try{
    const response = await uploadBytes(fileRef,file); 
    const url = await getDownloadURL(response.ref);
    console.log(url);
  }catch(error){
    console.log(error);
  }
}