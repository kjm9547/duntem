import styled from "styled-components";
import { DashBoardHeader } from "./DashBoardHeader";
import { DashBoardContent } from "./DashBoardContent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Footer } from "../../../component/Footer";
import { AdDisplay } from "../../../component/AdDisplay";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Content = styled.div`
    display: grid;
    grid-template-columns: 1.6fr 6.8fr 1.6fr;
    width: 100%;
`;
const AdsDisplayContainer = styled.div`
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InfoBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const DashBoardContainder = () => {
    const userData = useSelector((state) => state.user);
    const data = useSelector((state) => state.dfCharacter);
    const [isVisibleAddDataView, setIsVisibleAddDataView] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [top, setTop] = useState(0);

    const handleisVisibleAddDataView = (value) => {
        setIsVisibleAddDataView(value);
    };

    const onClickAddCharactorButton = () => {
        setTop(window.scrollY);
        console.log(top);
        handleisVisibleAddDataView(true);
    };
    const handleIsEditMode = (value) => {
        setIsEditMode(value);
    };
    return (
        <Container>
            <AdsDisplayContainer>
                <AdDisplay />
            </AdsDisplayContainer>

            <Content>
                <AdsDisplayContainer>
                    <AdDisplay />
                </AdsDisplayContainer>
                <InfoBody>
                    <DashBoardHeader
                        top={top}
                        isEditMode={isEditMode}
                        isVisibleAddDataView={isVisibleAddDataView}
                        handleisVisibleAddDataView={handleisVisibleAddDataView}
                        onClickAddCharactorButton={onClickAddCharactorButton}
                        handleIsEditMode={handleIsEditMode}
                        userData={userData}
                    />
                    <DashBoardContent
                        onClickAddCharactorButton={onClickAddCharactorButton}
                        handleisVisibleAddDataView={handleisVisibleAddDataView}
                        isEditMode={isEditMode}
                    />
                </InfoBody>
                <AdsDisplayContainer>
                    <AdDisplay />
                </AdsDisplayContainer>
            </Content>
            <Footer />
        </Container>
    );
};
