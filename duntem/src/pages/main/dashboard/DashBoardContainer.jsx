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
    const [top,setTop] = useState(0)

    const handleisVisibleAddDataView = (value) => {
        setIsVisibleAddDataView(value)
    }
    const getIsVisibleAddDataView = () => {
        return isVisibleAddDataView
    }
    const onClickAddCharactorButton = () => {
        setTop(window.scrollY)
        console.log(top)
        handleisVisibleAddDataView(true)
    }
    useEffect(()=>{
        console.log("dfcharacter Data",data)
    },[data])
    return (
        <Container 
            
        isVisibleAddDataView={isVisibleAddDataView}>
            <DashBoardHeader
                top={top}
                getIsVisibleAddDataView={getIsVisibleAddDataView}
                handleisVisibleAddDataView={handleisVisibleAddDataView}
                onClickAddCharactorButton={onClickAddCharactorButton}
                userData={userData}/>
            <DashBoardContent
                onClickAddCharactorButton={onClickAddCharactorButton}
                setIsVisibleAddDataView={setIsVisibleAddDataView}
            />
            <Footer/>
        </Container>
    )
}