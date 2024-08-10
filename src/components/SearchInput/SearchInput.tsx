import { Box, Button, TextField } from '@mui/material'
import styles from './SearchInput.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchReposFromAPI } from '../../redux/slices/repoSlice'

const SearchInput = () => {
	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()

	const dispatchRepos = (value: string) => {
		if (value.trim()) {
			dispatch(fetchReposFromAPI(value))
		}
	}

	const buttonHandler = () => {
		dispatchRepos(inputValue)
	}

	const enterHandler = (e: any) => e.keyCode === 13 && dispatchRepos(inputValue)

	useEffect(() => {
		document.addEventListener('keydown', enterHandler)

		return () => {
			document.removeEventListener('keydown', enterHandler)
		}
	}, [enterHandler])

	return (
		<>
			<Box
				component='form'
				sx={{ display: 'flex', gap: 4 }}
				onSubmit={e => e.preventDefault()}
			>
				<TextField
					type='text'
					className={styles.input}
					fullWidth
					variant='outlined'
					size='small'
					placeholder='GitHub username'
					value={inputValue}
					onKeyDown={e => enterHandler(e)}
					onChange={e => setInputValue(e.target.value)}
				/>
				<Button
					type='button'
					className={styles.button}
					variant='contained'
					onClick={buttonHandler}
				>
					Искать
				</Button>
			</Box>
		</>
	)
}

export default SearchInput
