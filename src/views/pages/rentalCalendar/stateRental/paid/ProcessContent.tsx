import { Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"

const allyProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export const ProcessContent = () => {
  return (
    <Box>
      <Tabs>
        <Tab value="Registro de pagos"></Tab>
        <Tab value="Registro de garantía"></Tab>
        <Tab value="Registro de horas extras"></Tab>
      </Tabs>
    </Box>
  )
}