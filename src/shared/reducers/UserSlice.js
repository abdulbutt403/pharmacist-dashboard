import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authenticated : false,
  pharmacies: [],
  cart: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => {
      state.authenticated = true
      console.log('hello',state.authenticated )
    },
    signOut: (state) => {
      state.authenticated = false
      console.log(state)
    },
    setPharmacies: (state, action) => {
      const data = action.payload;
      if(!(state.pharmacies?.some(e => e.id === data.id)))
      state.pharmacies.push(data)
    },
    cartAdd: (state, action) => {
      const data = action.payload;
      if(!(state.cart?.includes(data)))
      state.cart.push(data)
    }
  },
})

// Action creators are generated for each case reducer function
export const { signIn, signOut,setPharmacies ,cartAdd} = userSlice.actions

export default userSlice.reducer