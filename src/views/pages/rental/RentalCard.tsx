import { Chip, Divider, Grow, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { CalendarIcon } from "@mui/x-date-pickers"
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import React from "react";

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
    date: Date | null;
    events: any[]
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
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(showGrow ? { timeout: 2300 } : {})}>
                <Paper sx={{ padding: '6px 0px', borderRadius: '10px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center' }}>
                        {date && <Chip
                            label={format(new Date(date), 'EEEE dd/MMMM/yyyy', { locale: esES })}
                            variant="outlined"
                            icon={<CalendarIcon />}
                            sx={{ marginBottom: '0px', backgroundColor: '#DEA427', textAlign: 'center' }}
                        />}
                    </div>
                    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', margin: '5px auto', padding: '0px 5px', borderRadius: '10px' }}>
                        {events.map((e: any, index: number) => (
                            <React.Fragment key={index}>
                                <ListItem sx={{ padding: '0px 10px' }}>
                                    <ListItemText
                                        primary={e.title}
                                        secondary={format(new Date(e.start), 'HH:mm', { locale: esES }) + " - " + format(new Date(e.end), 'HH:mm', { locale: esES })}></ListItemText>
                                </ListItem>
                                {index !== events.length - 1 && <Divider style={dividerStyle} />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Grow>
        </>
    )
}
