import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import esES from 'date-fns/locale/es';
import dayjs from 'dayjs';
interface timeProps {
    date: Date,
    value: Date;
    onChange: (start: string, end: string) => void;
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
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00.000000`;
    };

    const handleChange = (time: dayjs.Dayjs | null) => {
        if (time == null) return;
        const timeInit: Date = time.toDate();
        const dateStart: Date = new Date(date);
        dateStart.setHours(timeInit.getHours());
        dateStart.setMinutes(timeInit.getMinutes());
        const dateEnd: Date = new Date(dateStart);
        dateEnd.setHours(dateStart.getHours() + timeAdd);
        dateEnd.setMinutes(timeInit.getMinutes());
        const timeStart = formatDate(dateStart);
        const timeEnd = formatDate(dateEnd);
        onChange(timeStart, timeEnd);
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
                            value={dayjs(value)}
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
                </Grid>
            </Grid>
            {error && (
                <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
            )}
        </>
    )
}
