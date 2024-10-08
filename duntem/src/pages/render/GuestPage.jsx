import React, { useEffect, useState } from 'react'
import { GoogleAuthButton } from '../../auth/component/GoogleAuthButton'
import styled from 'styled-components'
import { DuntemAuthButton } from '../../auth/component/DuntemAuthButton'
import { useLocalStore } from '../../hooks/useLocalStore'
import { useSignFb } from '../../hooks/useSignFb'
import { useDispatch } from 'react-redux'
import { signedDuntemUser, signedGoogleUser } from '../../redux/reducer/userSlice'
import { useNavigate } from 'react-router-dom'

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
    color:white;
    
`
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0.2;
    height: 30vh;
    
    
`
const SignButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
    color:black;
`
export const GuestPage = () => {
    const {
        isLoginedUserToStorage,
        getLoginedUserProvider,
        getLoginedUserID
    } = useLocalStore()
    const {getCurrnetAuthData,getFirebaseUserData} = useSignFb()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(isLoginedUserToStorage()){
            try{
                if(getLoginedUserProvider() === "google"){
                    const data = getCurrnetAuthData()
                getFirebaseUserData(data[0].email).
                then((res) => {
                    res.forEach(
                        (doc) => {
                            dispatch(signedGoogleUser(doc.data()))
                            navigate("/main")
                        }
                    )
                })
                } else if (getLoginedUserProvider() === "duntem"){
                    getFirebaseUserData(getLoginedUserID()).
                    then((res) => {
                        res.forEach(
                            (doc) => {
                                dispatch(signedDuntemUser(doc.data()))
                                navigate("/main")
                            }
                        )
                    })
                    console.log("던템 로그인 유저입니다.")
                }
                
            } catch (err) {
                console.log( err )
            }
            
            
            console.log("저장된 기록이 존재합니다..")
        } else {
            
            console.log("저장된 기록이 없습니다.")
        }
    },[])
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
                <p style={{
                    fontSize:60,
                    fontWeight:'bold'}}> 던템</p>
                    <p style={{fontSize:22}}>손쉽게 가입하고 {'\n'}모험단을 관리해보세요.</p>
                    </TitleContainer>
                    <SignButtonContainer>
                <GoogleAuthButton/>
                
                <DuntemAuthButton/>
                    <a>test main 이동 버튼</a>
                    </SignButtonContainer>
            </div>
        </Container>
    )
}