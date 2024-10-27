import { switchingInfo } from "../data/characterSwitchingInfo";
import { itemEndSpecList } from "../data/itemEndSpecList"
export const endSpecUtil = () => {
    const isCharacterSetRareAvatar = (itemList) => {
        if(itemList){
            const result = itemList
            .filter((v)=> v.itemRarity === '레어')
            .length >= 7
            ? true
            : false;
            return result
        }
    }
    const isCharacterSetEndAoura = (itemList) => {
        const index = itemList.findIndex((v) => v.slotId === "AURORA" ) 
        if(index){
            return itemEndSpecList.aoura.atIncrese ===
            itemList[index]?.detail.itemStatus
            .find((v)=> v.name === "공격력 증폭")
            .value  || null
        }
    }
    const isCharacterSetEndCreature = (itemValue) => {
        if(itemValue){
            return itemEndSpecList.creature.atIncrese 
            === itemValue.itemStatus.
            find((v) => v.name === '공격력 증폭').value  || null
        }
    }
    const isCharacterSetFullSwitching = (data) => {
        const imgPath = getSkillImagePath(data.jobName, data.jobGrowName)
        let switchingState = false
        if(data.skill.buff?.skillInfo.option.level === 20){
            const additioanalOption = data.skill.buff.equipment.filter((v)=> v.slotName === "보조장비" || "마법석" || "귀걸이")
            additioanalOption.map((v)=>{
                if(v.itemName.indexOf("뒤틀린") === -1){
                    switchingState = false
                }
            })
            switchingState = true
        }
        return [switchingState,imgPath]
    }
    const getSkillImagePath = (jobName,jobGrowName) => {
        const data = switchingInfo.rows.find((v) => v.jobName == jobName)
        const index =data.jobGrowNames.findIndex((v) => 
            v.find((item)=> item === jobGrowName)
        )
        console.log(data,index)
        return data.skillIcons[index]
    }
    return{
        isCharacterSetRareAvatar,
        isCharacterSetEndAoura,
        isCharacterSetEndCreature,
        isCharacterSetFullSwitching
    }
}
