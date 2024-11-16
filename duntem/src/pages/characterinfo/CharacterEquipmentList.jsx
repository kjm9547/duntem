import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { characterEquipment } from "../../data/characterEquipment";

const Container = styled.div``;
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
export const CharacterEquipmentList = () => {
    const equipments = useSelector(
        (state) => state.dfCharacter.equipmentList.equipment,
    );
    const [itemSlots, setItemSlots] = useState([]);
    useEffect(() => {
        console.log(equipments);
        const tmp = [...characterEquipment];
        characterEquipment.map((v, row) => {
            v.map((slot, index) => {
                const value = equipments.find(
                    (item) => item?.slotId === slot?.slotId,
                );
                tmp[row][index] = value;
            });
        });
        setItemSlots(tmp);
    }, []);
    return (
        <Container>
            <span>종결 정보 아이템 아이콘 옮겨오기</span>
            <h2>장착 장비</h2>
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
                                            <NullSlot slotIndex={index} />
                                        )}
                                    </>
                                );
                            })}
                        </Row>
                    );
                })}
            item
        </Container>
    );
};
