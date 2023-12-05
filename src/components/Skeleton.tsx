import { Avatar, Grid, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { ItemPaper } from ".";

interface ItemsProps {
  quantity: number;
}

export const SkeletonComponent = (props: ItemsProps) => {
  const { quantity } = props;

  const renderSkeletonCells = () => {
    const cells = [];
    for (let i = 0; i < quantity; i++) {
      cells.push(<TableCell key={i}><Skeleton animation="wave" /></TableCell>);
    }
    return cells;
  };

  return (
    <>
      <TableRow>
        {renderSkeletonCells()}
      </TableRow>
      <TableRow>
        {renderSkeletonCells()}
      </TableRow>
      <TableRow>
        {renderSkeletonCells()}
      </TableRow>
      <TableRow>
        {renderSkeletonCells()}
      </TableRow>
      <TableRow>
        {renderSkeletonCells()}
      </TableRow>
    </>
  );
};


export const SkeletonPropertie = () => {
  return (
    <ItemPaper elevation={2}>
      <Grid container>
        <Grid item xs={12} sm={3} sx={{ padding: '5px', textAlign: 'center' }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton variant="rectangular" width="100%" sx={{ my: 1 }}>
            <div style={{ paddingTop: '50%' }} />
          </Skeleton>
          <Stack sx={{ textAlign: 'center' }} direction="row" justifyContent="center" spacing={4}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} size="small">
              <TableBody>
                <SkeletonComponent
                  quantity={6}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </ItemPaper>
  )
}
