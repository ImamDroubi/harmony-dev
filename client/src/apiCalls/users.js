import axios from "axios"

export const editUserProfile = (userId, payload)=>{
  return axios.patch(`/users/${userId}`, payload);
}

export const updatePassword = (userId, payload)=>{
  return axios.patch(`/users/password/${userId}`, payload);
}

export const getExtendedUser = (userId)=>{
  return axios.get(`/users/user/extended/${userId}`);
}

export const toggleUserFollow = (userId) =>{
  return axios.post(`/users/followers/${userId}`);
}