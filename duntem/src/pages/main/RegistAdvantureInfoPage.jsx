import { useEffect, useState } from "react"
import styled from "styled-components"
import { firebaseInitailizer } from "../../firebase"
import {query,collection,getDocs,where,updateDoc,doc} from 'firebase/firestore'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateFireBaseAdvantureGroup } from "../../redux/reducer/userSlice"
const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-image: url(/assets/img/mainBackgroundImg.jpg);
    background-size: cover;  
    background-position: center ;
    background-repeat: no-repeat;
    z-index:0;
    color: white;
`
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0.2;
    height: 30vh;
`
const InputContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
    
`
const RegistContainer = styled.div`
    position: relative;
`
const InputUserText = styled.input`
    width: 300px;
    height: 35px;
    border-radius: 10px;
    margin-bottom: 10px;
    border: 0.1px solid #d9d9d990;
    background-color: white;
    flex-direction: column;
    color:black;
`
const RegistButton = styled.button`
  position: absolute;
  left: 88%;
  padding: 5px 10px;
  top: 10%;
  background-color: #5A5AFD;
  border-radius: 50%;
  color: white;
  border: none;
  cursor: pointer;
`
export const RegistAdvantureInfoPage = () => {
    const [inputAdnvantureName,setInputAdvantureName] = useState('')
    const [resultStateText,setResultStateText] = useState('')
    const {db} = firebaseInitailizer()
    const userId = useSelector(state => state.user.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(userId)
    },[])
    const checkAdvantureNameDuplicated = async () => {
        const q = query(
            collection(db,'users'),
            where("advantureGroup","==",inputAdnvantureName)
        )
        return await(getDocs(q))
    }
    const updateUserAdnvantureName = async () => {
        const q = query(
            collection(db, "users"),
            where("id", "==", userId)
          );
          const result = await getDocs(q);
          
          if (!result.empty) {
            // kim이라는 이름의 문서가 있으면 첫 번째 문서 가져오기 (name은 중복되지 않으므로)
            console.log("????")
            const userDoc = result.docs[0];
      
            // 문서의 ID를 통해 해당 문서 참조
            const docRef = doc(db, "users", userDoc.id);
            console.log(inputAdnvantureName)
            // comment 필드를 업데이트
            await updateDoc(docRef, {
                advantureGroup: inputAdnvantureName
            });
        }
    }
    const onClickRegistAdvantureButton = async() => {
        const result = await checkAdvantureNameDuplicated()
        console.log(result)
        if(result.empty){
            //중복이 아니니 로그인한 녀석 모험단 이름 디비 저장
            updateUserAdnvantureName()
            dispatch(updateFireBaseAdvantureGroup({advantureGroup:inputAdnvantureName}))
            setResultStateText("모험단이 등록되었습니다.")
            navigate('/main')

        } else {
            setResultStateText("모험단명이 중복되었습니다.")
        }
    }
    return (
        <Container>
            <div 
                style={{backgroundColor:"#000000",
                opacity:0.8,
                width:'100vw',
                height:'100vh',
                textAlign:'center',
                alignContent:'center',
                position:"absolute",
                zIndex:1
            }}/>
            <div style={{zIndex:2}}>
             <TitleContainer>
                    <div 
                        style={{
                        fontSize:36,
                        fontWeight:'bold'}}>
                        모험단 등록
                    </div>
                    <div
                        style={{fontSize:16,}}>
                        사용중인 모험단명을 입력해주세요.
                    </div>
                </TitleContainer>
                <InputContainer>
                    <RegistContainer>
                        <InputUserText 
                            type="text"
                            value={inputAdnvantureName}
                            placeholder="모험단명을 입력해주세요."
                            onChange={(e)=>{setInputAdvantureName(e.target.value)}}
                        />
                        <RegistButton
                            onClick={()=>{onClickRegistAdvantureButton()}}>
                            {`>`}
                        </RegistButton>
                    </RegistContainer>
                    {resultStateText}
                </InputContainer>   
                </div>
        </Container>
    )
}