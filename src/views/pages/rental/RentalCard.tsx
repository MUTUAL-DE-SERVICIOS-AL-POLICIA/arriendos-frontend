import { Chip, Divider, Grow, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { CalendarIcon } from "@mui/x-date-pickers"
import { format } from "date-fns";
import esES from 'date-fns/locale/es';

const dividerStyle = {
    height: '1px',
    width: '90%',
    marginTop: '5px',
    marginBottom: '5px',
    backgroundColor: '#085139',
    marginLeft: '15px'
}

interface cardProps {
    showGrow: boolean;
    date: Date;
}

export const RentalCard = (props: cardProps) => {
    const {
        showGrow,
        date,
    } = props;
    return (
        <>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Arriendos creados</Typography>
            <Grow in={showGrow} style={{ transformOrigin: '0 0 0' }} {...(showGrow ? { timeout: 2300 } : {})}>
                <Paper sx={{ padding: '6px 0px', borderRadius: '10px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center' }}>
                        {!isNaN(date.getTime()) && <Chip
                            label={format(new Date(date), 'EEEE dd/MMMM/yyyy', { locale: esES })}
                            variant="outlined"
                            icon={<CalendarIcon />}
                            sx={{ marginBottom: '0px', backgroundColor: '#DEA427', textAlign: 'center' }}
                        />}
                    </div>
                    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', margin: '5px auto', padding: '0px 5px', borderRadius: '10px' }}>
                        <ListItem sx={{ padding: '0px 10px' }}>
                            <ListItemText primary="Cumpleaños " secondary="09:00 - 17:00"></ListItemText>
                        </ListItem>
                        <Divider style={dividerStyle} />
                        <ListItem sx={{ padding: '0px 10px' }}>
                            <ListItemText primary="Boda coronel" secondary="08:00 - 16:00"></ListItemText>
                        </ListItem>
                    </List>
                </Paper>
            </Grow>
        </>
    )
}
