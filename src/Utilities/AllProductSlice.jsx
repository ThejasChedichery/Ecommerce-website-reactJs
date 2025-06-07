
import { createSlice } from "@reduxjs/toolkit";


const AllProductSlice = createSlice({

    name:"allProducts",
    initialState:{
        
        allItem:[]
    },
    reducers:{

        saveAllProduct:(state,action)=>{

            state.allItem= action.payload
            
        }
    }
})

export const {saveAllProduct} = AllProductSlice.actions;
export default AllProductSlice.reducer;