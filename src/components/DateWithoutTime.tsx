import React from 'react'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

interface Props {
  label: string
  value: any
  onChange: any
}

export const ComponentDateWithoutTime = React.memo((props: Props) => {

  const {
    label, value, onChange
  } = props

  return (
    <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  )

})