import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { ModalAddCharactorView } from "./ModalAddCharactorView"

const Container = styled.div`
    display: flex;
    height: 175px;
    
    /* border: 1px solid black; */
    /* padding-left: 200px;
    padding-right: 200px; */
`
const TextTitleContainer = styled.div`
    width: 200px;
    align-content: center;
    padding-left:225px;
`
const TextTitle = styled.div`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
`
const EditCharactorDataBtnContainer = styled.div`
    display:flex;
    width: 500px;
    align-items: center;
    justify-content: center;
    /* border:1px solid black; */
    
`
const EditCharactorDataBtn = styled.button`
    /* border:1px solid blue; */
    margin-right: 10px;
    background-color: #5A5AFD;
    color: white;
`
const TempBoardHeader = styled.div`
    flex: 1;
`
const BackgroundFilmView = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    left: 0;
    top: ${(props)=>props.top}px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
`
export const DashBoardHeader = ({
    getIsVisibleAddDataView,
    handleisVisibleAddDataView,
    onClickAddCharactorButton,
    top,
    userData}) => {
    
    useEffect(()=>{
        handleisVisibleAddDataView(false)
    },[])
   
    const onClickfilmView = (e) => {
        if(e.target.classList.contains("filmView")){
            handleisVisibleAddDataView(false)
        }
    }
    return(
        <Container>
            <TextTitleContainer>
                <TextTitle>
                    {userData.advantureGroup}        
                </TextTitle>
            </TextTitleContainer>
            <TempBoardHeader/>
            <EditCharactorDataBtnContainer>
                <EditCharactorDataBtn
                    onClick={()=>{
                        onClickAddCharactorButton()
                    }}>
                    추가하기
                </EditCharactorDataBtn>
                <EditCharactorDataBtn>
                    편집하기
                </EditCharactorDataBtn>
            </EditCharactorDataBtnContainer>
            {getIsVisibleAddDataView()?
                <BackgroundFilmView 
                    className="filmView"
                    top={top}
                    onClick={(e)=>{onClickfilmView(e)}}>
                    <ModalAddCharactorView 
                    getIsVisibleAddDataView={getIsVisibleAddDataView}
                        handleisVisibleAddDataView={handleisVisibleAddDataView}/>
                </BackgroundFilmView>:null}
        </Container>
    )
}