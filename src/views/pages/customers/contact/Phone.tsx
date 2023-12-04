import { ComponentInput } from "@/components"
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material"
import { Grid, IconButton, Typography } from "@mui/material"

interface phoneProps {
  phones: string[];
  onUpdate: (value: string[]) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const Phone = (props: phoneProps) => {
  const {
    phones,
    onUpdate,
    error,
    helperText,
    disabled = false,
  } = props;


  return (
    <>
      {
        phones.map((value, index) => {
          return (
            <Grid item key={index} sx={{ display: 'flex' }}>
              <ComponentInput
                type="text"
                label="Teléfono"
                name="phone"
                value={value}
                onChange={(V: any) => {
                  const phone = V.target.value;
                  const regex = /^$|^[0-9\b]+$/;
                  const item = regex.test(phone) ? phone : value;
                  onUpdate([...phones.map((e, i) => i === index ? item : e)])
                }}
                disabled={disabled}
              />
              {
                index === 0 ?
                  <IconButton onClick={() => onUpdate([...phones, ''])}>
                    <AddCircleOutline color="success" />
                  </IconButton> :
                  <IconButton onClick={() => onUpdate(phones.filter((_, i) => i !== index))}>
                    <DeleteOutline color="error" />
                  </IconButton>
              }
            </Grid>
          )
        })
      }
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
      )}
    </>
  )
}
