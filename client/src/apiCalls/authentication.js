import axios from "axios";

const USERNAME_PATTERN = /^(?=(?:.*[a-zA-Z]){4})[a-zA-Z0-9_]{4,20}$/ ; // min 4 letter (lower or upper), numbers, underscores 
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])[a-zA-Z0-9_-]{8,20}$/ ; // min 8 characters, min 1 uppercase 


export const signUpCall = async(payload)=>{
  const returnValue = {
    error : undefined,
    result : undefined
  };
  try{
    const response = await axios.post("/auth/register", payload);
    returnValue.result = response.data; 
  }catch(error){
    returnValue.error = error;
  }
  return returnValue;
}

export const signInCall = async(payload)=>{
  const returnValue = {
    error : undefined,
    result : undefined
  };
  try{
    const response = await axios.post("/auth/login", payload);
    returnValue.result = response.data; 
  }catch(error){
    const {response} = error; 
    returnValue.error = response.data.message;
  }
  return returnValue;
}

export const verifyData = (data) => {
  const {username, email, password, repeatPassword} = data; 
  let errors = [] ;
  // Username 
  if(!USERNAME_PATTERN.test(username)){
    let message= "Username is invalid.";
    if(!username){
      message = "Username is required.";
    }else if (username.length < 4){
      message = "Username is too short.";
    }else if (username.length > 20){
      message = "Username is too long.";
    }else {
      message = "Username should only contain letters, numbers or underscores.";
      let digitsArr = username.match(/\d+/g);
      if(digitsArr) {
        const numberOfDigits =  digitsArr.join("").length;
        console.log(numberOfDigits);
        if(username.length - numberOfDigits <4){
          message = "Username should contain at least 4 alphapet characters. "
        }
      }
    }
    errors[0]= message;
  }

  // Email 
  if(!EMAIL_PATTERN.test(email)){
    let message= "Email isn't valid.";
    if(!email){
      message = "Email is required.";
    }
    errors[1] = message;
  }

  // Password 
  if(!PASSWORD_PATTERN.test(password)){
    let message= "Password is invalid.";
    if(!password){
      message = "Password is required.";
    }else if (password.length < 4){
      message = "Password is too short.";
    }else if (password.length > 20){
      message = "Password is too long.";
    }else {
      message = "Password should contain at least one uppercase letter.";
    }
    errors[2] = message;
  }

  if(repeatPassword !== password){
    let message = "Passwords didn't match.";
    errors[3] = message;
  }

  const returnVaue = {
    valid : errors.length > 0 ? false : true,
    data : {
      username,
      email,
      password,
      repeatPassword
    },
    errors : errors
  };

  return returnVaue;
}
