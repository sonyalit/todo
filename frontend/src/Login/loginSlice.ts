import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, Credentials, User } from './types';

const initialState: AuthState = {
    authChecked: false,
    user: null,
    loginFormError: null,
};

export const getUser = createAsyncThunk(
    'user',
    () => {
        const userCheck = async (): Promise<
            | {
                exist: true;
                user: User;
            }
            | {
                exist: false;
            }
        > => (await fetch('/api/logout/user')).json();
        return userCheck();
    });

export const login = createAsyncThunk('login', async (credentials: Credentials) => {
    if (!credentials.username.trim() || !credentials.password.trim()) {
        throw new Error('Заполните все поля');
    }
    const fetchLogin = async (): Promise<User> => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (response.status >= 400) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const data = await response.json();
        return data.user;
    };
    return fetchLogin();
});

export const logout = createAsyncThunk(
    'logout',
    () => {
        const fetchLogout = async (): Promise<void> => {
            const response = await fetch('/api/logout');

            return response.json();
        };
        return fetchLogout();
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetLoginFormError: (state) => {
            state.loginFormError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.authChecked = true;
                state.user = action.payload.exist ? action.payload.user : null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loginFormError = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginFormError = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { resetLoginFormError } = authSlice.actions;

export default authSlice.reducer;
