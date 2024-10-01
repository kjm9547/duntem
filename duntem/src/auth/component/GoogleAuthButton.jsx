
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import styled from "styled-components";
import { firebaseInitailizer } from "../../firebase"; 
import { useEffect, useState } from "react";
import { useSignFb } from "../../hooks/useSignFb";

const IconButton = styled.button`
  display:flex;
  align-items: center;
  width: 300px;
  height: 70px;
  margin-bottom: 10px;
  border: 0.2px solid #A2A2B6;
  color: white;
`
const IconLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`
export const GoogleAuthButton = () => {
  const {auth} = firebaseInitailizer()
  const [userData,setUserData] = useState()
  const {
    checkFirebaseIdExist,
    insertFirbaseUserInfo} = useSignFb()

  const registUserData = async(data) => {
    if(data.user){
      const result = await checkFirebaseIdExist(data.user.email)
      if(!result){

        insertFirbaseUserInfo(data,"google")
      } else {

      }  
    }
  }
  const handleGoogleLogin = async() => {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      signInWithPopup(auth, provider) // popup을 이용한 signup
        .then((data) => {
          setUserData(data.user); // user data 설정  
          registUserData(data)
        })
        .catch((err) => {
            console.log(err);
        });
        console.log("###")
        
  }
  
    return(
        <IconButton 
          onClick={()=>{handleGoogleLogin()}}>
          <IconLogo src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G"></IconLogo>
          <p>구글을 통한 로그인</p>
          </IconButton>
    )
}