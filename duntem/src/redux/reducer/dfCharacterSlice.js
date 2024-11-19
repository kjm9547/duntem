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
    },
});
export const {
    setClickedCharacterData,
    setSelectedCharacter,
    setEquipmentList,
} = dfCharacterSlice.actions;

export default dfCharacterSlice.reducer;
