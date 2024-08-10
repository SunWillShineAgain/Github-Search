import { configureStore } from '@reduxjs/toolkit'
import repoSlice from './slices/repoSlice'
import currentRepoSlice from './slices/currentRepoSlice'

export const store = configureStore({
	reducer: {
		repos: repoSlice,
		currentRepo: currentRepoSlice,
	},
})
