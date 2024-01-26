import axios from "axios"
export const getUserResources = async ({queryKey})=>{
  const type = queryKey[0];
  const userId = queryKey[1]; 
  return await axios.get(`/${type}/user/${userId}`);
}

export const getSpecificTracks = async(mixingTracks)=>{
  let query = "";
  mixingTracks.forEach(track=>{
    query+= `tracksIds[]=${track.id}&`; 
  })
  try{
    return axios.get(`/tracks/multiple?${query}`);
  }catch(err){
    throw new Error(err);
  }
}

export const publishUserResource = async(type,resourceId)=>{
  return await axios.patch(`/${type}/${resourceId}`, {
    isPublic : true
  });
}
export const unpublishUserResource = async(type,resourceId)=>{
  return await axios.patch(`/${type}/${resourceId}`, {
    isPublic : false
  });
}

export const toggleLikeResource = async(type,resourceId)=>{
  return await axios.post(`/likes/${type}/${resourceId}`)
}

export const deleteUserResource = async(type,resourceId)=>{
  return await axios.delete(`/${type}/${resourceId}`);
}

export const getPublicUserResource = async(type,userId)=>{
  return await axios.get(`/${type}/public/user/${userId}`);
}

export const  getPublicResourceByCategory = async(type,category)=>{
  return axios.get(`/${type}/public/${category}`);
}

export const updateResource = async(type,resourceId,payload)=>{
  return await axios.patch(`/${type}/${resourceId}`, payload);
}

export const cloneResource = async (type, resourceId)=>{
  return axios.post(`/${type}/clone/${resourceId}`);
}