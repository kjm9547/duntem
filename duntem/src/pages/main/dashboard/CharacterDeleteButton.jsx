import styled from "styled-components"
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
const Container = styled.div`
    margin-left: -20px;
    width: 120%;
    height: 40px;
    
    display: flex;
    flex-direction: row;
    
    justify-content: space-between;
    :hover{
        /* border: 1px solid black ; */
        border-radius: 50%;
        background-color: #DB5F5F;
    }
`
const CharacterDragButton = styled.div`
    
`
export const CharacterDeleteButton = ({
    handleCharacterCardDragStart,
    handleCharacterCardDrop,
    isEditMode
}) => {
    return(
        <Container>
            {isEditMode&&
            <>
            <CharacterDragButton  
                onDragEnd={(e)=>{handleCharacterCardDrop(e)}}
                onDragStart={(e)=>{handleCharacterCardDragStart(e,value)}}>
                <MdDragIndicator  size={24}/>
            </CharacterDragButton>
            <IoClose size={25}/>
            </>
        }
        </Container>
    )
}