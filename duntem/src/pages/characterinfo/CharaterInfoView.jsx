import styled from "styled-components";
import { CustomAppBar } from "../../component/CustomAppBar";
import { Header } from "../../component/Header";
import { DashBoardContainder } from "../main/dashboard/DashBoardContainer";
import { CharacterInfoContent } from "./CharacterInfoContent";

const Container = styled.div`
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding-bottom: 0px;
`;
export const CharacterInfoView = () => {
    return (
        <Container maxWidth="lg">
            <CustomAppBar />
            <CharacterInfoContent />
        </Container>
    );
};
