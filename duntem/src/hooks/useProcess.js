import { itemEndSpecList } from "../data/itemEndSpecList"
export const useProcess = () => {
    const isCharacterSetRareAvatar = (itemList) => {
        const newArray = itemList.splice(0,8)
        const result = newArray.find((v)=> v.itemRarity === '커먼')
        return result
    }
    const isCharacterSetEndAoura = (itemName) => {
        const result = itemEndSpecList.AURORA.find((v)=> v === itemName)
        return result
    }
    const isCharacterSetEndCreature = (itemName) => {
        const result = itemEndSpecList.creature.find((v)=> v === itemName)
        return result
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
