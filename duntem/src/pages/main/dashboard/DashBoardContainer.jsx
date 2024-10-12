import styled from "styled-components"
import { DashBoardHeader } from "./DashBoardHeader"
import { DashBoardContent } from "./DashBoardContent"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Footer } from "../../../component/Footer"

const Container = styled.div`
    /* border:1px solid red; */


    display: flex;
    flex-direction: column;
    padding-left: 200px;
    padding-right: 200px;
`

export const DashBoardContainder = () => {
    const userData = useSelector(state=>state.user)
    const data =useSelector((state)=>state.dfCharacter)
    const [isVisibleAddDataView,setIsVisibleAddDataView] = useState(true)
    const handleisVisibleAddDataView = (value) => {
        setIsVisibleAddDataView(value)
    }
    const getIsVisibleAddDataView = () => {
        return isVisibleAddDataView
    }
    useEffect(()=>{
        console.log("dfcharacter Data",data)
    },[data])
    return (
        <Container 
            
        isVisibleAddDataView={isVisibleAddDataView}>
            <DashBoardHeader
                getIsVisibleAddDataView={getIsVisibleAddDataView}
                handleisVisibleAddDataView={handleisVisibleAddDataView}
                userData={userData}/>
            <DashBoardContent/>
            <Footer/>
        </Container>
    )
}