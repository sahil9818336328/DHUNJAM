import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// INITIAL STATE
const initialState = {
  id: null,
  token: '',
  isLoading: false,
  data: null,
}

// FOR DATA PERSISTANCE
const storedIdFromLocalStorage = localStorage.getItem('id')
const retrievedId = parseInt(storedIdFromLocalStorage)

// UPDATE AMOUNT
export const updateAmount = createAsyncThunk(`user/updateAmount`, (data) => {
  return axios
    .put(`https://stg.dhunjam.in/account/admin/${data.id}`, data)
    .then((response) => response.data)
    .catch((error) => console.log(error))
})

// GET ADMINS DETAILS
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
    // SET USER DETAILS IN REDUX FROM API RESPONSE FOR FURTHER OPERATIONS
    setUserDetails: (state, { payload }) => {
      const { id, token } = payload
      state.id = id
      state.token = token
    },
    logoutUser: () => {
      localStorage.removeItem('id')
      return initialState
    },
  },

  // TWO API'S FOR GETTING ADMIN DETAILS AND UPDATING AMOUNTS
  extraReducers: (builder) => {
    builder
      .addCase(updateAmount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAmount.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = {
          ...state.data,
          // GET ALL PREVIOUS AMOUNT VALUES, AND REPLACE THEM WITH THE RESPONSE COMING FROM AN API
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

export const { setUserDetails, logoutUser } = userSlice.actions

export default userSlice.reducer
