import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

interface Props {
	headers: Array<string>;
	data: any;
}

export const ComponentTableContent = (props: Props) => {
	const {
		headers,
		data
	} = props;

	const columns = data.length > 0 ? Object.keys(data[0]) : [];
	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 350 }}>
			<Table stickyHeader size="small" sx={{ border: '1px solid #ccc', borderCollapse: '0' }}>
				<TableHead>
					<TableRow>
						{headers.map((elem, index) => (
							<TableCell key={index} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#AEEDE1' }}>
								{elem}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row: any, index_body: number) => (
						<TableRow key={index_body}>
							{columns.map((columnName, index) => (
								<TableCell key={index}>{row[columnName]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
};