import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TextField, Typography } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface autoCompleteProps {
    options: Array<string>;
    label: string;
    value: string[];
    onChange: (values: Array<string>) => void;
    error?: boolean,
    helperText?: string,
}
export const ComponentAutoCompleteSelect = (props: autoCompleteProps) => {
    const {
        options,
        label,
        value,
        onChange,
        error,
        helperText,
    } = props;

    return (
        <>
            <Autocomplete
                multiple
                options={options}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={value}
                onChange={(_: any, newValue) => onChange(newValue)}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option}
                    </li>
                )}
                renderInput={(params) => (
                    <>
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
                    </>
                )}
            />
            {error && (
                <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
            )}
        </>
    )
}