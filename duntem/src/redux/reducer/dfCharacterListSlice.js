import { createSlice } from "@reduxjs/toolkit";

export const dfCharacterListSlice = createSlice({
    name:"user",
    initialState:{
       rows:null,
    },
    reducers:{
        setArrayDataToCharacterList: (state,action)=> {
            
            // initialState.rows = action.payload
            state.rows = action.payload
            console.log("receive data",state.rows)
        },
        addCharacterToList: (state,action) => {
            
            const newArray = [...state.rows]
            
            const index = newArray.findIndex((v)=>v==undefined)
            newArray.splice(index,0,action.payload)
            state.rows = [...newArray]    

            console.log("result state: ",state.rows)
        },
        clearCharacterData:(state,action) => {
            state = dfCharacterListSlice.getInitialState()
        }
    }
})
export const { 
    setArrayDataToCharacterList,
    addCharacterToList
} = dfCharacterListSlice.actions

export default dfCharacterListSlice.reducer