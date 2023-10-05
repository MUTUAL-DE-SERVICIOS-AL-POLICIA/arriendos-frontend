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
    events: []
}

const getHours = (date:Date) => {
    const dateObject = new Date(date)
    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()
    const hourMinutes = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log(hourMinutes)
    return hourMinutes
}

export const RentalCard = (props: cardProps) => {
    const {
        showGrow,
        date,
        events,
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
                        {events.map((e:any, index: number) => (
                            <>
                                <ListItem sx={{ padding: '0px 10px' }}>
                                    <ListItemText key={e.id} primary={e.title} secondary={getHours(e.start)+ " - "+getHours(e.end) }></ListItemText>
                                </ListItem>
                                { index !== events.length - 1 && <Divider style={dividerStyle} /> }
                            </>
                        ))}
                    </List>
                </Paper>
            </Grow>
        </>
    )
}
