import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack } from '@mui/material';
import { ComponentButton } from '.';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { EditCalendar } from '@mui/icons-material';

interface dateProps {
  date: Date;
  title: string;
  timeAdd: number;
  onSave: (start: Date, end: Date) => void;
}

export const ComponentDate = (props: dateProps) => {
  const {
    date,
    title,
    onSave,
    timeAdd,
  } = props;
  const [newDate, setNewDate] = useState<Date | null>(null);


  const handleChange = () => {
    const timeInit: Date = newDate!;
    const dateStart: Date = new Date(date);
    dateStart.setHours(timeInit.getHours());
    dateStart.setMinutes(timeInit.getMinutes());
    const dateEnd: Date = new Date(dateStart);
    dateEnd.setHours(dateStart.getHours() + timeAdd);
    dateEnd.setMinutes(timeInit.getMinutes());
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
            <Stack direction="column" style={{ padding: '8px' }}>
              <ComponentButton
                text={`Guardar`}
                height="25px"
                onClick={() => handleChange()}
                margin="1px"
              />
              <ComponentButton
                text={`Cancelar`}
                height="25px"
                onClick={() => setNewDate(null)}
                margin="1px"
              />
            </Stack>
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
