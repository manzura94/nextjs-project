import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FormData {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: string
  terms?: boolean
  picture?: string | undefined
  country: string
  timestamp?: number
}

interface FormState {
  uncontrolled: FormData[]
  controlled: FormData[]
  countries: string[]
  lastAddedTimestamp: number | null
}

const initialState: FormState = {
  uncontrolled: [],
  controlled: [],
  countries: [
    'USA',
    'Canada',
    'Mexico',
    'UK',
    'Germany',
    'France',
    'Uzbekistan',
    'Kazakhistan',
    'Kirgizistan',
    'Georgia',
    'Belarus',
    'Ukrain',
    'Russia',
    'China',
    'Japan',
    'India',
    'Brazil',
    'Australia',
    'South Africa',
  ],
  lastAddedTimestamp: null,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledData: (state, action: PayloadAction<FormData>) => {
      const timestamp = Date.now()
      state.uncontrolled.push({ ...action.payload, timestamp })
      state.lastAddedTimestamp = timestamp
    },
    addControlledData: (state, action: PayloadAction<FormData>) => {
      const timestamp = Date.now()
      state.controlled.push({ ...action.payload, timestamp })
      state.lastAddedTimestamp = timestamp
    },
    resetLastAddedTimestamp: (state) => {
      state.lastAddedTimestamp = null
    },
  },
})

export const {
  addControlledData,
  addUncontrolledData,
  resetLastAddedTimestamp,
} = formSlice.actions
export default formSlice.reducer
