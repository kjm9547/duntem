import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { EquipmentInfoCard } from "../../component/EquipmentInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { dfService } from "../../service/dfService";
import { setFusionList } from "../../redux/reducer/dfCharacterSlice";
import { useItemDetailList } from "../../hooks/useItemList";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`;
const ItemListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
`;
export const CharacterMoreItemInfo = () => {
    const {
        equipments,
        fusionList,
        showEuipmentDetailList,
        updateEuipmentList,
    } = useItemDetailList();
    useEffect(() => {
        // 캐릭터의 장비 아이디를 추출하여 api 요청
        const itemIdList = showEuipmentDetailList.map(
            (v) => v?.upgradeInfo?.itemId,
        );
        updateEuipmentList(itemIdList);
    }, []);
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
                {equipments.map((item) => {
                    const itemData = fusionList.rows.find(
                        (v) => v.itemId === item.upgradeInfo?.itemId,
                    );
                    return (
                        <EquipmentInfoCard data={item} itemData={itemData} />
                    );
                })}
            </ItemListContainer>
        </Container>
    );
};
