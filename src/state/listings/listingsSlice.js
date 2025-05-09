import { createSlice } from '@reduxjs/toolkit';
import { filter, includes } from 'lodash';

const initialState = {
  listings: [],
  error: null,
  favoriteListingIds: [],
  status: 'idle',
};

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action) => {
      const { id } = action.payload;

      if (includes(state.favoriteListingIds, id)) {
        return;
      }

      state.favoriteListingIds.push(id);
    },
    removeFavoriteListing: (state, action) => {
      const { id } = action.payload;

      if (!includes(state.favoriteListingIds, id)) {
        return;
      }

      state.favoriteListingIds = filter(
        state.favoriteListingIds,
        (listingId) => listingId !== id,
      );
    },
  },
});

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;
