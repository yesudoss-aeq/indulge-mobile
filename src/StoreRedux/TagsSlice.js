import { createSlice } from '@reduxjs/toolkit';
let initialState = []
const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        toggleTag: (state, action) => {
            const tagToToggle = action.payload;
            if (state?.includes(tagToToggle)) {
                // Remove the tag if it exists
                return [];
            } else {
                // Add the tag if it doesn't exist
                return [tagToToggle];
            }
        },
        setInitialTagArray: (state, action) => {
            // Set the initial array with the provided payload
            return initialState;
        },
    }
});

export const { toggleTag, setInitialTagArray } = tagsSlice.actions;
export default tagsSlice.reducer;
