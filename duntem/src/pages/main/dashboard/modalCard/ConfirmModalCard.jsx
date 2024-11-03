import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useCharactor } from "../../../../hooks/useCharactor";
import { removeCharaterData } from "../../../../redux/reducer/dfCharacterListSlice";
import { useDispatch } from "react-redux";
const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); /* 배경 어둡게 */
  z-index: 999;
  text-align: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const Container = styled.div`
  position: relative;

  width: 250px;
  height: 115px;
  background-color: white;
  align-content: center;
  text-align: center;
  border-radius: 8px;
  z-index: 5555;
  border: 0.3px solid #d7d7d7;
`;
const TitleText = styled.span``;
const ButtonContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled(Chip)`
  width: 70px;
  margin-right: 5px;
  :hover {
    border: 1px solid black;
  }
`;

export const ConfirmModalCard = ({ handleIsSaveMode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const onClickDeleteButton = () => {};
  const onClickCancel = () => {
    handleIsSaveMode(false);
  };
  return (
    <Overlay>
      <Container point={window.scrollY}>
        <TitleText>변경된 사항을 적용하시겠습니까??</TitleText>
        <ButtonContainer>
          <Button
            label="저장"
            onClick={(e) => {
              onClickDeleteButton(e);
            }}
          />
          <Button
            label="취소"
            variant="outlined"
            onClick={() => {
              onClickCancel();
            }}
          />
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};
