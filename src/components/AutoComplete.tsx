import { Autocomplete, TextField, Typography } from "@mui/material"

interface autoCompleteProps {
    options: Array<string>;
    setValue: (value: string) => void;
    label: string;
    error?: boolean,
    helperText?: string,
}

export const ComponentAutoComplete = (props: autoCompleteProps) => {
    const {
        options,
        setValue,
        label,
        error,
        helperText,
    } = props;
    return (
        <>
            <Autocomplete
                freeSolo
                disableClearable
                options={options}
                onInputChange={(_, newInputValue) => setValue(newInputValue)}
                renderInput={(params) =>

                    <TextField
                        {...params}
                        label={label}
                        error={error}
                        InputProps={{
                            ...params.InputProps,
                            style: {
                                color: 'black',
                                minHeight: '50px',
                                borderColor: 'black'
                            },
                        }}
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
                                '& fieldset': { borderColor: '#2F3746' },
                                '&:hover fieldset': { borderColor: '#0B815A' },
                            },
                        }}
                    />
                }
            />
            {error && (
                <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
            )}
        </>
    )
}
