import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dfService } from "../../service/dfService"
import { useLocalStore } from "../../hooks/useLocalStore"
import { clearUserData } from "../../redux/reducer/userSlice"
import { useNavigate } from "react-router-dom"

export const MainView = () => {
    const userId = useSelector(state=>state.user)
    const [text,setText] = useState('')
    const [testCharData,setTestCharData] = useState(null)
    const [imgPath,setImgPath] = useState('')
    const {clearUserDataInStorage} = useLocalStore()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(testCharData)
        if(testCharData) setImgPath(`https://img-api.neople.co.kr/df/servers/prey/characters/${testCharData?.characterId}?zoom=600x690`)
    },[testCharData])

   useEffect(()=>{
    console.log(userId)
   },[])

    const {getCharacterInfo} = dfService()
    const onClickSearchButton = () => {
        getCharacterInfo(text).then((res)=>{
            if(res){
                console.log(res)
                setTestCharData(res.rows[0])
                
            }
        })        
    }
    const clickSignOut = () =>{
        dispatch(clearUserData())
        clearUserDataInStorage()
        navigate("/")
    }
    return (
        <div>
            <h1>메인화면 입니다.</h1>
                    
           {testCharData?
            <div 
                style={{
                    border:"1px solid red",
                    width:300,
                    height:345,
                    
            }}>
                <img src={imgPath}></img>
                <p>{
                testCharData?.characterName}</p>
            </div>:null
        }
            <input 
                type="text"
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                ></input>
            <button onClick={()=>{onClickSearchButton()}}> 검색</button>
            <button onClick={()=>{clickSignOut()}}>로그아웃</button>
        </div>
    )
}