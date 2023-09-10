import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    filteredData: [],
    isFilter: false
}

const productSlice = createSlice({
    name: "products",
    initialState,

    reducers: {
        setProductData: (state, action) => {
            state.productData = action.payload;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        setIsFilter: (state: { isFilter: boolean }, action: { payload: boolean }) => {
            state.isFilter = action.payload;
        }
    }
})


export default productSlice.reducer;
export const { setProductData, setIsFilter, setFilteredData } = productSlice.actions; 