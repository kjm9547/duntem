export const dfServerName = () => {
    const data = {
        "cain":"카인",
        "diregie":"디레지에",
        "siroco":"시로코",
        "prey":"프레이",
        "casillas":"카시야스",
        "hilder":"힐더",
        "anton":"안톤",
        "bakal":"바칼"
    } 
    
    const transferServerName = (textEn) => {
        return data[textEn]
    }
    return{transferServerName}
}