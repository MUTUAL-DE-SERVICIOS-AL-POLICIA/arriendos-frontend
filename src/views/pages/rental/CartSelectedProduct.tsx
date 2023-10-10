import { useProductStore, useSelectedProductStore } from "@/hooks";
import { Collapse, Grow, Paper } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { RentalCard } from ".";
import { CardEvent } from "./createRental";
import { SelectComponent } from "./Select";
import { ComponentButton } from "@/components";

export const CartSelectedProduct = (selected: any) => {
	const [showGrow, setShowGrow] = useState(false);
	const [shoppingCart, setShoppingCart] = useState<any[]>([]) // Productos seleccionados
	const { selectedProducts } = useSelectedProductStore();
	const [formSubmitted, setFormSubmitted] = useState(false);
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

	const { postCreateLeases } = useProductStore();

	const handleAddProduct = (value: any) => {
		// if (!shoppingCart.map((e: any) => e.product).includes(value))
		setShoppingCart([...shoppingCart, { productSelect: value, date, state: false }])
	}

	const handleRemoveProduct = (index: number) => {

		setShoppingCart(shoppingCart.filter((_, i) => i !== index));
	}

	const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
		console.log(shoppingCart)
		event.preventDefault();
		setFormSubmitted(true);
		if (shoppingCart.filter((e: any) => !e.state).length > 0) return;
		console.log('paso todo')
		const request: any = new Object()
		request.customer = selected.customer.customer_type.id
		request.selected_products = shoppingCart
		postCreateLeases(request)
	}


	const changeValues = (formState: any, state: boolean, index: number) => {
		console.log(formState)
		// console.log((formState.time as Dayjs).toString())
		const updateShopping = [...shoppingCart];
		updateShopping[index] = {
			...updateShopping[index],
			event_type: formState.typeEvent,
			detail: formState.detail,
			start_time: formState.startTime,
			end_time: formState.endTime,
			product: updateShopping[index].productSelect.id,
			state,
		};
		setShoppingCart(updateShopping);
	}

	return (
		<div style={{ borderRadius: '20px', padding: '5px', backgroundColor: '#F7F4F4' }}>
			{selectedProducts.length > 0 && <>
				<RentalCard
					showGrow={showGrow}
					date={date}
					events={selected.events}
				/>
				<Paper sx={{ margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px' }}>
					<Grow in={selected.selected} style={{ transformOrigin: '0 0 0' }} {...(selected.selected ? { timeout: 2300 } : {})}>
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
			</>
			}
		</div>
	)
}