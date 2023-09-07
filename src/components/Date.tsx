import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const ComponentDate = ({ value, title, onChange }:{ value:any, title:any, onChange:any }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    value={value}
                    label={title}
                    sx={{ display: 'flex' }}
                    onChange={onChange}
                />
            </LocalizationProvider>
        </>
    )
}
