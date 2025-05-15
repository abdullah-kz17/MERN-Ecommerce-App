// src/store/user/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/axiosInstance';

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await axiosPrivate.get('/user');
    return data.users;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (id, thunkAPI) => {
  try {
    await axiosPrivate.delete(`/user/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateUser = createAsyncThunk('user/update', async ({ id, updates }, thunkAPI) => {
  try {
    const { data } = await axiosPrivate.put(`/user/${id}`, updates);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
