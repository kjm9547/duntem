import { createSlice } from "@reduxjs/toolkit";

export const dfCharacterSlice = createSlice({
    name: "user",
    initialState: {
        characterId: "",
        characterName: "",
        jobGrowId: "",
        jobGrowName: "",
        jobId: "",
        jobName: "",
        level: 0,
        serverId: "",
        selectedCharacter: null,
        equipmentList: null,
        fusionList: null,
    },
    reducers: {
        setClickedCharacterData: (state, action) => {
            (state.characterId = action.payload.characterId),
                (state.characterName = action.payload.characterName),
                (state.jobGrowId = action.payload.jobGrowId);
            state.jobGrowName = action.payload.jobGrowName;
            state.jobId = action.payload.jobId;
            state.jobName = action.payload.jobName;
            (state.level = action.payload.chalevelracterId),
                (state.serverId = action.payload.serverId);
        },
        clearCharacterData: (state, action) => {
            state = dfCharacterSlice.getInitialState();
        },
        setSelectedCharacter: (state, action) => {
            state.selectedCharacter = action.payload;
        },
        setEquipmentList: (state, action) => {
            state.equipmentList = action.payload;
        },
        setFusionList: (state, action) => {
            state.fusionList = action.payload;
        },
        //@param itemId 조회하여 융합석 정보 가져옵니다.
    },
});
export const {
    setClickedCharacterData,
    setSelectedCharacter,
    setEquipmentList,
    setFusionList,
} = dfCharacterSlice.actions;

export default dfCharacterSlice.reducer;
