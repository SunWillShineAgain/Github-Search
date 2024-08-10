import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface initState {
	repos: []
	loading: boolean
	error: boolean
	message: string
}

const initialState: initState = {
	repos: [],
	loading: false,
	error: false,
	message: 'Добро пожаловать! Введите имя юзера',
}

export const fetchReposFromAPI: any = createAsyncThunk(
	'fetchRepos/fetchReposFromAPI',
	async (value: string, { rejectWithValue }) => {
		try {
			const response = await axios(
				`https://api.github.com/users/${value}/repos`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/vnd.github+json',
						'X-GitHub-Api-Version': '2022-11-28',
						Authorization: `Bearer ${import.meta.env.VITE_URL}`,
					},
				}
			)

			const repos: [] = await response.data
			return { repos }
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

const reposSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchReposFromAPI.pending, state => {
				state.loading = false
				state.message = 'Загрузка...'
			})
			.addCase(fetchReposFromAPI.fulfilled, (state, { payload }) => {
				state.loading = true
				state.repos = payload.repos
			})
			.addCase(fetchReposFromAPI.rejected, state => {
				state.error = true
				state.loading = false
			})
	},
})

export default reposSlice.reducer
