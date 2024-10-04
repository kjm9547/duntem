import { useState } from "react"
import styled from "styled-components"
import { dfService } from "../../../service/dfService"
import FadeLoader from "react-spinners/FadeLoader"
import { dfServerName } from "../../../data/dfServerName"
const Container = styled.div`
    display: flex;
    background-color: white;
    width: 500px;
    height: 475px;
    padding-top: 25px;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    color:black;
    position: relative;
`
const SearchBoxContainer = styled.div`
    display: flex;
    flex: 0.2;
    width: 100%;
    align-items: center;
    justify-content: center;
`
const SearchInputBox = styled.input`
    width: 45%;
    height: 45%;
    border-radius: 10px;
    margin-right: 10px;
    padding-left: 10px;
`
const SearchSubmitButton = styled.button`
    width: 15%;
    height: 45%;
    background-color: #5A5AFD;
    text-align: center;
    
`
const SearchResultContainer = styled.div`
    border-top:2px solid #A5A5A5;
    display: flex;
    flex: 0.8;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scroll-padding-top: 25px; 
`
const SearchResultUserInfoContainer = styled.div`
    
    text-align: center;
    width: 90%;
    border-bottom:1px solid #A5A5A5;
    display: flex;
    flex-direction: row;
`
const SearchResultUserInfoHeader = styled.div`
    background-color: #5A5AFD;
    height:30px;
    width: 500px;
    display: flex;
    padding-left:calc(500px*0.1);
    align-items: center;
    
`
const UserInfoText = styled.p`
    display: flex;
    width: 33%;
`
const FloatingActionButtonContinaer = styled.button`
    position: absolute;
    bottom: 10px;
    background: red;
`
const FloatingActionButton = styled.button`
    
    
`
export const ModalAddCharactorView = () => {
    const [text,setText] = useState()
    const [searchResultData,setSearchResultData] = useState([])
    const [isLoadedApiData,setIsLoadedApiData] = useState(false)

    const {getCharacterInfo} = dfService()
    const {transferServerName} = dfServerName()
    const onClickSearchButton = () => {
        setIsLoadedApiData(true)
        getCharacterInfo(text).then((res)=>{
            if(res){
                console.log(res)
                setSearchResultData(res.rows)
                setIsLoadedApiData(false)
            }
        })        
    }
    const NullDataView = () =>{
        console.log("..ss..")
        return(
            <div>
                캐릭터명을 입력 해주세요.
            </div>
        )
    }
    return(
        <Container className="ModalView">
            <SearchBoxContainer>
                <SearchInputBox
                 type="text"
                    value={text}
                    placeholder="캐릭터명을 입력해주세요."
                    onChange={(e)=>{
                        console.log(e.target.value)
                        setText(e.target.value)}}
                />
                <SearchSubmitButton
                onClick={()=>{onClickSearchButton()}}>검색</SearchSubmitButton>
            </SearchBoxContainer>
            <SearchResultContainer>
                {isLoadedApiData?
                    <FadeLoader height={5}/>:
                    searchResultData?(
                        <>
                        <SearchResultUserInfoHeader>
                            <UserInfoText>서버이름</UserInfoText>
                            <UserInfoText>직업 </UserInfoText>
                            <UserInfoText>닉네임</UserInfoText>
                        </SearchResultUserInfoHeader>
                        {searchResultData.map((value,index)=>{
                            return(
                                <SearchResultUserInfoContainer 
                                    key={value.characterId}>
                                    <UserInfoText>{transferServerName(value.serverId)}</UserInfoText>
                                    <UserInfoText>{value.jobGrowName}</UserInfoText>
                                    <UserInfoText>{value.characterName}</UserInfoText>
                                </SearchResultUserInfoContainer>
                            )
                        })}
                        </>
                    ):<NullDataView/>  
                }
            </SearchResultContainer>
            <FloatingActionButtonContinaer>
                <FloatingActionButton>
                    추가하기
                </FloatingActionButton>
                <FloatingActionButton>
                    취소
                </FloatingActionButton>
            </FloatingActionButtonContinaer>
        </Container>
    )
}