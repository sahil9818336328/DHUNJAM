import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  id: null,
  token: '',
  isLoading: false,
  data: null,
}

const storedIdFromLocalStorage = localStorage.getItem('id')
const retrievedId = parseInt(storedIdFromLocalStorage)

export const updateAmount = createAsyncThunk(`user/updateAmount`, (data) => {
  return axios
    .put(`https://stg.dhunjam.in/account/admin/${data.id}`, data)
    .then((response) => response.data)
    .catch((error) => console.log(error))
})

export const adminDetails = createAsyncThunk(`user/adminDetails`, (id) => {
  return axios
    .get(`https://stg.dhunjam.in/account/admin/${retrievedId || id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error))
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, { payload }) => {
      const { id, token } = payload
      state.id = id
      state.token = token
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateAmount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAmount.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = {
          ...state.data,
          amount: { ...state.data.amount, ...action.payload.data.amount },
        }
      })
      .addCase(updateAmount.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(adminDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(adminDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data
      })
      .addCase(adminDetails.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setUserDetails } = userSlice.actions

export default userSlice.reducer
