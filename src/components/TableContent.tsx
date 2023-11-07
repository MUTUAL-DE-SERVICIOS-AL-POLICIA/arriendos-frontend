import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { styled } from "@mui/system";

interface Props {
	headers: Array<string>;
	data: any;
}

const StyledTableRow = styled(TableRow)(({theme}) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
}))

export const ComponentTableContent = (props: Props) => {
	const {
		headers,
		data
	} = props;

	const columns = data.length > 0 ? Object.keys(data[0]) : [];
	return (
		<TableContainer sx={{ borderRadius: 2, maxHeight: 350 }}>
			<Table stickyHeader size="small" sx={{ borderCollapse: 'collapse' }}>
				<TableHead>
					<TableRow>
						{headers.map((elem, index) => (
							<TableCell key={index} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#01DE87', }}>
								{elem}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row: any, index_body: number) => (
						<StyledTableRow key={index_body}>
							{columns.map((columnName, index) => (
								<TableCell key={index} sx={{border: '.1px solid grey'}}>{row[columnName]}</TableCell>
							))}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
};