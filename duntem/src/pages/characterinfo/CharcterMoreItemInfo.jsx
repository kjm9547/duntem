import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { EquipmentInfoCard } from "../../component/EquipmentInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { dfService } from "../../service/dfService";
import { setFusionList } from "../../redux/reducer/dfCharacterSlice";

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
    const { getMultItemDetailInfo } = dfService();
    const titleTag = ["장비", "강화", "마법부여", "종결여부"];
    const equipments = useSelector(
        (state) => state.dfCharacter.equipmentList?.equipment,
    );
    const [showEuipmentDetailList, setShowEuipmentDetailList] =
        useState(equipments);
    const fusionList = useSelector((state) => state.dfCharacter.fusionList);
    const dispatch = useDispatch();
    const onClickSelectButton = (index) => {
        if (index === 0) {
            //setShowEuipmentDetailList to equipment
        } else if (index === 1) {
            //setShowEuipmentDetailList to avarta
        }
        setItemSelectGroup;
    };
    useEffect(() => {
        console.log("showEuipmentDetailList :", showEuipmentDetailList);
        const itemIdList = showEuipmentDetailList.map(
            (v) => v?.upgradeInfo?.itemId,
        );

        // showEuipmentDetailList.filter((v) => {});
        getMultItemDetailInfo(itemIdList).then((res) => {
            dispatch(setFusionList(res));
        });
    }, []);

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
                {showEuipmentDetailList.map((item) => {
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
