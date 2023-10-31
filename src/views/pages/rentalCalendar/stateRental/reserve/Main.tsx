import { Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { Requirement } from "."
import { useEffect, useState } from "react"
import { useRentalStore } from "@/hooks";

interface Props {
  rental: number;
  checkeds: (checked: Array<any>, checkedOptional: Array<any>) => void;
}

export const Reserver = (props: Props) => {

  const {
    rental,
    checkeds
  } = props

  const [tabValue, setTabValue] = useState(0)
  const [requirements, setRequirements] = useState([])
  const [optionals, setOptionals] = useState([])
  const [checkedItems, setCheckedItems] = useState<any[]>([])
  const [checkedItemsOptional, setCheckedItemsOptional] = useState<any[]>([])

  const { getRentalRequirements } = useRentalStore()


  const allyProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    (async () => {
      const req = await getRentalRequirements(rental)
      setRequirements(req.required_requirements)
      setOptionals(req.optional_requirements)
      const requireds = [...req.required_requirements.map((e: any) => {
        return {
          ...e,
          state: false
        }
      })]
      setCheckedItems(requireds)
      const optionals = [...req.optional_requirements.map((e: any) => {
        return {
          ...e,
          state: false
        }
      })]
      setCheckedItemsOptional(optionals)
    })()
  }, [])

  useEffect(() => {
    checkeds(checkedItems, checkedItemsOptional)
  }, [checkedItems, checkedItemsOptional])

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleChange} >
        <Tab label="Requeridos" {...allyProps(0)} />
        <Tab label="Opcionales" {...allyProps(1)} />
      </Tabs>
      {tabValue === 0 && (
        <Requirement
          documents={requirements}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      )}
      {tabValue === 1 && (
        <Requirement
          documents={optionals}
          checkedItems={checkedItemsOptional}
          setCheckedItems={setCheckedItemsOptional}
        />
      )}
    </Box>
  )
}