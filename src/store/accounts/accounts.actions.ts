

import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiClient } from "../../utils/api/apiClient";
import { handleAxiosError } from "../../utils/errors/handleAxiosError";
import { ILogin, IRegister } from "../../interfaces/account";
export const login = createAsyncThunk(
    'account/login',
    async (payload: ILogin, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/account/login', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);
export const register = createAsyncThunk(
    'account/register',
    async (payload: IRegister, { rejectWithValue }) => {
        try {
            console.log("______________________________________");
            console.log(payload);
            const response = await apiClient.post('/api/account/register', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);




