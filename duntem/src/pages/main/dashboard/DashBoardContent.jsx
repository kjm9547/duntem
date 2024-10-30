import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { characterService } from "../../../service/characterService";
import styled from "styled-components";
import { setArrayDataToCharacterList } from "../../../redux/reducer/dfCharacterListSlice";
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
  filter: saturate(${(props) => props.saturate});
`;

export const DashBoardContent = ({ onClickAddCharactorButton, isEditMode }) => {
  const userId = useSelector((state) => state.user);
  const charcaterList = useSelector((state) => state.dfCharcterList.rows);
  const [isItemEndSpec, setIsItemEndSpec] = useState([]);
  const [cardRefs] = useState({});

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

      dispatch(setArrayDataToCharacterList(newArray));
    });
  }, []);
  useEffect(() => {
    charcaterList ? checkCharacterEndSpec(charcaterList) : null;
  }, [charcaterList]);
  const checkCharacterEndSpec = (data) => {
    const newArray = [...isItemEndSpec];
    data.map((v, i) => {
      if (v) {
        newArray.push({
          id: data[i].characterName,
          isAvatar: isCharacterSetRareAvatar(v.avatar),
          isCreature: isCharacterSetEndCreature(v.creature),
          isAoura: isCharacterSetEndAoura(v.avatar),
          isSwitching: isCharacterSetFullSwitching(v),
        });
      }
    });
    console.log(newArray);
    setIsItemEndSpec(newArray);
  };

  const handleCharacterCardDragOver = () => {};
  const handleCharacterCardDragStart = (e, characterId) => {
    const ref = cardRefs[characterId];
    const ghostDiv = ref.current.cloneNode(true); // 요소를 복제
    // 커스텀 Div를 드래그 이미지로 설정
    ghostDiv.style.position = "absolute";
    ghostDiv.style.top = "-9999px"; // 화면에서 보이지 않도록 이동
    ghostDiv.style.pointerEvents = "none"; // 드래그 중 클릭되지 않도록

    document.body.appendChild(ghostDiv); // DOM에 추가

    // 복제한 요소를 드래그 이미지로 설정
    e.dataTransfer.setDragImage(ghostDiv, 35, 35);
  };
  const handleCharacterCardDrop = (e, characterId) => {
    console.log("drop");
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
              onDragOver={() => {
                console.log("hi");
              }}
            >
              <CardImageContainer>
                <CardHeaderContainer>
                  <EditDashBoardHeader
                    handleCharacterCardDragStart={handleCharacterCardDragStart}
                    handleCharacterCardDrop={handleCharacterCardDrop}
                    handleDraggingEvent={handleDraggingEvent}
                    isEditMode={isEditMode}
                    characterId={value.characterId}
                    handleSetIsDeleteMode={handleSetIsDeleteMode}
                    handleSetCharactor={handleSetCharactor}
                  />
                  <IconContainer>
                    <ItemIcon
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
                  </IconContainer>
                </CardHeaderContainer>

                <img
                  src={`https://img-api.neople.co.kr/df/servers/${value.serverId}/characters/${value.characterId}?zoom=600x690`}
                ></img>
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
