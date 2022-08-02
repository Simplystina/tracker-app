import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from './userThunk';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  loggedin: false,
  registered: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    const ans = await loginUserThunk('/auth/login', user, thunkAPI);
    console.log(ans, "login user")
    return ans
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
  
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        console.log(payload,"logout payload")
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
      state.registered = true
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.registered = false
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
      state.loggedin= true
      
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.loggedin = false
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`User Updated!`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      toast.error('There was an error..');
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
