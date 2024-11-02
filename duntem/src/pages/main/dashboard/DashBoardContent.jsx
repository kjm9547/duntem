import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { characterService } from "../../../service/characterService";
import styled from "styled-components";
import { updateCharacterList } from "../../../redux/reducer/dfCharacterListSlice";
import { endSpecUtil } from "../../../utils/endSpecUtil";
import { firebaseInitailizer } from "../../../firebase";
import { itemIconPathList } from "../../../data/itemIconPathList";
import { EditDashBoardHeader } from "./EditDashBoardHeader";
import { ModalEditCard } from "./modalCard/ModalEditCard";
import { useCharactor } from "../../../hooks/useCharactor";

const Container = styled.div`
  display: flex;
  padding-top: 25px;
  width: 100%;
`;
const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  flex-wrap: 4;
  gap: 16px; /* 카드 사이 간격 */
  width: 100%;
  height: 100%;
  padding-left: 2px;
`;
const CharacterCard = styled.div`
  display: flex;
  width: 280px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 8px;
  height: 400px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d9d9d9;
  &:hover {
    border: 2px solid #5a5afd;
  }
`;
const NullCard = styled.div`
  display: flex;
  width: 280px;
  box-sizing: border-box;
  height: 400px;
`;
const AddCharacterCard = styled.div`
  display: flex;
  width: 280px;
  box-sizing: border-box;
  background-color: #d9d9d9;
  padding: 20px;
  border-radius: 8px;
  height: 400px;
  flex-direction: column;
  align-items: center;
  &:hover {
    border: 2px solid #5a5afd;
  }
`;
const CardHeaderContainer = styled.div`
  flex-direction: column;
  height: 65px;
  width: 100%;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;
const CardImageContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  height: 100%;
`;
const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
`;
const CardText = styled.div`
  text-align: center;
`;
const ItemIcon = styled.img`
  border-radius: 5px;
  margin-left: 3px;
  filter: ${(props) => `saturate(${props.saturate})`};
  position: relative;
  z-index: 0;
  mix-blend-mode: multiply; /* 배경과 섞이도록 설정 */
`;

