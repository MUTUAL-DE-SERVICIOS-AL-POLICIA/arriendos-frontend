import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { ClearIcon } from "@mui/x-date-pickers";

interface selectProps {
  label: string;
  handleSelect: (value: any) => void;
  options: any[];
  value: any;
  onClear?: () => void;
  disabled?: boolean;
  error?: boolean,
  helperText?: string,
}

export const SelectComponent = (props: selectProps) => {
  const {
    label,
    handleSelect,
    options,
    value,
    onClear,
    disabled = false,
    error,
    helperText,
  } = props;


  const onChange = (event: SelectChangeEvent) => {
    let objSelected: any = event.target.value;
    handleSelect(objSelected);
  }
  return (
    <>
      <FormControl
        sx={{
          mr: 5,
          mb: .5,
          width: '100%',
          padding: '5px',
          color: "red",
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'red' : 'black',
          },
        }}
        size="small">
        <InputLabel id="select" >{label}</InputLabel>
        <Select
          labelId="select"
          id="select"
          value={value}
          label="select"
          onChange={onChange}
          sx={{ borderRadius: 2 }}
          componentsProps={{}}
          slotProps={{}}
          disabled={disabled}
          endAdornment={
            (
              onClear && (value != "") && <InputAdornment position="end">
                <IconButton
                  onClick={onClear}
                  color="secondary"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          MenuProps={{
            style: {
              zIndex: 9999
            }
          }}
        >
          {
            options.map((value: any) => <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>)
          }
        </Select>
      </FormControl>
      {
        error && (
          <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
        )
      }
    </>
  )
}
