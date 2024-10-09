import styled from "styled-components"
import { DashBoardHeader } from "./DashBoardHeader"
import { DashBoardContent } from "./DashBoardContent"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Container = styled.div`
    /* border:1px solid red; */
    height: calc(100vh - 75px);
    display: flex;
    flex-direction: column;
    
    overflow: ${props => props.isVisibleAddDataView?'hidden':'unset'};
`

export const DashBoardContainder = () => {
    const userData = useSelector(state=>state.user)
    const data =useSelector((state)=>state.dfCharacter)
    const [isVisibleAddDataView,setIsVisibleAddDataView] = useState(false)
    const handleisVisibleAddDataView = (value) => {
        setIsVisibleAddDataView(value)
    }
    useEffect(()=>{
        console.log("dfcharacter Data",data)
    },[data])
    return (
        <Container 
        isVisibleAddDataView={isVisibleAddDataView}>
            <DashBoardHeader
                isVisibleAddDataView={isVisibleAddDataView}
                handleisVisibleAddDataView={handleisVisibleAddDataView}
                userData={userData}/>
            <DashBoardContent/>
        </Container>
    )
}