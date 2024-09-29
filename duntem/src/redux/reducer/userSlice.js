import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        id:'',
        advantureGroup:'',
    },
    reducers:{
        registNowUser: (state,action) => {
            state.advantureGroup = action.payload.advantureGroup;
            state.id = action.payload.id;
        },
        updateFireBaseAdvantureGroup: (state,action) => {
            state.advantureGroup = action.payload.advantureGroup
        }
    }
})
export const { registNowUser,updateFireBaseAdvantureGroup} = userSlice.actions

export default userSlice.reducer