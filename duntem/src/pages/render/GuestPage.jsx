import React, { useEffect, useState } from 'react'
import { GoogleAuthButton } from '../../auth/component/GoogleAuthButton'
import styled from 'styled-components'
import { DuntemAuthButton } from '../../auth/component/DuntemAuthButton'

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
const SignButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
`
export const GuestPage = () => {
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