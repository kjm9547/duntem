import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div``;
const Row = styled.div`
    display: flex;
    border: 1px solid black;
    gap: 10px;
`;
const NullSlot = styled.div`
    width: 25px;
    height: 25px;
`;
const ItemSlot = styled.div`
    width: 25px;
    height: 25px;
`;
const ItemImg = styled.img`
    width: 25px;
    height: 25px;
`;
export const CharacterEquipmentList = () => {
    const equipments = useSelector(
        (state) => state.dfCharacter.equipmentList.equipment,
    );
    const nullIndexs = {
        2: [0],
        3: [0, 1],
    };
    const itemSlot = {
        0: [1, 1, 1, 1],
        1: [1, 1, 1, 1],
        2: [1, 0, 1, 1],
        3: [0, 0, 1, 1],
    };
    useEffect(() => {}, [console.log(equipments)]);
    return (
        <Container>
            {[...new Array(4)].map((_, row) => (
                <Row>
                    {equipments?.map((value, index) => {
                        if (index < 4) {
                            return (
                                <>
                                    {nullIndexs[row]?.includes(index) ? (
                                        <NullSlot>0</NullSlot>
                                    ) : (
                                        <ItemImg
                                            src={`https://img-api.neople.co.kr/df/items/${equipments[index].itemId}`}
                                        ></ItemImg>
                                    )}
                                </>
                            );
                        }
                    })}
                </Row>
            ))}
            item
        </Container>
    );
};
