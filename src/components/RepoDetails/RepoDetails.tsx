import { useDispatch, useSelector } from 'react-redux'
import styles from './RepoDetails.module.scss'
import { useEffect } from 'react'
import { fetchLanguages } from '../../redux/slices/currentRepoSlice'
import { Chip, Stack } from '@mui/material'
import { AppDispatch } from '../../redux/store'

const RepoDetails = () => {
	const repoState = useSelector((state: any) => state.currentRepo)
	const { repo, languages, message, loading } = repoState
	const dispatch = useDispatch<AppDispatch>()
	const url: any = repo.languages_url

	useEffect(() => {
		dispatch(fetchLanguages(url))
	}, [url])

	return (
		<div className={styles.details}>
			{loading ? (
				<p>{message}</p>
			) : (
				<>
					<h3>{repo.name}</h3>
					<p>{repo?.description}</p>
					<p>Лицензия: {repo.license?.key ?? 'нет'}</p>

					<Stack direction='row' spacing={1} alignItems='center'>
						Языки:
						{Object.keys(languages).length ? (
							<span>
								{Object.keys(languages).map(item => {
									return <Chip sx={{ marginLeft: 1 }} key={item} label={item} />
								})}
							</span>
						) : (
							' не указаны'
						)}
					</Stack>
				</>
			)}
		</div>
	)
}

export default RepoDetails