export const DashBoardContent = ({ onClickAddCharactorButton, isEditMode }) => {
  const userId = useSelector((state) => state.user);
  const charcaterList = useSelector((state) => state.dfCharcterList.rows);

  const [cardRefs] = useState({});
  const characterRef = useRef();
  const dispatch = useDispatch();
  const { charactor, handleSetCharactor, handleSetIsDeleteMode, isDeleteMode } =
    useCharactor();
  const { getUserAllCharacterData, removeCharacterFireStore } =
    characterService();
  const {
    isCharacterSetEndAoura,
    isCharacterSetEndCreature,
    isCharacterSetFullSwitching,
    isCharacterSetRareAvatar,
  } = endSpecUtil();
  useEffect(() => {
    getUserAllCharacterData(userId.id).then((res) => {
      let newArray = new Array(res.rows.length);
      newArray = [...res.rows];
      for (let i = 0; i < 4 - (res.rows.length % 4); i++) {
        newArray.push(undefined);
      }

      dispatch(updateCharacterList(newArray));
      console.log(charcaterList);
    });
  }, []);

  const handleCharacterCardDragStart = (e, characterId) => {
    console.log("draggin");
    const ref = cardRefs[characterId];
    const ghostDiv = ref.current.cloneNode(true); // 요소를 복제
    const index = charcaterList.findIndex(
      (v) => v?.characterId === characterId,
    );
    characterRef.current = index;
    // 커스텀 Div를 드래그 이미지로 설정
    ghostDiv.style.position = "absolute";
    ghostDiv.style.top = "-9999px"; // 화면에서 보이지 않도록 이동
    ghostDiv.style.pointerEvents = "none"; // 드래그 중 클릭되지 않도록

    document.body.appendChild(ghostDiv); // DOM에 추가

    // 복제한 요소를 드래그 이미지로 설정
    e.dataTransfer.setDragImage(ghostDiv, 35, 35);
  };
  const handleCharacterCardDragEnd = (e, index) => {
    if (characterRef.current === "undefined") return;
    const newArray = [...charcaterList];
    const temp = newArray[characterRef.current];
    newArray[characterRef.current] = newArray[index];
    newArray[index] = temp;

    dispatch(updateCharacterList(newArray));
    characterRef.current = "undefined";
  };
  const handleDraggingEvent = (e, characterId) => {
    console.log("ref");
  };
  return (
    <Container>
      <CharacterContainer>
        {isDeleteMode ? (
          <ModalEditCard
            charactor={charactor}
            removeCharacterFireStore={removeCharacterFireStore}
            isDeleteMode={isDeleteMode}
            handleSetIsDeleteMode={handleSetIsDeleteMode}
          />
        ) : null}

        {charcaterList?.map((value, index) => {
          if (!value) return null;

          if (!cardRefs[value.characterId]) {
            cardRefs[value.characterId] = React.createRef();
          }

          return value ? (
            <CharacterCard
              key={value.characterId}
              ref={cardRefs[value.characterId]}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                handleCharacterCardDragEnd(e, index);
              }}
            >
              <CardImageContainer>
                <CardHeaderContainer>
                  <EditDashBoardHeader
                    handleCharacterCardDragStart={handleCharacterCardDragStart}
                    handleDraggingEvent={handleDraggingEvent}
                    isEditMode={isEditMode}
                    characterId={value.characterId}
                    handleSetIsDeleteMode={handleSetIsDeleteMode}
                    handleSetCharactor={handleSetCharactor}
                  />

                  <img
                    src={
                      value.isEndSpec.isAvatar
                        ? itemIconPathList.onAvatar
                        : itemIconPathList.offAvatar
                    }
                  />
                  <img
                    src={
                      value.isEndSpec?.isAoura
                        ? itemIconPathList.onAoura
                        : itemIconPathList.offAoura
                    }
                  />
                  <img
                    src={
                      value.isEndSpec?.isCreature
                        ? itemIconPathList.onCreature
                        : itemIconPathList.offCreature
                    }
                  />
                  <ItemIcon
                    src={value.isEndSpec?.isSwitching[1]}
                    saturate={value.isEndSpec?.isSwitching[0] ? 1 : 0}
                  ></ItemIcon>
                </CardHeaderContainer>

                <img
                  src={`https://img-api.neople.co.kr/df/servers/${value.serverId}/characters/${value.characterId}?zoom=600x690`}
                ></img>
                {/* <ItemIcon
                      src={
                        isItemEndSpec[index]?.isAvatar
                          ? itemIconPathList.onAvatar
                          : itemIconPathList.offAvatar
                      }
                    />
                    <ItemIcon
                      src={
                        isItemEndSpec[index]?.isAoura
                          ? itemIconPathList.onAoura
                          : itemIconPathList.offAoura
                      }
                    />
                    <ItemIcon
                      src={
                        isItemEndSpec[index]?.isCreature
                          ? itemIconPathList.onCreature
                          : itemIconPathList.offCreature
                      }
                    />
                    <ItemIcon
                      src={isItemEndSpec[index]?.isSwitching[1]}
                      saturate={isItemEndSpec[index]?.isSwitching[0] ? 1 : 0}
                    />
                     */}
              </CardImageContainer>
              <CardTextContainer>
                <CardText>{value.fame}</CardText>
                <CardText>{value.characterName}</CardText>
                <CardText>{value.jobName}</CardText>
              </CardTextContainer>
            </CharacterCard>
          ) : charcaterList[index - 1] ? (
            <AddCharacterCard
              key={`addCard`}
              onClick={() => {
                onClickAddCharactorButton();
              }}
            >
              add
            </AddCharacterCard>
          ) : (
            <NullCard key={`nullCard` + index}></NullCard>
          );
        })}
      </CharacterContainer>
    </Container>
  );
};
