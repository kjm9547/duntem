import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { Box, Button, Modal, ToggleButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { removeCharaterData } from "../../../redux/reducer/dfCharacterListSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  margin-left: -20px;
  width: 120%;
  height: 40px;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;
const CharacterDragButton = styled.div`
  width: 35px;
  height: 35px;

  :hover {
    /* border: 1px solid black ; */
    border-radius: 50%;
    cursor: grab;
  }
`;
const RemoveButton = styled(ToggleButton)`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  /* background-color: #DF4E4E; */
`;
export const EditDashBoardHeader = ({
  handleCharacterCardDragStart,
  handleCharacterCardDrop,
  handleDraggingEvent,
  isEditMode,
  characterId,
  handleSetIsDeleteMode,
  handleSetCharactor,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onClickRemoveButton = () => {
    console.log(characterId);
    handleSetIsDeleteMode(true);
    handleSetCharactor(characterId);
  };
  return (
    <Container>
      {isEditMode && (
        <>
          <CharacterDragButton
            draggable
            onDragStart={(e) => {
              handleCharacterCardDragStart(e, characterId);
            }}
          >
            <MdDragIndicator size={24} />
          </CharacterDragButton>
          <RemoveButton
            color="error"
            value="bold"
            aria-label="bold"
            onClick={onClickRemoveButton}
          >
            {/* dispatch(removeCharaterData(characterId)) */}
            <IoClose size={25} />
          </RemoveButton>
        </>
      )}
    </Container>
  );
};
