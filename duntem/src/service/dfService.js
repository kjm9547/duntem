import axios from "axios"
export const dfService = () => {
    const apiKey = 'qPMao1ttAOaA6bVsnpbZS242s4KvtWo2'
    const getCharacterInfo = (name) => {
        console.log(name)
        const path = `http://localhost:5001/duntem/us-central1/api/neople/${name}`;
        axios.get(path,{
            headers: {
                'Cache-Control': 'no-cache'  // 캐시 비활성화
              }
        })
        .then((res) => {
            console.log("su")
            console.log(res.data); // 서버로부터 받은 데이터를 콘솔에 출력
        })
        .catch((error) => {
            
            console.error('API 요청 실패:', error); // 오류 처리
        });
    }
    // https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterName}?zoom=${zoom}
    // https://img-api.neople.co.kr/df/itemId/${itemId}
    return{
        getCharacterInfo
    }
}