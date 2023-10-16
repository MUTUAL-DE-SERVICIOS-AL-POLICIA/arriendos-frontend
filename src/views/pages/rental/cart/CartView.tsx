import { CustomerModel } from "@/models";
import { Collapse, Grow, Paper } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { ComponentButton } from "@/components";
import { FormEvent, useState } from "react";
import { useProductStore } from "@/hooks";
import { CardEvent, SelectComponent } from ".";

interface cartProps {
  date: Date;
  customer: CustomerModel;
  onClose: () => void;
}
export const CartView = (props: cartProps) => {
  const {
    date,
    customer,
    onClose,
  } = props;
  const [shoppingCart, setShoppingCart] = useState<any[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { postCreateLeases } = useProductStore();

  const handleAddProduct = (value: any) => {
    setShoppingCart([...shoppingCart, { productSelect: value, date, state: false }])
  }
  const handleRemoveProduct = (index: number) => {
    setShoppingCart(shoppingCart.filter((_, i) => i !== index));
  }
  const getDateJSON = (date: Date | null) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const fechaEnFormatoJSON = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}T${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}.000Z`;
    return fechaEnFormatoJSON
  }

  const changeValues = (formState: any, state: boolean, index: number) => {
    const updateShopping = [...shoppingCart];
    updateShopping[index] = {
      ...updateShopping[index],
      event_type: formState.typeEvent,
      detail: formState.detail,
      start_time: getDateJSON(formState.startTime),
      end_time: getDateJSON(formState.endTime),
      product: updateShopping[index].productSelect.id,
      state,
    };
    setShoppingCart(updateShopping);
  }
  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(shoppingCart)
    event.preventDefault();
    setFormSubmitted(true);
    if (shoppingCart.filter((e: any) => !e.state).length > 0) return;
    console.log('paso todo');
    const request: any = new Object();
    request.customer = customer.customer_type.id;
    request.selected_products = shoppingCart;
    postCreateLeases(request);
    // restablecer todo
    setShoppingCart([])
    onClose();
  }

  return (
    <Paper sx={{ margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px' }}>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...({ timeout: 2300 })}>
        <form onSubmit={sendSubmit}>
          <SelectComponent
            handleAddProduct={handleAddProduct}
          />
          <TransitionGroup >
            {shoppingCart.map((item: any, index) => (
              <Collapse key={index} >
                <CardEvent
                  item={item}
                  handleRemoveProduct={() => handleRemoveProduct(index)}
                  onFormStateChange={(formState, state) => changeValues(formState, state, index)}
                  formSubmitted={formSubmitted}
                />

              </Collapse>
            ))}
          </TransitionGroup>
          <ComponentButton
            type="submit"
            text="Crear arriendo"
            width="100%"
            height="90%"
            disable={shoppingCart.length === 0}
          />
        </form>
      </Grow>
    </Paper>
  )
}
