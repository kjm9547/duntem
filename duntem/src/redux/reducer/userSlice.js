import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        id:'',
        advantureGroup:'',
        accessToken:'',
        imgUrl:'',
        provider:'',
    },
    reducers:{
        signedDuntemUser: (state,action) => {
            state.advantureGroup = action.payload.advantureGroup;
            state.id = action.payload.id;
            state.accessToken = ''
            state.imgUrl = '';
            state.provider = "duntem";
        },
        signedGoogleUser: (state,action) => {
          console.log("payload",action.payload)
          state.id = action.payload.id;
          state.advantureGroup = action.payload.advantureGroup;
          state.accessToken = action.payload.accessToken;
          state.imgUrl = action.payload.imgUrl;
          state.provider = action.payload.provider;
        },
        updateFireBaseAdvantureGroup: (state,action) => {
            state.advantureGroup = action.payload.advantureGroup
        },
        clearUserData:(state,action) => {
            state = userSlice.getInitialState()
        }
    }
})
export const { 
    signedDuntemUser,
    updateFireBaseAdvantureGroup,
    signedGoogleUser,
    clearUserData
} = userSlice.actions

export default userSlice.reducer