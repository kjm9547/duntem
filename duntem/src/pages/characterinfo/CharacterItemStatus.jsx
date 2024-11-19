import styled from "styled-components";

import { CharacterEquipmentList } from "./CharacterEquipmentList";
import { itemIconPathList } from "../../data/itemIconPathList";

const Container = styled.div`
    padding: 25px;
    flex-direction: row;
    display: flex;
`;
const CharacterCard = styled.div`
    display: flex;
    width: 280px;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    height: 400px;
    flex-direction: column;
    align-items: center;
    border: 2px solid #cbcbcb;
`;
const CardHeaderContainer = styled.div`
    flex-direction: column;
    height: 45px;
    width: 100%;
`;
const CardImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    margin-top: -20px;
`;

const CardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.3;
`;
const CardText = styled.div`
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    color: ${(props) => props.color};
    font-size: ${(props) => props.size + "px"};
    border: ${(props) =>
        props.value === "jobName" ? "0.3px solid #DCDCDC " : null};
    border-radius: 8px;
    background-color: ${(props) =>
        props.value === "jobName" ? "#282828 " : null};
`;

const CharacterImg = styled.img`
    height: 280px;
`;
export const CharacterItemStatus = ({ character }) => {
    return (
        <Container>
            <CharacterCard>
                <CardImageContainer>
                    <CardHeaderContainer>
                        <CardText color="#CA8D37" size={12}>
                            <img src={`${itemIconPathList.frame_icons}`} />
                            {character.fame}
                        </CardText>
                        <CardText size={18}>{character.characterName}</CardText>

                        <CardText size={10}>길드이름</CardText>
                    </CardHeaderContainer>
                    <CharacterImg
                        src={`https://img-api.neople.co.kr/df/servers/${character.serverId}/characters/${character.characterId}?zoom=600x690`}
                    ></CharacterImg>
                </CardImageContainer>
                <CardTextContainer>
                    <CardText value={"jobName"} size={22} color="#ffffff">
                        {character.jobGrowName}
                    </CardText>
                    <CardText value={"jobName"} size={16} color="#ffffff">
                        {character.jobName}
                    </CardText>
                </CardTextContainer>
            </CharacterCard>
            <CharacterEquipmentList character={character} />
        </Container>
    );
};
