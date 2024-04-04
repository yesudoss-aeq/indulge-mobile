const { createSlice } = require('@reduxjs/toolkit');
import axios from "axios";
import { STATUSES } from "./objects";

const likeReelSlice = createSlice({
    name: 'likeReel',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setLikeReelData(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setLikeReelData, setStatus } = likeReelSlice.actions;
export default likeReelSlice.reducer;

export function fetchLikeReelData(mobile_no, tag) {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            let api = tag ? `https://www.indulge.blokxlab.com/get-liked-reels?mobile_no=${mobile_no}&tags=${tag}` : `https://www.indulge.blokxlab.com/get-liked-reels?mobile_no=${Number(mobile_no)}`;
            const response = await axios.get(api);
            console.log("=======response:liked reels:::", response.data.videos)
            dispatch(setLikeReelData(response.data.videos));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log("Liked reels fetch error:", err)

            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}