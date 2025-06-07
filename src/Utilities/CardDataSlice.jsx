
import { createSlice } from "@reduxjs/toolkit";

const CardDataSlice = createSlice({

    name:"Cardarray",
    initialState:{

        CardItem:[],
        CardShow:[]

    },
    reducers:{
        saveCardData:(state,action)=>{

            state.CardItem = action.payload
        },
        showCardData:(state,action)=>{

            state.CardShow = action.payload
        }
    }
})

export const {saveCardData,showCardData} =CardDataSlice.actions;
export default CardDataSlice.reducer;