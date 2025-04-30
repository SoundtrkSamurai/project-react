import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { filter, includes } from 'lodash';

import api from '@/api';

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }

        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);

    return response.data;
  },
);

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;
