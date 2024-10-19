import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { characterService } from "../../../service/characterService"
import styled from "styled-components"
import { setArrayDataToCharacterList } from "../../../redux/reducer/dfCharacterListSlice"
import { endSpecUtil } from "../../../utils/endSpecUtil"
import { firebaseInitailizer } from "../../../firebase"
import { itemIconPathList } from "../../../data/itemIconPathList"

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
    
    &:hover{
        border: 2px solid #5A5AFD;
        
    }
`
const CardHeaderContainer = styled.div`
    border: 1px solid black;
    display: flex;
    flex: 0.2;
    width:100%;
`
const CardImageContainer = styled.div`
    border: 1px solid black;
    display: flex;
    flex: 0.5;
`
const CardTextContainer = styled.div`
border: 1px solid black;
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
`
export const DashBoardContent = ({
    handleisVisibleAddDataView,
    onClickAddCharactorButton
}) => {
    const userId = useSelector(state=>state.user)
    const [charcaterList,setCharcaterList] = useState([])
    const [isItemEndSpec,setIsItemEndSpec] = useState([])
    
    
    const data =useSelector((state)=>state.dfCharcterList)

    const dispatch = useDispatch()
   useEffect(()=>{
    getUserAllCharacterData(userId.id).then((res)=>{
        
        let newArray = new Array(res.rows.length)
        newArray = [...res.rows]
        for(let i = 0; i< 4-res.rows.length%4; i++){
            newArray.push(undefined)
        }
        setCharcaterList(newArray)
        console.log(newArray)
        dispatch(setArrayDataToCharacterList(newArray))
        checkCharacterEndSpec(newArray)
    })
   },[])
   useEffect(()=>{
    if(charcaterList.length > 0 && charcaterList.length != data.rows.length){
        setCharcaterList(data.rows)
    }
     
   },[data])
 
   const {getUserAllCharacterData} = characterService()
   const {
    isCharacterSetEndAoura,
    isCharacterSetEndCreature,
    isCharacterSetFullSwitching,
    isCharacterSetRareAvatar} = endSpecUtil()
    const {storage,ref,getDownloadURL} = firebaseInitailizer()
    
    const checkCharacterEndSpec = (data) => {
        const newArray = [...isItemEndSpec]
        data.map((v,i)=>{
            if(v){
                newArray.push({
                    id:data[i].characterName,
                    isAvatar:isCharacterSetRareAvatar(v.avatar),
                    isCreature:isCharacterSetEndCreature(v.creature),
                    isAoura:isCharacterSetEndAoura(v.avatar)
                })    
            }
        })

        setIsItemEndSpec(newArray)
    }
    return(
        <Container>
            <CharacterContainer>
            {/* https://img-api.neople.co.kr/df/items/<itemId> */}
            {charcaterList.map((value,index)=>{
                return(
                (value?
                <CharacterCard key={value.characterId}>
                    <CardHeaderContainer>
                        <div>
                            <ItemIcon src={
                                isItemEndSpec[index].isAvatar
                                ?itemIconPathList.onAvatar
                                :itemIconPathList.offAvatar
                                }
                            />
                            <ItemIcon src={
                                isItemEndSpec[index].isAoura
                                ?itemIconPathList.onAoura
                                :itemIconPathList.offAoura
                                }
                            />
                            <ItemIcon src={
                                isItemEndSpec[index].isCreature
                                ?itemIconPathList.onCreature
                                :itemIconPathList.offCreature
                                }
                            />
                            {/* <img src={img}></img>
                            https://img-api.neople.co.kr/df/items/d68b7a9d70e5851de5d0357a157a3882
                            아바타 크리쳐 스위칭 오라
                            <img src ={`https://img-api.neople.co.kr/df/skills/${value.skill.buff.skillInfo.skillId}`}></img> */}
                        </div>
                    </CardHeaderContainer>
                    <CardImageContainer>
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
                    onClick={()=>{onClickAddCharactorButton()}}
                >
                    add
                </AddCharacterCard>:<NullCard></NullCard>))
            )}
            )}
            </CharacterContainer>         
        </Container>
    )
}