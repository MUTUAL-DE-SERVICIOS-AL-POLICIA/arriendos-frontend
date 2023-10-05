import { ComponentButton, ComponentInput } from "@/components";
import { useEventStore, useProductStore, useSelectedProductStore } from "@/hooks";
import { HighlightOffOutlined, ProductionQuantityLimits } from "@mui/icons-material";
import { Autocomplete, Chip, Collapse, Divider, FormControl, Grid, Grow, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { SelectChangeEvent } from '@mui/material/Select';


const dividerStyle = {
  height: '1px',
  width: '90%',
  marginTop: '5px',
  marginBottom: '5px',
  backgroundColor: '#085139',
  marginLeft: '15px'
}
const container = {
  borderRadius: '20px',
  padding: '5px',
  backgroundColor: '#F7F4F4'
}

interface RenderItemOptions {
  item: any;
  handleRemoveProduct: (item: string) => void;
}

const dateSelected = (date: Date) => {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}


export const CartSelectedProduct = ( selected: any ) => {
  const [ , setScreenHeight ] = useState(window.innerHeight);
  const [ showGrow, setShowGrow ] = useState(false);
  const [ product, setProduct ] = useState('') // Producto seleccionado
  const [ shoppingCart, setShoppingCart ] = useState(Array<Object>) // Productos seleccionados
  const [ products, setProducts ] = useState(Array<Object>) // Productos seleccionados
  const [ detail, setDetail ] = useState('')
  const [ value, setValue ] = useState<object | string | null>({name: 'sin eventos'})
  const [ inputValue, setInputValue ] = useState('')

  const { selectedProducts } = useSelectedProductStore();
  const { events, getEvents } = useEventStore()
  const { leakedProducts =[], postCreateLeases} = useProductStore()


  const date = new Date(Date.parse(selected.day))

  useEffect(() => {
    setShowGrow(false);
    const timeoutId = setTimeout(() => {
      setShowGrow(true);
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [selected.day]);

  useEffect(() => {
    getEvents()
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);


  const handleAddProduct = (event: SelectChangeEvent) => {
    let objSelected:any = event.target.value;
    setProduct(objSelected)
    const now = dateSelected(date)
    if(!shoppingCart.includes(objSelected)) {
    // if(!shoppingCart.find((shop:any) => shop.product !== objSelected.id && shop.date !== now)) {
      setProducts((prev) => [{product: objSelected.id, date: now}, ...prev])
      // const productSelectedFound: any = objSelected.find((e:any) => e.id == )
      setShoppingCart((prev) => [objSelected, ...prev])
    } else {
      // console.log("entr aca")
    }
  }

  const handleRemoveProduct = (item: any) => {
    setShoppingCart((prev) => [...prev.filter((i: any) => i.id !== item)])
    setProducts((prev) => [...prev.filter((i: any) => i.product !== item)])
  }

  const handleEvents = (id: number, value: any) => {
    setValue(value)
    const productFound:any = products.find((element:any) => element.product == id)
    productFound.event_type = value.name
  }

  const handleInputDetail = (id: number, event: any) => {
    const inputDetail = event
    setDetail(inputDetail)
    const productFound:any = products.find((element:any) => element.product == id)
    productFound.detail = inputDetail
  }

  const handleCreation = () => {

    console.log(products)
    const request:any = new Object()
    request.customer = selected.customer.customer_type.id
    products.forEach((e:any) => {
      e.start_time = "15:00:00"
      e.end_time = "19:00:00"
    })
    request.selected_products = products
  }

  function renderItem({ item, handleRemoveProduct } : RenderItemOptions) {
    return (
      <Grid container>
        <ListItem
          sx={{display: 'block', margin: '0 auto'}}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              title="Delete"
              onClick={() => handleRemoveProduct(item.id)}
            >
              <HighlightOffOutlined color="primary"/>
            </IconButton>
          }
        >
          <div style={{ textAlign: 'center' }}>
              <Chip
              label={`${item.rate.name} ${item.hour_range.name} ${item.active_price.mount} Bs`}
              variant="outlined"
              icon={<ProductionQuantityLimits />}
              sx={{ marginBottom: '0px', backgroundColor: '#DEA427', textAlign: 'center' }}
            />
          </div>
        </ListItem>
          <Grid item xs={12} sm={12} sx={{padding: '2px 5px'}}>
            <FormControl sx={{ mr: 5, mb:.5, width: '100%'}} size="small">
              <Autocomplete
                value={value}
                onChange={(event:any, newValue: string | null) => handleEvents(item.id, newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                id="event"
                options={events}
                getOptionLabel={(option:any) => option.name}
                renderInput={(params) => <TextField {...params} label="Eventos" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} sx={{padding: '1px 5px'}}>
            <ComponentInput
              type={null}
              label="Detalle"
              name="Detail"
              value={detail}
              onChange={(event:any) => handleInputDetail(item.id, event.target.value)}
            />
          </Grid>
      </Grid>
    )
  }

  return (
    <div style={container}>
      {selectedProducts.length > 0 && <>
        <Typography variant="h6" style={{ textAlign: 'center' }}>Arriendos creados</Typography>
        <Grow in={showGrow} style={{transformOrigin: '0 0 0'}} {...(showGrow ? { timeout: 2300 } : {})}>
          <Paper sx={{ padding: '6px 0px', borderRadius: '10px', margin: '0 auto'}}>
            <div style={{ textAlign: 'center' }}>
              <Chip
                label={dateSelected(date)}
                variant="outlined"
                icon={<CalendarIcon />}
                sx={{ marginBottom: '0px', backgroundColor: '#DEA427', textAlign: 'center' }}
              />
            </div>
            <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', margin: '5px auto', padding: '0px 5px', borderRadius: '10px'}}>
              <ListItem sx={{ padding: '0px 10px' }}>
                <ListItemText primary="Cumpleaños " secondary="09:00 - 17:00"></ListItemText>
              </ListItem>
              <Divider style={dividerStyle} />
              <ListItem sx={{ padding: '0px 10px'}}>
                <ListItemText primary="Boda coronel" secondary="08:00 - 16:00"></ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Grow>
        <Grow in={selected.selected} style={{transformOrigin: '0 0 0'}} {...(selected.selected ? { timeout: 2300 } : {})}>
          <div>
            <Paper sx={{margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px'}}>
              <form>
                <Grid container>
                    <Grid item xs={12} sm={12} sx={{padding: '5px 5px'}}>
                      <FormControl sx={{ mr: 5, mb: .5, width: '100%'}} size="small">
                        <InputLabel id="products">Productos</InputLabel>
                        <Select
                          labelId="products"
                          id="product"
                          value={product}
                          label="products"
                          onChange={handleAddProduct}
                          sx={{borderRadius: 2}}
                        >
                          {leakedProducts.map((product: any) => (
                            <MenuItem key={product.id} value={product}>{`${product.rate.name} ${product.hour_range.name} ${product.active_price.mount} Bs`}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <List sx={{marginTop: 0, paddingTop: 0}}>
                      <TransitionGroup sx={{marginTop: 0, paddingTop: 0}}>
                        {shoppingCart.map((item:any) => (
                          <Collapse sx={{ marginTop: 0, paddingTop: 0 }} key={item.id}>{renderItem({item, handleRemoveProduct })}</Collapse>
                        ))}
                      </TransitionGroup>
                    </List>
                </Grid>
              </form>
            </Paper>
            <Grid container sx={{height: 50}}>
              <Grid item xs={12} sm={12} sx={{padding: '0px 2px'}}>
                <ComponentButton
                  text="Crear arriendo"
                  width="100%"
                  height="90%"
                  onClick={() => handleCreation()}
                />
              </Grid>
            </Grid>
          </div>
        </Grow>
      </>
      }
    </div>
  )
}
