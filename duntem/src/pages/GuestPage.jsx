import React, { useEffect, useState } from 'react'
import { GoogleAuthButton } from '../auth/GoogleAuthButton'

export const GuestPage = () => {
    return(
        <div style={{display:"flex",
        width:'100vw',
        height:'100vh',
        flex:1,
        backgroundImage:'url(assets/img/mainBackgroundImg.jpg)',
        border:"1px solid",
        }}>
            <div style={{backgroundColor:"#00000090",
            border:"1px solid red",
            flex:1,
            textAlign:'center',
            alignContent:'center',
            }}>
                <p style={{
                    fontSize:60,
                    fontWeight:'bold'}}> 던템</p>
                    <p style={{fontSize:22}}>손쉽게 가입하고 {'\n'}모험단을 관리해보세요.</p>
                <GoogleAuthButton/>
                <div>
                <GoogleAuthButton/>
                </div>
                    <a>test main 이동 버튼</a>
            </div>
        </div>
    )
}