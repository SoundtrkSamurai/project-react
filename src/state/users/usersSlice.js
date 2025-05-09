import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.users[user.id] = user;
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
// The above code defines a Redux slice for managing user data. It includes an initial state with an empty users object, a reducer to add a user to the state, and exports the action and reducer for use in the store. The slice is created using createSlice from Redux Toolkit, which simplifies the process of creating actions and reducers. The addUser action takes a user object as payload and adds it to the users object in the state using the user's id as the key.
// The slice is named 'users' and the initial state is set to an empty object. The addUser reducer takes the current state and an action as arguments, and adds the user to the state using the user's id as the key. The addUser action is exported for use in other parts of the application, and the reducer is exported as default for use in the store configuration.
