import styled from "styled-components";
import { CustomAppBar } from "../../component/CustomAppBar";
import { Header } from "../../component/Header";
import { DashBoardContainder } from "../main/dashboard/DashBoardContainer";
import { CharacterInfoContent } from "./CharacterInfoContent";

const Container = styled.div`
    flex-direction: column;
    width: 97.2vw;
    height: 100vh;
    border: 1px solid black;
    padding: 25px;
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
