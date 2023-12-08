import { Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemText } from "@mui/material";

interface Props {
  documents: Array<any>;
  checkedItems: Array<any>;
  setCheckedItems: (newCheckedItems: Array<any>) => void;
}

export const Requirement = (props: Props) => {

  const {
    documents,
    checkedItems,
    setCheckedItems
  } = props

	const handleItemClick = (index: number) => {
		const newCheckedItems = [...checkedItems]
		newCheckedItems[index].state = !newCheckedItems[index].state
		setCheckedItems(newCheckedItems)
	}

  return (
    <List>
      {documents.map((optional: any, index: number) => (
        <ListItem
          style={{ borderRadius: '10px', marginBottom: '3px', backgroundColor: checkedItems[index].state ? '#E2F6F0' : '#f5f5f5', height: 55 }}
          button
          key={index}
          onClick={() => handleItemClick(index)}
          sx={{ paddingLeft: 5, paddingRight: 5 }}
        >
          <ListItemText primary={optional.name} secondary="requisito opcional del arriendo" />
          <FormGroup>
            <FormControlLabel
              value="end"
              label=""
              control={<Checkbox checked={checkedItems[index].state} />}
              labelPlacement="top"
            />
          </FormGroup>
        </ListItem>
      ))}
    </List>
  )
}