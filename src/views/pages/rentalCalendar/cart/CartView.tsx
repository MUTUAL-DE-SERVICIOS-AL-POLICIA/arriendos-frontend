import { CustomerModel, PlanModel, ProductModel } from "@/models";
import { Collapse, Grow, Paper, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { ComponentButton, SelectComponent } from "@/components";
import { FormEvent, useEffect, useState } from "react";
import { usePlanStore, useProductStore, useRentalStore } from "@/hooks";
import { CardEvent } from ".";
import { getDateJSON } from "@/helpers";

interface cartProps {
  date: Date;
  customer: CustomerModel;
  onClose: () => void;
  screenHeight: number;
}

export const CartView = (props: cartProps) => {
  const {
    date,
    customer,
    onClose,
    screenHeight,
  } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { plans = [], getPlans } = usePlanStore();
  const [planSelect, setPlanSelect] = useState<number>(0);
  const { leakedProducts = [] } = useProductStore();
  const { shoppingCart, setUpdateShoppingCart, postCreateRental } = useRentalStore();

  useEffect(() => {
    getPlans();
  }, [])

  useEffect(() => {
    if(planSelect == 0) {
      setUpdateShoppingCart([])
    }
  }, [date])

  const handleAddProduct = (value: any) => {
    setUpdateShoppingCart([...shoppingCart, { productSelect: leakedProducts.find((product: ProductModel) => product.id == value), date, state: false }])
  }

  const handlePlan = (value: any) => {
    setUpdateShoppingCart([])
    setPlanSelect(value)
  }

  const handleRemoveProduct = (index: number) => {
    setUpdateShoppingCart(shoppingCart.filter((_: any, i: number) => i !== index));
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
    setUpdateShoppingCart(updateShopping);
  }
  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (shoppingCart.filter((e: any) => !e.state).length > 0) return;
    const request: any = new Object();
    request.customer = customer.id;
    request.selected_products = shoppingCart;
    if (planSelect !== 0) request.plan = planSelect
    postCreateRental(request, onClose)
  }

  return (
    <Paper sx={{ margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px', backgroundColor: '#d3f4eb' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Nuevo Alquiler</Typography>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...({ timeout: 2300 })}>
        <form onSubmit={sendSubmit}>
          <SelectComponent
            handleSelect={handlePlan}
            label={"Plan"}
            options={[{ id: 0, name: 'SIN PLAN' }, ...plans.map((plan: PlanModel) => ({ id: plan.id, name: plan.plan_name }))]}
            value={planSelect}
          />
          <SelectComponent
            handleSelect={handleAddProduct}
            label="Seleccionar Producto"
            options={[...leakedProducts.map((product: ProductModel) => ({ id: product.id, name: `${product.rate.name} ${product.hour_range.time}Hrs-${product.mount}Bs` }))]}
            value={''}
            disabled={planSelect === 0 && shoppingCart.length == 1}
          />
          <div style={{ maxHeight: `${screenHeight / 3.5}px`, overflowY: 'auto' }}>
            <TransitionGroup >
              {shoppingCart.map((item: any, index: number) => (
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
          </div>
          <div style={{ padding: '10px' }}>
            <ComponentButton
              type="submit"
              text={`Crear Alquiler con ${shoppingCart.length} producto(s)`}
              height="90%"
              disable={shoppingCart.length === 0}
            />
          </div>
        </form>
      </Grow>
    </Paper >
  )
}
