import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dfService } from "../../service/dfService";
import { CharacterItemStatus } from "./CharacterItemStatus";
import { CharacterMoreItemInfo } from "./CharcterMoreItemInfo";
import { setEquipmentList } from "../../redux/reducer/dfCharacterSlice";
import { AdDisplay } from "../../component/AdDisplay";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 7fr 1.5fr;
`;
const AdsDisplayContainer = styled.div`
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const CharacterInfoContent = () => {
    const character = useSelector(
        (state) => state.dfCharacter.selectedCharacter,
    );
    const { getCharacterItemInfo } = dfService();
    const dispatch = useDispatch();
    useEffect(() => {
        getCharacterItemInfo(character.serverId, character.characterId).then(
            (res) => dispatch(setEquipmentList(res)),
        );
        console.log(character);
    }, []);
    return (
        <Container>
            <AdsDisplayContainer>{/* <AdDisplay /> */}</AdsDisplayContainer>
            <div>
                <CharacterItemStatus character={character} />
                <CharacterMoreItemInfo />
            </div>
            <AdsDisplayContainer>{/* <AdDisplay/> */}</AdsDisplayContainer>
        </Container>
    );
};
