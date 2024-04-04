import { createSlice } from '@reduxjs/toolkit';

const initialData = []
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialData,
    reducers: {
        toggleSelection: (state, action) => {
            const index = state.indexOf(action.payload);

            if (index !== -1) {
                // If the string is already in the array, remove it
                state.splice(index, 1);
            } else {
                // If the string is not in the array, add it
                state.push(action.payload);
            }
        },
        resetTagState: (state) => {
            // Reset the state to its initial value
            return initialData;
        },
    },
});

export const { toggleSelection, resetTagState } = filterSlice.actions;
export default filterSlice.reducer;