import { useDamageStore, useExtraHourStore, useRentalStore } from "@/hooks"
import { MoreVert, Print } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"

interface Props {
  options: any[]
  // reprintHandler: () => void
  rental?: number
  event?: number
}

export const MenuComponent = (props: Props) => {

  const {
    options,
    // reprintHandler
    rental,
    event
  } = props
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { postSendRequirements, getPrintReturnWarrantyForm, getPrintWarrantyReturn, postPrintDeliveryForm } = useRentalStore()
  const { postRegisterExtraHour } = useExtraHourStore()
  const { postRegisterDiscountWarranty } = useDamageStore()

  const reprintHandler = (type: number) => {
    if(event && rental) {
      switch(type) {
        case 4:
          postPrintDeliveryForm({
            rental,
            product: event
          })
          break
        case 5:
          postRegisterExtraHour(rental, {selected_product: event})
          break
        case 6:
          postRegisterDiscountWarranty({
            rental,
            product: event
          })
          break
      }
    } else if(rental) {
      switch(type) {
        case 1:
          postSendRequirements({rental})
          break
        case 2:
          getPrintReturnWarrantyForm(rental)
          break
        case 3:
          getPrintWarrantyReturn(rental)
          break
      }
    }
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={ open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: 48 * 5.2,
            width: '30ch'
          }
        }}
      >
        {options.map((option:any) => (
          <MenuItem
            key={option.id}
            selected={option.name === 'Py'}
            onClick={() => reprintHandler(option.id)}
          >
            <Print fontSize="small"/> {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}