import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { ModalAddCharactorView } from "./modalCard/ModalAddCharactorView";
import { Button } from "@mui/material";
import { ConfirmModalCard } from "./modalCard/ConfirmModalCard";

const Container = styled.div`
  display: flex;
  height: 175px;
  border: 1px solid red;

  justify-content: center;
  /* padding-left: 200px;
    padding-right: 200px; */
`;
const TextTitleContainer = styled.div`
  width: 200px;
  align-content: center;
  padding-left: 225px;
`;
const TextTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;
const EditCharactorDataBtnContainer = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: center;
  /* border:1px solid black; */
`;
const EditCharactorDataBtn = styled(Button)`
  /* border:1px solid blue; */
  margin-right: 15px;
  background-color: #5a5afd;
  color: white;
`;
const TempBoardHeader = styled.div`
  flex: 1;
`;
const BackgroundFilmView = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0;
  top: ${(props) => props.top}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DashBoardHeader = ({
  isVisibleAddDataView,
  handleisVisibleAddDataView,
  onClickAddCharactorButton,
  top,
  userData,
  handleIsEditMode,
  isEditMode,
}) => {
  const [isSaveMode, setIsSaveMode] = useState(false);
  useEffect(() => {
    handleisVisibleAddDataView(false);
  }, []);

  const onClickfilmView = (e) => {
    if (e.target.classList.contains("filmView")) {
      handleisVisibleAddDataView(false);
    }
  };
  const onClickEditButton = () => {
    //변경된 사항 firebase 전달
    if (!isEditMode) {
      handleIsEditMode(true);
    } else {
      setIsSaveMode(true);
      //   handleIsEditMode(false);
    }
  };
  const handleIsSaveMode = (v) => {
    setIsSaveMode(v);
  };
  return (
    <Container>
      <TextTitleContainer>
        <TextTitle>{userData.advantureGroup}</TextTitle>
      </TextTitleContainer>
      <TempBoardHeader />
      <EditCharactorDataBtnContainer>
        <EditCharactorDataBtn
          variant="contained"
          disableElevation
          onClick={() => {
            onClickAddCharactorButton();
          }}
        >
          추가하기
        </EditCharactorDataBtn>
        <EditCharactorDataBtn
          variant="contained"
          disableElevation
          onClick={() => {
            onClickEditButton();
          }}
        >
          {isEditMode ? "저장" : "편집하기"}
        </EditCharactorDataBtn>
      </EditCharactorDataBtnContainer>
      {isSaveMode ? (
        <ConfirmModalCard
          isSaveMode={isSaveMode}
          handleIsSaveMode={handleIsSaveMode}
        />
      ) : null}
      {isVisibleAddDataView ? (
        <BackgroundFilmView
          className="filmView"
          top={top}
          onClick={(e) => {
            onClickfilmView(e);
          }}
        >
          <ModalAddCharactorView
            isVisibleAddDataView={isVisibleAddDataView}
            handleisVisibleAddDataView={handleisVisibleAddDataView}
          />
        </BackgroundFilmView>
      ) : null}
    </Container>
  );
};
