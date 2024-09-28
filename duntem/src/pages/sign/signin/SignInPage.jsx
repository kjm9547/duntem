import React, { useState } from "react"
import styled from "styled-components"
import {query,collection,getDocs,where} from 'firebase/firestore'
import { firebaseInitailizer } from "../../../firebase"
import { useNavigate } from "react-router-dom"
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
`
export const SignInPage = () => {
    const [userInputIdText,setUserInputIdText ] = useState('')
    const [userInputPwText,setUserInputPwText ] = useState('')
    const nav = useNavigate()
    const {db}=firebaseInitailizer()

    const onClickSignInbutton = async() => {
        const q = query(
            collection(db,"users"),
            where("id","==",userInputIdText),
            where("pw","==",userInputPwText)
        )
        const data = await getDocs(q)
        data.forEach((doc)=>{
            console.log(doc.data())}
        )
        
        nav('/main')
        
        
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
                        로그인
                    </div>
                    <div
                        style={{fontSize:16,}}>
                        id와 비밀번호를 입력해주세요.
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
                    <LoginButon
                        onClick={()=>{onClickSignInbutton()}}>
                        로그인
                    </LoginButon>
                </InputContainer>
                </div>
            
            
        </Container>
    )
}