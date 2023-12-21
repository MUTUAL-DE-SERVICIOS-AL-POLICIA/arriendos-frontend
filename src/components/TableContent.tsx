import { Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box, styled } from "@mui/system";
import React  from "react";
import { useState } from "react";

interface Props {
  headers: Array<string>;
  data: any;
  useCollapse?: boolean;
  subTableTitle?: string;
  subTableHeaders?: Array<string>;
  subTableData?: any;
  sxHeader?: object;
}

const StyledTableRow = styled(TableRow, {shouldForwardProp: (prop) => prop !== 'useCollapse'})<{
  useCollapse?: boolean;
}> (({ theme, useCollapse }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: useCollapse ? 'pointer' : 'default',
  '&:hover': {
    backgroundColor: useCollapse ? '#D5D8DC': 'inherit',
  },
}))

export const ComponentTableContent = (props: Props) => {
  const {
    headers,
    data,
    useCollapse = false,
    subTableTitle = "",
    subTableHeaders,
    subTableData,
    sxHeader = {fontWeight: 'bold', backgroundColor: '#58D68D'},
  } = props;

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  let subColumns:any = []
  if(subTableData && subTableData.length !== 0) {
    subColumns = subTableData.length > 0 ? Object.keys(subTableData[0].selected_product[0]) : []
  }
  const [ openRows, setOpenRows ] = useState<Array<boolean>>(Array(data.length).fill(false))


  const handleRowClick = (index: number) => {
    const updatedOpenRows = [...openRows]
    updatedOpenRows[index] = !updatedOpenRows[index]
    setOpenRows(updatedOpenRows)
  }

  return (
    <TableContainer sx={{ borderRadius: 2, maxHeight: 600, paddingTop: 2 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {headers.map((elem, index) => (
              <TableCell key={index} sx={{...sxHeader}}>
                {elem}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: 'white'}}>
          {data.map((row: any, index_body: number) => (
            <React.Fragment key={index_body}>
              <StyledTableRow
                aria-label="expand row"
                onClick={() => useCollapse && handleRowClick(index_body)}
                useCollapse={useCollapse}
              >
                {columns.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{ borderBottom: '.1px solid #ccc' }}
                  >
                    {row[columnName]}
                  </TableCell>
                ))}
              </StyledTableRow>
              { useCollapse &&
                <TableRow>
                  <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        borderBottom: '.1px solid grey'
                    }}
                    colSpan={columns.length}
                  >
                    <Collapse in={openRows[index_body]} timeout={{appear: 100, enter: 900, exit: 250}} >
                      <Box sx={{margin: '7px 30px', paddingBottom: 2 }}>
                        <Typography variant="h6" gutterBottom component="div" sx={{fontWeight: 'bold'}}>
                          {subTableTitle }
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow
                              sx={{'&>*':
                                { borderBottom: '.1px solid grey',
                                  fontWeight: 'bold',
                                  backgroundColor: '#bdbdbd'
                                },
                                '&>*:first-of-type': {
                                  borderRadius: '7px 0 0 0'
                                },
                                '&>*:last-child': {
                                  borderRadius: '0 7px 0 0'
                                }
                            }}>
                              {subTableHeaders && subTableHeaders.map((columnName, index_sub_table) => (
                                <TableCell key={index_sub_table} sx={{fontWeight: 'bold'}}>
                                  {columnName}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody sx={{backgroundColor: 'white'}}>
                            {subTableData[index_body].selected_product.map((row:any, index_sub_body: number) => (
                              <TableRow key={index_sub_body} sx={{'&>*': { borderBottom: '.1px solid grey' }}}>
                                {subColumns && subColumns.length !== 0 && subColumns.map((columnName:any, index_sub:number) => (
                                  <TableCell key={index_sub} component="th" scope="row">
                                    {row[columnName]}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              }
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};