import { TextField } from "@mui/material"
import { memo } from "react"

export const ComponentInput = memo((
    {
        id,
        name,
        value,
        onChange,
        type,
        label,
        endAdornment = null,
        multiline = false,
        error = false,
        helperText = '',
    }:
        {
            id?: string,
            name: string,
            value: any,
            onChange?: any,
            type: any,
            label: string,
            endAdornment?: any,
            multiline?: boolean
            error?: boolean,
            helperText?: string,
        }) => {
    return (
        <TextField
            id={id}
            type={type}
            multiline={multiline}
            label={label}
            name={name}
            value={value}
            autoComplete='off'
            onChange={onChange}
            style={{
                width: '100%',
            }}
            error={error}
            helperText={helperText}
            InputLabelProps={{
                style: {
                    color: 'grey',
                },
            }}
            InputProps={{
                endAdornment,
                style: {
                    color: 'black',
                    height: '50px',
                    borderColor: 'black'
                },
            }}
            sx={{
                padding: '2px',
                margin: '4px',
                '& label.Mui-focused': {
                    color: 'indigo',
                },
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: 'fit-content',
                    '& fieldset': {
                        borderColor: '#2F3746',
                    },
                    '&:hover fieldset': {
                        borderColor: '#0B815A',
                    },
                },
            }}
        />
    );
});
