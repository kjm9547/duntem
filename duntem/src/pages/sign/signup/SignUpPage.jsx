import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { firebaseInitailizer } from "../../../firebase"
import {addDoc,collection,query,where,getDocs} from 'firebase/firestore'
const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-image: url(assets/img/mainBackgroundImg.jpg);
    background-size: cover;  
    background-position: center ;
    background-repeat: no-repeat;
    z-index:0;
    color: white;
`
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0.2;
    height: 30vh;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
`
const InputUserText = styled.input`
    width: 300px;
    height: 35px;
    border-radius: 10px;
    margin-bottom: 10px;
    border: 0.1px solid #d9d9d990;
`
const LoginButon = styled.button`
    width: 300px;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    background-color: #5A5AFD;  
    margin-top  : 25px;
`
export const SignUnPage = () => {

    const [userInputIdText,setUserInputIdText ] = useState('')
    const [userInputPwText,setUserInputPwText ] = useState('')
    const [userInputCheckPwText,setUserInputCheckPwText ] = useState('')
    const [isSamePwText,setIsSamePwText] = useState(false)
    const {db}=firebaseInitailizer()
    useEffect(()=>{
        if(userInputCheckPwText.length === userInputPwText.length && userInputPwText){
            console.log("??")
            setIsSamePwText(true)
        } else {
            setIsSamePwText(false)
        }
        
    },[userInputCheckPwText])

async function checkIfIdExists(id) {
    const q = query(
        collection(db, "users"),
        where("id", "==", userInputIdText));
    const querySnapshot = await getDocs(q);
  
    // ID가 존재하면 true, 존재하지 않으면 false 반환
    return !querySnapshot.empty;
  }
  
    const  handleSignUpButton = async () => {
        
           const result = await checkIfIdExists()
           console.log(result)
           if(!result){
                const docRef = await addDoc(collection(db, "users"), {
                    id: userInputIdText,
                    pw: userInputPwText,
                    advantureGroup:"",
                    provider:"duntem",
                    imgUrl:''
                  })
                  console.log("Document written with ID: ", docRef.id);
            }
            else {
            console.log( "중복")
           }

    }
    return(
        <Container>
            <div 
                style={{backgroundColor:"#000000",
                opacity:0.8,
                width:'100vw',
                height:'100vh',
                textAlign:'center',
                alignContent:'center',
                position:"absolute",
                zIndex:1
            }}/>
            <div style={{zIndex:2}}>
                <TitleContainer>
                    <div 
                        style={{
                        fontSize:36,
                        fontWeight:'bold'}}>
                        회원가입
                    </div>
                    <div
                        style={{fontSize:16,}}>
                        계정 정보를 입력해주세요.
                    </div>
                </TitleContainer>
                <InputContainer>
                    <InputUserText 
                        type="text"
                        value={userInputIdText}
                        placeholder="id를 입력해주세요."
                        onChange={(e)=>{setUserInputIdText(e.target.value)}}
                        />
                    <InputUserText 
                        type="password"
                        value={userInputPwText}
                        placeholder="pw를 입력해주세요."
                        onChange={(e)=>{setUserInputPwText(e.target.value)}}
                        />
                    <InputUserText 
                        type="password"
                        value={userInputCheckPwText}
                        placeholder="pw를 재입력해주세요."
                        onChange={(e)=>{setUserInputCheckPwText(e.target.value)}}
                        />   
                    {userInputCheckPwText?
                        isSamePwText ? 
                        <p>비밀번호가 일치합니다.</p> :
                        <p>비밀번호를 다시 확인 해주세요.</p> :
                     null}
                    <LoginButon
                        onClick={()=>{handleSignUpButton()}}
                    >회원가입</LoginButon>
                </InputContainer>
                </div>
            
            
        </Container>
    )
}