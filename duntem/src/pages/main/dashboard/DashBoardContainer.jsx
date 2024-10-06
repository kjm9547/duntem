import styled from "styled-components"
import { DashBoardHeader } from "./DashBoardHeader"
import { DashBoardContent } from "./DashBoardContent"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Container = styled.div`
    border:1px solid red;
    height: calc(100vh - 75px);
    display: flex;
    flex-direction: column;
`

export const DashBoardContainder = () => {
    const userData = useSelector(state=>state.user)
    const data =useSelector((state)=>state.dfCharacter)
    useEffect(()=>{
        console.log("dfcharacter Data",data)
    },[data])
    return (
        <Container>
            <DashBoardHeader
                userData={userData}/>
            <DashBoardContent/>
        </Container>
    )
}