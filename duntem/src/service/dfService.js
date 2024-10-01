import axios from "axios"
export const dfService = () => {
    const apiKey = 'qPMao1ttAOaA6bVsnpbZS242s4KvtWo2'
    const getCharacterInfo = async (name) => {
        console.log(name)
        const path = `http://localhost:5001/duntem/us-central1/api/neople/${name}`;
        try{
        const res = await axios.get(path,{
            headers: {
                'Cache-Control': 'no-cache'  // 캐시 비활성화
              }
        })
           
            return res.data
        }
        catch(error){
            
            console.error('API 요청 실패:', error); // 오류 처리
        };
    }
    // https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterName}?zoom=${zoom}
    // https://img-api.neople.co.kr/df/itemId/${itemId}
    return{
        getCharacterInfo
    }
}