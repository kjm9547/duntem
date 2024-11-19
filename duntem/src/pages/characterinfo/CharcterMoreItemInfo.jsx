import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { EquipmentInfoCard } from "../../component/EquipmentInfoCard";
import { useSelector } from "react-redux";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
const ItemListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
`;
export const CharacterMoreItemInfo = () => {
    const [itemSelectGroup, setItemSelectGroup] = useState([
        { id: 1, value: "equipment" },
        { id: 2, value: "avarta" },
    ]);
    const equipments = useSelector(
        (state) => state.dfCharacter.equipmentList?.equipment,
    );
    const [showEuipmentDetailList, setShowEuipmentDetailList] =
        useState(equipments);
    const onClickSelectButton = (index) => {
        if (index === 0) {
            //setShowEuipmentDetailList to equipment
        } else if (index === 1) {
            //setShowEuipmentDetailList to avarta
        }
        setItemSelectGroup;
    };
    return (
        <Container>
            아이템 상세 정보 출력
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                    onClick={() => {
                        onClickSelectButton(0);
                    }}
                >
                    장비
                </Button>
                <Button
                    onClick={() => {
                        onClickSelectButton(1);
                    }}
                >
                    아바타
                </Button>
                <Button>Three</Button>
            </ButtonGroup>
            <ItemListContainer>
                {showEuipmentDetailList.map((item) => (
                    <EquipmentInfoCard data={item} />
                ))}
            </ItemListContainer>
        </Container>
    );
};
