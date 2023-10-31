import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

interface Props {
	headers: Array<string>;
	data: Array<string>;
}

export const ComponentTableContent = (props: Props) => {

	const {
		headers,
		data
	} = props;

	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 350 }}>
			<Table stickyHeader size="small" sx={{ border: '1px solid #ccc', borderCollapse: '0'}}>
				<TableHead>
					<TableRow>
					{headers.map((elem, index) => (
							<TableCell key={index} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#AEEDE1'}}>{elem}</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data && data.map((_, index_body) => {
						if(index_body % headers.length === 0) {
							return (
								<TableRow>
									{ headers.map(() => ( <TableCell align="right">{data[index_body++]}</TableCell> ))}
								</TableRow>
						)}
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}