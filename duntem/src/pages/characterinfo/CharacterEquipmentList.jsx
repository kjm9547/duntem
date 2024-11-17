import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { characterEquipment } from "../../data/characterEquipment";
import { Button, ButtonGroup } from "@mui/material";
import { itemIconPathList } from "../../data/itemIconPathList";
import { Margin } from "../../component/Margin";

const Container = styled.div`
    margin-left: 50px;
    border: 2px solid #cbcbcb;
    padding: 15px;
    width: 100%;
    border-radius: 8px;
`;
const Row = styled.div`
    display: flex;
    margin-bottom: 3px;
`;
const NullSlot = styled.div`
    width: 40px;
    height: 40px;
    margin-right: ${(props) => (props.slotIndex === 1 ? "15px" : "3px")};
`;
const ItemSlot = styled.div`
    width: 50px;
    height: 50px;
`;
const ItemImg = styled.img`
    width: 40;
    height: 40px;
    margin-right: ${(props) => (props.slotIndex === 1 ? "15px" : "3px")};
`;
const ItemIcon = styled.img`
    border-radius: 5px;
    margin-left: 3px;
    filter: ${(props) => `saturate(${props.saturate})`};
    position: relative;
    z-index: 0;
    mix-blend-mode: multiply; /* 배경과 섞이도록 설정 */
`;
const ListHeader = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`;
const EquipmentContainer = styled.div`
    display: flex;
`;
export const CharacterEquipmentList = ({ character }) => {
    const equipments = useSelector(
        (state) => state.dfCharacter.equipmentList?.equipment,
    );
    const [itemSlots, setItemSlots] = useState([]);
    const [fusionSlots, setFusionSlots] = useState([]);
    useEffect(() => {
        if (equipments) {
            const tmp = characterEquipment.map((row) => [...row]); // 깊은 복사
            const newArr = characterEquipment.map((row) => [...row]);
            characterEquipment.map((v, row) => {
                v.map((slot, index) => {
                    const value = equipments.find(
                        (item) => item?.slotId === slot?.slotId,
                    );
                    newArr[row][index] = value?.upgradeInfo;
                    tmp[row][index] = value;
                });
            });
            setFusionSlots(newArr);
            setItemSlots(tmp);
        }
    }, [equipments]);
    return (
        <Container>
            <ListHeader>
                <span>종결 여부</span>
                <div>
                    <ItemIcon
                        src={
                            character.isEndSpec.isAvatar
                                ? itemIconPathList.onAvatar
                                : itemIconPathList.offAvatar
                        }
                    />
                    <ItemIcon
                        src={
                            character.isEndSpec?.isAoura
                                ? itemIconPathList.onAoura
                                : itemIconPathList.offAoura
                        }
                    />
                    <ItemIcon
                        src={
                            character.isEndSpec?.isCreature
                                ? itemIconPathList.onCreature
                                : itemIconPathList.offCreature
                        }
                        saturate={1}
                    />
                    <ItemIcon
                        src={character.isEndSpec?.isSwitching[1]}
                        saturate={character.isEndSpec?.isSwitching[0] ? 1 : 0}
                    />
                </div>
            </ListHeader>
            <h2>장착 장비</h2>
            <EquipmentContainer>
                <div>
                    {itemSlots &&
                        itemSlots.map((list, row) => {
                            return (
                                <Row>
                                    {list?.map((value, index) => {
                                        return (
                                            <>
                                                {value ? (
                                                    <ItemImg
                                                        slotIndex={index}
                                                        src={`https://img-api.neople.co.kr/df/items/${value.itemId}`}
                                                    ></ItemImg>
                                                ) : (
                                                    <NullSlot
                                                        slotIndex={index}
                                                    />
                                                )}
                                            </>
                                        );
                                    })}
                                </Row>
                            );
                        })}
                </div>
                <Margin mr={100} />
                <div>
                    {fusionSlots &&
                        fusionSlots.map((list, row) => {
                            console.log(list);
                            return (
                                <Row>
                                    {list?.map((value, index) => {
                                        return (
                                            <>
                                                {value ? (
                                                    <ItemImg
                                                        slotIndex={index}
                                                        src={`https://img-api.neople.co.kr/df/items/${value.itemId}`}
                                                    ></ItemImg>
                                                ) : (
                                                    <NullSlot
                                                        slotIndex={index}
                                                    />
                                                )}
                                            </>
                                        );
                                    })}
                                </Row>
                            );
                        })}
                </div>
            </EquipmentContainer>
        </Container>
    );
};
