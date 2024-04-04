const { createSlice } = require('@reduxjs/toolkit');
import axios from "axios";
import { fetchData } from "../service/ApiService";
import { STATUSES } from "./objects";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts(tag) {
    console.log("tag:::::::::::::", tag)
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            let api = tag ? `/get-all-videos?tags=${tag}` : `/get-all-videos`
            const responseData = await fetchData(api);
            dispatch(setProducts(responseData.videos));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
