import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    loginUser,
    createUser
} from './authAPI';


const initialState = {
    loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
    status: 'idle',
    error: null,
    userChecked: false,
    mailSent: false,
    passwordReset: false
};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
        const response = await createUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, { rejectWithValue }) => {
        try {
            const response = await loginUser(loginInfo);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);


export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload;
            })


            .addCase(loginUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
    },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;


export default authSlice.reducer;