import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { characterService } from "../../../service/characterService"
import styled from "styled-components"
import { setArrayDataToCharacterList } from "../../../redux/reducer/dfCharacterListSlice"
import { endSpecUtil } from "../../../utils/endSpecUtil"
import { firebaseInitailizer } from "../../../firebase"
import { itemIconPathList } from "../../../data/itemIconPathList"
import { CharacterDeleteButton } from "./CharacterDeleteButton"

const Container = styled.div`
    display: flex;
    padding-top: 25px;
    width: 100%;
`
const CharacterContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;  /* 줄바꿈 허용 */
    flex-wrap: 4;
    gap: 16px;        /* 카드 사이 간격 */
    width: 100%;
    height: 100%;
    padding-left: 2px;
    
`
const CharacterCard = styled.div`
    display: flex;
    width: 280px;
    box-sizing: border-box;
    background-color: #F3F3F3;
    padding: 20px;
    border-radius: 8px;
    height: 400px;
    flex-direction: column;
    align-items: center;
    border: 1px solid #D9D9D9;
    &:hover{
        border: 2px solid #5A5AFD;
        
    }
`
const NullCard = styled.div`
    display: flex;
    width: 280px;
    box-sizing: border-box;
    height: 400px;
`
const AddCharacterCard = styled.div`
     display: flex;
    width: 280px;
    box-sizing: border-box;
    background-color: #D9D9D9;
    padding: 20px;
    border-radius: 8px;
    height: 400px;
    flex-direction: column;
    align-items: center;
    ;
    &:hover{
        border: 2px solid #5A5AFD;
        
    }
`
const CardHeaderContainer = styled.div`
    flex-direction: column;
    height: 65px;
    
    width:100%;
`
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    
`
const CardImageContainer = styled.div`
    display: flex;
    flex: 0.5;
    flex-direction: column;
    height: 100%;    
`
const CardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.3;
`
const CardText = styled.div`
    text-align: center;
`
const ItemIcon = styled.img`
    border-radius: 5px;
    margin-left: 3px;
    filter: saturate(${props => props.saturate});
`

export const DashBoardContent = ({
    onClickAddCharactorButton,
    isEditMode
}) => {
    const userId = useSelector(state=>state.user)
    const [charcaterList,setCharcaterList] = useState([])
    const [isItemEndSpec,setIsItemEndSpec] = useState([])
    const nowDraggingItem = useRef(null)
    const data =useSelector((state)=>state.dfCharcterList)

    const dispatch = useDispatch()

    const {getUserAllCharacterData} = characterService()
    const {
        isCharacterSetEndAoura,
        isCharacterSetEndCreature,
        isCharacterSetFullSwitching,
        isCharacterSetRareAvatar} = endSpecUtil()
    useEffect(()=>{
        getUserAllCharacterData(userId.id)
        .then((res)=>{
            let newArray = new Array(res.rows.length)
                newArray = [...res.rows]
            for(let i = 0; i< 4-res.rows.length%4; i++){
                newArray.push(undefined)
            }
            setCharcaterList(newArray)
            dispatch(setArrayDataToCharacterList(newArray))
            checkCharacterEndSpec(newArray)
        })
   },[])
   useEffect(()=>{
    if(charcaterList.length > 0
        && charcaterList.length != data.rows.length){
        setCharcaterList(data.rows)
    } 
   },[data])
 
    
    const checkCharacterEndSpec = (data) => {
        const newArray = [...isItemEndSpec]
        data.map((v,i)=>{
            if(v){
                newArray.push({
                    id:data[i].characterName,
                    isAvatar:isCharacterSetRareAvatar(v.avatar),
                    isCreature:isCharacterSetEndCreature(v.creature),
                    isAoura:isCharacterSetEndAoura(v.avatar),
                    isSwitching:isCharacterSetFullSwitching(v)
                })    
            }
        })
        console.log(newArray)
        setIsItemEndSpec(newArray)
    }

    const handleCharacterCardDragOver = () => {

    }
    const handleCharacterCardDragStart = (e,v) => {
        const startItem = v;
        nowDraggingItem.current = v;
        console.log(nowDraggingItem)
    }
    const handleCharacterCardDrop = (e) => {
        
        console.log("eqweqw")
        console.log(e.target)
    }
    return(
        <Container>
            <CharacterContainer>
            {/* https://img-api.neople.co.kr/df/items/<itemId> */}
            {charcaterList.map((value,index)=>{
                return(
                (value?
                <CharacterCard 
                    key={value.characterId}
                    // onDrop
                    draggable
                   
                    
                >
                    
                    
                    
                    <CardImageContainer onDragStart={(e)=>{e.preventDefault()}}>
                    <CardHeaderContainer>
                    <CharacterDeleteButton
                        handleCharacterCardDragStart={handleCharacterCardDragStart}
                        handleCharacterCardDrop={handleCharacterCardDrop}
                        isEditMode={isEditMode}
                    />
                    <IconContainer>
                            <ItemIcon src={
                                isItemEndSpec[index]?.isAvatar
                                ?itemIconPathList.onAvatar
                                :itemIconPathList.offAvatar
                                }
                            />
                            <ItemIcon src={
                                isItemEndSpec[index]?.isAoura
                                ?itemIconPathList.onAoura
                                :itemIconPathList.offAoura
                                }
                            />
                            <ItemIcon src={
                                isItemEndSpec[index]?.isCreature
                                ?itemIconPathList.onCreature
                                :itemIconPathList.offCreature
                                }
                            />
                            <ItemIcon src={
                                isItemEndSpec[index]?.isSwitching[1]
                                }
                                saturate={isItemEndSpec[index].isSwitching[0]?1:0}
                            />
                            </IconContainer>
                    </CardHeaderContainer>
                    
                        <img src={`https://img-api.neople.co.kr/df/servers/prey/characters/${value.characterId}?zoom=600x690`}></img>
                    </CardImageContainer>
                    <CardTextContainer>
                       <CardText>{value.fame}</CardText>
                       <CardText>{value.characterName}</CardText>
                       <CardText>{value.jobName}</CardText>
                    </CardTextContainer>
                </CharacterCard>
                :(charcaterList[index-1]?
                <AddCharacterCard
                    key={`addCard`}
                    onClick={()=>{onClickAddCharactorButton()}}
                >
                    add
                </AddCharacterCard>:<NullCard key={`nullCard`+index}></NullCard>))
            )}
            )}
            </CharacterContainer>         
        </Container>
    )
}