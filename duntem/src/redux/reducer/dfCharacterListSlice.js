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
            //[ㅁ,ㅁ,Undefined] 형식으로 오는 데이터에
            //언디파인드 앞에 데이터 추가하고
            //제일 뒷부분 제거
            const index = newArray.findIndex((v) => v === undefined);
            newArray.splice(index,0,action.payload);
            newArray.pop();

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