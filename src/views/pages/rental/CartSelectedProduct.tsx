import { useProductStore, useSelectedProductStore } from "@/hooks";
import { Collapse, FormControl, Grow, InputLabel, List, MenuItem, Paper, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { SelectChangeEvent } from '@mui/material/Select';
import { RentalCard } from ".";
import { CardEvent } from "./createRental";

const dateSelected = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}


export const CartSelectedProduct = (selected: any) => {
  const [showGrow, setShowGrow] = useState(false);
  const [product, setProduct] = useState('') // Producto seleccionado
  const [shoppingCart, setShoppingCart] = useState(Array<Object>) // Productos seleccionados
  const [products, setProducts] = useState(Array<Object>) // Productos seleccionados


  const { selectedProducts } = useSelectedProductStore();
  const { leakedProducts = [] } = useProductStore()


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


  const handleAddProduct = (event: SelectChangeEvent) => {
    let objSelected: any = event.target.value;
    setProduct(objSelected)
    const now = dateSelected(date)
    console.log(now)
    if (!shoppingCart.includes(objSelected)) {
      // if(!shoppingCart.find((shop:any) => shop.product !== objSelected.id && shop.date !== now)) {
      setProducts((prev) => [{ product: objSelected.id, date: now }, ...prev])
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

  const handleCreation = () => {
    console.log(products)
    const request: any = new Object()
    request.customer = selected.customer.customer_type.id
    products.forEach((e: any) => {
      e.start_time = "15:00:00"
      e.end_time = "19:00:00"
    })
    request.selected_products = products
  }

  return (
    <div style={{ borderRadius: '20px', padding: '5px', backgroundColor: '#F7F4F4' }}>
      {selectedProducts.length > 0 && <>
        <RentalCard
          showGrow={showGrow}
          date={date}
          events={selected.events}
        />
        <Grow in={selected.selected} style={{ transformOrigin: '0 0 0' }} {...(selected.selected ? { timeout: 2300 } : {})}>
          <Paper sx={{ margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px' }}>
            <form>
              <FormControl sx={{ mr: 5, mb: .5, width: '100%' }} size="small">
                <InputLabel id="products">Productos</InputLabel>
                <Select
                  labelId="products"
                  id="product"
                  value={product}
                  label="products"
                  onChange={handleAddProduct}
                  sx={{ borderRadius: 2 }}
                >
                  {leakedProducts.map((product: any) => {
                    return <MenuItem key={product.id} value={product}>{`${product.rate.name} ${product.hour_range.name}-Hrs Bs`}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <List sx={{ marginTop: 0, paddingTop: 0 }}>
                <TransitionGroup sx={{ marginTop: 0, paddingTop: 0 }}>
                  {shoppingCart.map((item: any) => (
                    <Collapse sx={{ marginTop: 0, paddingTop: 0 }} key={item.id}>
                      <CardEvent
                        products={products}
                        item={item}
                        handleRemoveProduct={handleRemoveProduct}
                      />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </form>
          </Paper>
          {/* <Grid container sx={{ height: 50 }}>
              <Grid item xs={12} sm={12} sx={{ padding: '0px 2px' }}>
                <ComponentButton
                  text="Crear arriendo"
                  width="100%"
                  height="90%"
                  onClick={() => handleCreation()}
                />
              </Grid>
            </Grid> */}
        </Grow>
      </>
      }
    </div>
  )
}