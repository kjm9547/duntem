import { useDispatch, useSelector } from "react-redux";
import { dfService } from "../service/dfService";
import { useState } from "react";
import { setFusionList } from "../redux/reducer/dfCharacterSlice";

export const useItemDetailList = () => {
    const { getMultItemDetailInfo } = dfService();
    const equipments = useSelector(
        (state) => state.dfCharacter.equipmentList?.equipment,
    );
    const fusionList = useSelector((state) => state.dfCharacter.fusionList);
    // 장비 아바타 ...로 나눈 태그 클릭시 상태 업데이트 위해 선언한 변수
    const [showEuipmentDetailList, setShowEuipmentDetailList] =
        useState(equipments);

    const dispatch = useDispatch();
    const updateEuipmentList = (itemIdList) => {
        getMultItemDetailInfo(itemIdList).then((res) => {
            dispatch(setFusionList(res));
        });
    };
    return {
        equipments,
        fusionList,
        showEuipmentDetailList,
        updateEuipmentList,
    };
};
