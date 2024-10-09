import { useEffect, useState } from "react"
import styled from "styled-components"
import { dfService } from "../../../service/dfService"
import FadeLoader from "react-spinners/FadeLoader"
import { dfServerName } from "../../../data/dfServerName"
import { useDispatch, useSelector } from "react-redux"
import { setClickedCharacterData } from "../../../redux/reducer/dfCharacterSlice"
import { characterService } from "../../../service/characterService"
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
    z-index: 1;
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

const SearchResultUserInfoHeader = styled.div`
    background-color: #5A5AFD;
    height:30px;
    width: 500px;
    display: flex;
    padding-left:calc(500px*0.1);
    align-items: center;
    
    
`
const SearchResultUserInfoContainer = styled.div`
    
    text-align: center;
    width: 100%;
    border-bottom:1px solid #A5A5A5;
    display: flex;
    flex-direction: row;
    padding-left:calc(500px*0.1);
    background-color: ${props => props.clicked?'#A3A3A3':null};
`
const UserInfoText = styled.div`
    display: flex;
    height: 45px;
    width: ${props => props.width };
    padding-left:5px;
    align-items: center;
    
`
const FloatingActionButtonContinaer = styled.button`
    position: absolute;
    bottom: 10px;

    
`
const FloatingActionButton = styled.button`
    
    
`
export const ModalAddCharactorView = ({handleisVisibleAddDataView}) => {
    const {addCharacterDataToFirebase} = characterService()
    
    const [text,setText] = useState()
    const [searchResultData,setSearchResultData] = useState([])
    const [isLoadedApiData,setIsLoadedApiData] = useState(false)
    
    const {getCharacterInfo} = dfService()
    const {transferServerName} = dfServerName()

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user)

    const onClickSearchButton = () => {
        setIsLoadedApiData(true)
        getCharacterInfo(text).then((res)=>{
            if(res){
                console.log(res)
                const newArray = []
                res.rows.map((value,index) => {
                    newArray.push({
                        id:index,
                        data:value,
                        clicked:false
                    })
                })
                console.log(res)
                setSearchResultData(newArray)
                setIsLoadedApiData(false)
            }
        })        
    }
    const onClickUserResultData = (i) => {
        searchResultData.find((value,index)=>{
            value.clicked && 
            i != index?
            searchResultData[index].clicked =!searchResultData[index].clicked
            : null
        })
        searchResultData[i].clicked = !searchResultData[i].clicked
        const newArray = [...searchResultData];
        setSearchResultData(newArray)
    }

    const onClickAddDataButton = () => {
        const data = searchResultData.find((v)=> v.clicked)
        dispatch(setClickedCharacterData(data.data))
        addCharacterDataToFirebase(user,data.data)
        handleisVisibleAddDataView(false)
    }
    const NullDataView = () =>{
        return(
            <div>
                캐릭터명을 입력 해주세요.
            </div>
        )
    }
    return(
        <Container className="ModalView">
            <SearchBoxContainer
             onKeyDown={(e)=>{
                console.log("???QQQ")
                if(e.key == "Enter"){
                    
                    onClickSearchButton()
                }
            }}>
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
                            <UserInfoText width={'15%'}>서버이름</UserInfoText>
                            <UserInfoText width={'35%'}>직업 </UserInfoText>
                            <UserInfoText width={'40%'}>닉네임</UserInfoText>
                        </SearchResultUserInfoHeader>
                        {searchResultData.map((value,index)=>{
                            return(
                                <SearchResultUserInfoContainer 
                                    key={value.characterId}
                                    onClick={()=>{onClickUserResultData(index)}}
                                    clicked={value.clicked}
                                    >
                                    <UserInfoText 
                                        width={'15%'}
                                        
                                        >{transferServerName(value.data.serverId)}</UserInfoText>
                                    <UserInfoText 
                                        width={'35%'}
                                        >
                                        {value.data.jobGrowName}</UserInfoText>
                                    <UserInfoText 
                                        width={'40%'}
                                        
                                        >{value.data.characterName}</UserInfoText>
                                </SearchResultUserInfoContainer>
                            )
                        })}
                        </>
                    ):<NullDataView/>  
                }
            </SearchResultContainer>
            <FloatingActionButtonContinaer>
                <FloatingActionButton
                    onClick={()=>{onClickAddDataButton()}}>
                    추가하기
                </FloatingActionButton>
                <FloatingActionButton>
                    취소
                </FloatingActionButton>
            </FloatingActionButtonContinaer>
        </Container>
    )
}