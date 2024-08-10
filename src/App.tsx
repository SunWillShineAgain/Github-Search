import { Box } from '@mui/material'
import SearchInput from './components/SearchInput/SearchInput'
import SearchTable from './components/SearchTable/SearchTable'
import RepoDetails from './components/RepoDetails/RepoDetails'

function App() {
	return (
		<Box sx={{ height: '100%' }}>
			<Box sx={{ padding: 2.5, background: '#00838F' }}>
				<SearchInput />
			</Box>
			<Box sx={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
				<SearchTable />
				<RepoDetails />
			</Box>
		</Box>
	)
}

export default App
