import { Card, CardContent, Grid, Typography } from "@mui/material"
interface infoProps {
	selectedEvent: any;
}
export const InfoRental = (props:infoProps) => {
    const {
        selectedEvent
    } = props;
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card variant="outlined" sx={{ margin: '0px 0px 12px 0px', borderRadius: '10px' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                            <i>{selectedEvent.title}</i>
                        </Typography>
                        <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                            {/* &emsp;<b>Fecha inicial:</b> {convertDateWithTime(selectedEvent.start)} */}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                            {/* &emsp;<b>Fecha final:</b> {convertDateWithTime(selectedEvent.end)} */}
                        </Typography>
                        <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                            &emsp;<b>Detalle:</b> Algun detalle
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" >
                    <CardContent></CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" >
                    <CardContent></CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
