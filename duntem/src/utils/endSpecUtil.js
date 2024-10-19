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
    const isCharacterSetFullSwitching = () => {

    }
     
    return{
        isCharacterSetRareAvatar,
        isCharacterSetEndAoura,
        isCharacterSetEndCreature,
        isCharacterSetFullSwitching
    }
}
