import { useEffect } from "react"
import { useSelector } from "react-redux"

export const MainView = () => {
    const userId = useSelector(state=>state.user)
    useEffect(()=>{
        console.log("userId",userId)
    },[])
    
    return (
        <div>
            <h1>메인화면 입니다.</h1>
        </div>
    )
}