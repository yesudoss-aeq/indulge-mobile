// actions.js

// import { setLikedStatus } from "../LikeReelsSlice";
// import { likeReelApi } from "../services/likeReelApi";

export const likeReel = (reelId) => async (dispatch) => {
    try {
        // const response = await likeReelApi(reelId);
        // dispatch(setLikedStatus(response.liked));
    } catch (error) {
        // Handle error, dispatch an action, or log it
        console.error('Error in likeReel action:', error);
    }
};
