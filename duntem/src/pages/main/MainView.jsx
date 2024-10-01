import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { dfService } from "../../service/dfService"

export const MainView = () => {
    const userId = useSelector(state=>state.user)
    const [text,setText] = useState('')
    
    useEffect(()=>{
        console.log("userId",userId)
    },[])


    const {getCharacterInfo} = dfService()
    return (
        <div>
            <h1>메인화면 입니다.</h1>
            <input 
                type="text"
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                ></input>
            <button onClick={()=>{getCharacterInfo(text)}}> 전송</button>
        </div>
    )
}