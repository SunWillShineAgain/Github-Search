import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface initState {
	repo: []
	loading: boolean
	languages: {}
	message: string
}

const initialState: initState = {
	repo: [],
	loading: false,
	languages: {},
	message: 'Выберите репозиторий',
}

export const setCurrentRepo: any = createAsyncThunk(
	'currentRepo/setCurrentRepo',
	(repo: []) => repo
)

export const fetchLanguages = createAsyncThunk(
	'currentRepo/fetchLanguages',
	async (url: any, { rejectWithValue }) => {
		try {
			const response = await axios(url, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.github+json',
					'X-GitHub-Api-Version': '2022-11-28',
					// Authorization: `Bearer ${import.meta.env.VITE_URL}`,
				},
			})

			const langs = await response.data

			return { langs }
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

const currentRepoSlice = createSlice({
	name: 'repo',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(setCurrentRepo.pending, state => {
				state.loading = true
			})
			.addCase(setCurrentRepo.fulfilled, (state, { payload }) => {
				state.repo = payload
				state.loading = false
				state.message = 'Загрузка...'
			})
			.addCase(fetchLanguages.pending, state => {
				state.loading = true
			})
			.addCase(fetchLanguages.fulfilled, (state, { payload }) => {
				state.languages = payload.langs
				state.loading = false
			})
	},
})

export default currentRepoSlice.reducer
