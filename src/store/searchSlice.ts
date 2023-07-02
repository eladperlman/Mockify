import { createSlice } from '@reduxjs/toolkit';
import { Filters } from '../global/constants';
import { ISearchState } from './interfaces';

const initialState: ISearchState = { filter: Filters.NONE };

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
