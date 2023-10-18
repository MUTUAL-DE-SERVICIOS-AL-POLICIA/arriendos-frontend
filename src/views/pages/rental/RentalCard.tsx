import { Chip, Divider, Grow, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { CalendarIcon } from "@mui/x-date-pickers"
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import React, { useEffect, useState } from "react";

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
  events: any[]
}
export const RentalCard = (props: cardProps) => {
  const {
    showGrow,
    date,
    events,
  } = props;
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  return (
    <>
      <>
        <Typography variant="h6" style={{ textAlign: 'center' }}>Alquileres creados</Typography>
        <Grow in={true} style={{ transformOrigin: '0 0 0 0' }} {...(showGrow ? { timeout: 2300 } : {})}>
          <Paper sx={{ padding: '6px 0px', borderRadius: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              {date && <Chip
                label={format(date, 'EEEE dd-MMMM-yyyy', { locale: esES })}
                icon={<CalendarIcon />}
                sx={{ backgroundColor: '#DEA427' }}
              />}
            </div>
            <div style={{ maxHeight: `${screenHeight / 3.5}px`, overflowY: 'auto' }}>
              <List sx={{ width: '100%' }}>
                {events.map((e: any, index: number) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ padding: '0px 10px' }}>
                      <ListItemText
                        primary={e.title}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Inicio:
                            </Typography>
                            {` ${format(e.start, 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
                            <br />
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Fin:
                            </Typography>
                            {` ${format(e.end, 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
                          </>
                        }
                      >
                      </ListItemText>

                    </ListItem>
                    {index !== events.length - 1 && <Divider style={dividerStyle} />}
                  </React.Fragment>
                ))}
              </List>
            </div>
          </Paper>
        </Grow>
      </>
    </>
  )
}
