import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import esES from 'date-fns/locale/es';
import dayjs from 'dayjs';
interface timeProps {
    date: Date,
    value: Date | string;
    onChange: (start: Date, end: Date) => void;
    timeAdd: number;
    error?: boolean,
    helperText?: string,
}

export const ComponentInputTime = (props: timeProps) => {
    const {
        date,
        value,
        onChange,
        timeAdd,
        error = false,
        helperText,
    } = props;

    const handleChange = (time: dayjs.Dayjs | null) => {
        if (time == null) return;
        const timeInit: Date = time.toDate();
        const dateStart: Date = new Date(date);
        dateStart.setHours(timeInit.getHours());
        dateStart.setMinutes(timeInit.getMinutes());
        const dateEnd: Date = new Date(dateStart);
        dateEnd.setHours(dateStart.getHours() + timeAdd);
        dateEnd.setMinutes(timeInit.getMinutes());
        console.log(`INICIO ${dateStart}`);
        console.log(`FIN ${dateEnd}`);
        console.log(`INICIO JSON${dateStart.toJSON()}`);
        console.log(`FIN JSON${dateEnd.toJSON()}`);
        onChange(dateStart, dateEnd);
    };

    return (
        <>
            <Grid container sx={{ alignItems: 'center' }} >
                <Grid item xs={12} sm={6} >
                    <Typography>{format(new Date(date), 'EEEE dd/MMMM/yyyy', { locale: esES })}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Hora"
                            value={value == null ? null : dayjs(value)}
                            onChange={(value) => handleChange(value)}
                            sx={{
                                padding: '2px',
                                margin: '4px',
                                '& label.Mui-focused': {
                                    color: 'black',
                                },
                                '& label:not(.Mui-focused)': {
                                    color: 'black',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    height: 'fit-content',
                                    '& fieldset': { borderColor: error ? 'red' : '#2F3746' },
                                    '&:hover fieldset': { borderColor: '#0B815A' },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    {error && (
                        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
                    )}
                </Grid>
            </Grid>
        </>
    )
}
