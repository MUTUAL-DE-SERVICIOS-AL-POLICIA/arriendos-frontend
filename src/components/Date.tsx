import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, CircularProgress, DialogActions, IconButton, Stack } from '@mui/material';
import { ComponentButton } from '.';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { CancelOutlined, EditCalendar } from '@mui/icons-material';

interface dateProps {
  date: Date;
  title: string;
  timeAdd: number;
  onSave: (start: Date, end: Date) => void;
  loading: boolean;
}

export const ComponentDate = (props: dateProps) => {
  const {
    date,
    title,
    onSave,
    timeAdd,
    loading = false,
  } = props;
  const [newDate, setNewDate] = useState<Date | null>(null);


  const handleChange = () => {
    const dateStart: Date = newDate!;
    const dateEnd: Date = new Date(dateStart);
    dateEnd.setHours(dateStart.getHours() + timeAdd);
    dateEnd.setMinutes(dateStart.getMinutes());
    onSave(dateStart, dateEnd);
  };

  return (
    <>
      {
        newDate ?
          <Stack direction="row" style={{ padding: '8px' }}>
            <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={dayjs(date)}
                label={title}
                ampm
                onChange={(v) => setNewDate(v!.toDate())}
                minDate={dayjs(date)}
                shouldDisableDate={(dateParam) => {
                  return dateParam.toDate().getDay() !== date.getDay();
                }}
                shouldDisableYear={(dateParam) => {
                  return dateParam.toDate().getFullYear() !== date.getFullYear();
                }}
                slotProps={{
                  popper: {
                    sx: {
                      zIndex: 9999
                    }
                  },
                }}
                sx={{
                  display: 'flex',
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
                    '& fieldset': { borderColor: '#2F3746' },
                    '&:hover fieldset': { borderColor: '#0B815A' },
                  },
                }}
              />
            </LocalizationProvider>
            <DialogActions>
              {
                loading ?
                  <CircularProgress color="success" size={30} /> :
                  <>
                    <Button onClick={() => handleChange()} >
                      {'GUARDAR'}
                    </Button>
                    <IconButton onClick={() => setNewDate(null)} color="error">
                      <CancelOutlined />
                    </IconButton>
                  </>
              }
            </DialogActions>
          </Stack> :
          <ComponentButton
            text={`Cambiar fecha`}
            onClick={() => setNewDate(date)}
            sx={{ height: "35px", width: "90%", margin: "7px 10px" }}
            startIcon={<EditCalendar />}
          />
      }
    </>
  )
}
