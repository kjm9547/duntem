import styled from "styled-components";
import { itemIconPathList } from "../../data/itemIconPathList";
import { CharacterEquipmentList } from "./CharacterEquipmentList";

const Container = styled.div`
    border: 1px solid black;
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
    border: 1px solid #e0e0e0;
    &:hover {
        border: 2px solid #5a5afd;
    }
`;
const CardHeaderContainer = styled.div`
    flex-direction: column;
    height: 65px;
    width: 100%;
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
    padding-left: 10px;
    padding-right: 10px;
    font-size: ${(props) => props.size + "px"};
    border: ${(props) =>
        props.value === "jobName" ? "0.3px solid #DCDCDC " : null};
    border-radius: 8px;
    background-color: ${(props) =>
        props.value === "jobName" ? "#f5f5f5 " : null};
`;
const ItemIcon = styled.img`
    border-radius: 5px;
    margin-left: 3px;
    filter: ${(props) => `saturate(${props.saturate})`};
    position: relative;
    z-index: 0;
    mix-blend-mode: multiply; /* 배경과 섞이도록 설정 */
`;
export const CharacterItemStatus = ({ character }) => {
    return (
        <Container>
            <CharacterCard>
                <CardImageContainer>
                    <CardHeaderContainer>
                        <img
                            src={
                                character.isEndSpec.isAvatar
                                    ? itemIconPathList.onAvatar
                                    : itemIconPathList.offAvatar
                            }
                        />
                        <img
                            src={
                                character.isEndSpec?.isAoura
                                    ? itemIconPathList.onAoura
                                    : itemIconPathList.offAoura
                            }
                        />
                        <img
                            src={
                                character.isEndSpec?.isCreature
                                    ? itemIconPathList.onCreature
                                    : itemIconPathList.offCreature
                            }
                        />
                        <ItemIcon
                            src={character.isEndSpec?.isSwitching[1]}
                            saturate={
                                character.isEndSpec?.isSwitching[0] ? 1 : 0
                            }
                        ></ItemIcon>
                    </CardHeaderContainer>
                    <img
                        src={`https://img-api.neople.co.kr/df/servers/${character.serverId}/characters/${character.characterId}?zoom=600x690`}
                    ></img>
                </CardImageContainer>
                <CardTextContainer>
                    <CardText size={12}>{character.fame}</CardText>
                    <CardText size={14}>{character.characterName}</CardText>
                    <CardText value={"jobName"} size={12}>
                        {character.jobGrowName}
                    </CardText>
                    <CardText size={10}>길드이름</CardText>
                </CardTextContainer>
            </CharacterCard>
            <CharacterEquipmentList />
        </Container>
    );
};
