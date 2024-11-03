import { createSlice } from "@reduxjs/toolkit";

export const dfCharacterListSlice = createSlice({
  name: "user",
  initialState: {
    rows: [],
  },
  reducers: {
    updateCharacterList: (state, action) => {
      // initialState.rows = action.payload
      state.rows = action.payload;
    },
    addCharacterToList: (state, action) => {
      if (state.rows) {
        const newArray = [...state.rows];
        //[ㅁ,ㅁ,Undefined] 형식으로 오는 데이터에
        //언디파인드 앞에 데이터 추가하고
        //제일 뒷부분 제거
        const index = newArray.findIndex((v) => v === undefined);
        newArray.splice(index, 0, action.payload);
        newArray.pop();

        state.rows = [...newArray];
      } else {
        state.rows = action.payload;
      }

      console.log("result state: ", state.rows);
    },
    clearCharacterData: (state, action) => {
      state = dfCharacterListSlice.getInitialState();
    },
    removeCharaterData: (state, action) => {
      const newArray = [...state.rows];
      const idx = state.rows.findIndex((v) => v.characterId === action.payload);
      newArray.splice(idx, 1);
      state.rows = newArray;
      console.log(state.rows);
    },
  },
});
export const { updateCharacterList, addCharacterToList, removeCharaterData } =
  dfCharacterListSlice.actions;

export default dfCharacterListSlice.reducer;
