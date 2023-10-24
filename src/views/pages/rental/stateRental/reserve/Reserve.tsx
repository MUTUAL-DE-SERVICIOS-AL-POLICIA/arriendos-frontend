import { Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemText, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";


export const Reserve = () => {

  const [ tabValue, setTabValue ] = useState(0)

  const allyProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box>
    </Box>
  )
}
