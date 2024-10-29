import styled from "@emotion/styled"
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import {Button, ToggleButton} from "@mui/material"
import { useEffect } from "react";
import { removeCharaterData } from "../../../redux/reducer/dfCharacterListSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
    margin-left: -20px;
    width: 120%;
    height: 40px;
    
    display: flex;
    flex-direction: row;
    
    justify-content: space-between;
    
`
const CharacterDragButton = styled.div`
    width: 35px;
    height: 35px;
    
    :hover{
        /* border: 1px solid black ; */
        border-radius: 50%;
        cursor: grab;
    }
`
const RemoveButton = styled(ToggleButton)`
    border-radius: 50%;
    width: 35px;
    height: 35px;
    /* background-color: #DF4E4E; */
`
export const EditDashBoardHeader = ({
    handleCharacterCardDragStart,
    handleCharacterCardDrop,
    handleDraggingEvent,
    isEditMode,
    characterId
}) => {
    const dispatch = useDispatch()
    return(
        <Container
            >
            {isEditMode&&
            <>
            <CharacterDragButton  
                draggable
                onDragEnd={(e)=>{handleCharacterCardDrop(e)}}
                onDragStart={(e)=>{handleCharacterCardDragStart(e,characterId)}}
                onDragOver={(e)=>{
                    handleDraggingEvent()
                }}
                >
                <MdDragIndicator  size={24}/>
                
            </CharacterDragButton>
            <RemoveButton 
                color="error"
                value="bold"
                aria-label="bold"
                onClick={()=>{dispatch(removeCharaterData(characterId))}}
             >
                <IoClose size={25}/>
            </RemoveButton>
            </>
        }
        </Container>
    )
}