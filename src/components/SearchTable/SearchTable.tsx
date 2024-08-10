import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import styles from './SearchTable.module.scss'
import { setCurrentRepo } from '../../redux/slices/currentRepoSlice'
import { useState } from 'react'

const SearchTable = () => {
	const reposState = useSelector((state: any) => state.repos)
	const { repos, loading, message } = reposState
	const dispatch = useDispatch()

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	console.log(reposState)

	return (
		<>
			<div className={styles.table}>
				{loading ? (
					<>
						<h3>Результаты поиска</h3>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} size='small'>
								<TableHead>
									<TableRow>
										<TableCell>Название</TableCell>
										<TableCell align='right'>Язык</TableCell>
										<TableCell align='right'>Число форков</TableCell>
										<TableCell align='right'>Число звёзд</TableCell>
										<TableCell align='right'>Дата обновления</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{repos
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((repo: any) => (
											<TableRow
												className={styles.tableRow}
												key={repo.id}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
												}}
												onClick={() => dispatch(setCurrentRepo(repo))}
											>
												<TableCell>{repo.name}</TableCell>
												<TableCell align='right'>{repo.language}</TableCell>
												<TableCell align='right'>{repo.forks_count}</TableCell>
												<TableCell align='right'>
													{repo.stargazers_count}
												</TableCell>
												<TableCell align='right'>
													{repo.pushed_at
														.split('T')[0]
														.split('-')
														.reverse()
														.join('.')}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component='div'
							count={repos.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</>
				) : (
					<p>{message}</p>
				)}
			</div>
		</>
	)
}

export default SearchTable
