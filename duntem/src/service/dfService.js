import axios from "axios"
export const dfService = () => {
    const apiKey = 'qPMao1ttAOaA6bVsnpbZS242s4KvtWo2'
    const getCharacterInfo = async (name) => {
        
        const path = import.meta.env.VITE_API_URL+name;
        console.log(path)
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
    const getCharacterCreatureInfo = async(characterId,serverId) => {
        const path = import.meta.env.VITE_API_URL+`creature/${characterId}/${serverId}`;
        console.log(path)
        try{
            const res = await axios.get(path)
            return res.data.creature
            }
        catch(error){        
            console.error('API 요청 실패:', error); // 오류 처리
        };
    }
    const getCharacterAvatarInfo = async(characterId,serverId) => {
        const path = import.meta.env.VITE_API_URL+`avatar/${characterId}/${serverId}`;
        try{
            const res = await axios.get(path)
            return res.data.avatar
            }
        catch(error){        
            console.error('API 요청 실패:', error); // 오류 처리
        };
    }
    const getCharacterSwitchingInfo = async(characterId,serverId) => {
        const path = import.meta.env.VITE_API_URL+`switching/${characterId}/${serverId}`;
        try{
            const res = await axios.get(path)
            return res.data.skill
            }
        catch(error){        
            console.error('API 요청 실패:', error); // 오류 처리
        };
    }
    // https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterName}?zoom=${zoom}
    // https://img-api.neople.co.kr/df/itemId/${itemId}
    return{
        getCharacterInfo,
        getCharacterCreatureInfo,
        getCharacterAvatarInfo,
        getCharacterSwitchingInfo
    }

}