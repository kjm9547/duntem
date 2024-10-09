import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLocalStore } from "../../../hooks/useLocalStore"
import { useEffect, useState } from "react"
import { dfService } from "../../../service/dfService"
import { clearUserData } from "../../../redux/reducer/userSlice"
import { characterService } from "../../../service/characterService"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    padding-left:50px;
    padding-right:50px;
    padding-top: 25px;
    height: 100%;
    
`
const CharacterContainer = styled.div`
display: flex;
  flex-wrap: wrap;  /* 줄바꿈 허용 */
  gap: 16px;        /* 카드 사이 간격 */
    
    width: 100vw;
    height: 100%;
    padding-left: 2px;
    
`
const CharacterCard = styled.div`
    display: flex;
    width: 280px;
    box-sizing: border-box;
    background-color: #D9D9D9;
    padding: 20px;
    border-radius: 8px;
    border:1px solid blue;
    height: 400px;
    flex-direction: column;
    align-items: center;
`
const CardImageContainer = styled.div`
    
`
const CardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const CardText = styled.div`
    text-align: center;
`
export const DashBoardContent = () => {
    const userId = useSelector(state=>state.user)
    const [charcaterList,setCharcaterList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    const data =useSelector((state)=>state.dfCharacter)
    // useEffect(()=>{
    //     console.log(testCharData)
    //     if(testCharData) setImgPath(`https://img-api.neople.co.kr/df/servers/prey/characters/${testCharData?.characterId}?zoom=600x690`)
    // },[testCharData])
   useEffect(()=>{
    getUserAllCharacterData(userId.id).then((res)=>{
        setCharcaterList(res.rows)
    })
    console.log(charcaterList)
   },[data])
   const {getUserAllCharacterData} = characterService()
    return(
        <Container>
            <CharacterContainer>
            {charcaterList.map((value,index)=>(
                <CharacterCard>
                    <CardImageContainer>
                        <img src={`https://img-api.neople.co.kr/df/servers/prey/characters/${value.characterId}?zoom=600x690`}></img>
                    </CardImageContainer>
                    <CardTextContainer>
                       <CardText>{value.fame}</CardText>
                       <CardText>{value.characterName}</CardText>
                       <CardText>{value.jobName}</CardText>
                    </CardTextContainer>
                </CharacterCard>
            ))}
            </CharacterContainer>         
        </Container>
    )
}