import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FormData {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: string
  terms: boolean
  picture: string | undefined
  country: string
}

interface FormState {
  uncontrolled: FormData[]
  controlled: FormData[]
  countries: string[]
}

const initialState: FormState = {
  uncontrolled: [],
  controlled: [],
  countries: ['USA', 'Canada', 'Mexico', 'UK', 'Germany', 'France'],
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolled.push(action.payload)
    },
    addControlledData: (state, action: PayloadAction<FormData>) => {
      state.controlled.push(action.payload)
    },
  },
})

export const { addControlledData, addUncontrolledData } = formSlice.actions
export default formSlice.reducer
