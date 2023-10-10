import { useEventStore, useForm } from "@/hooks";
import { HighlightOffOutlined, ProductionQuantityLimits } from "@mui/icons-material"
import { Chip, IconButton, ListItem, Paper } from "@mui/material"
import { useEffect } from "react";
import { ComponentAutoComplete, ComponentInput, ComponentInputTime } from "@/components";
import { FormEventModel, FormEventValidations, TypeEventModel } from "@/models";

const formEventFields: FormEventModel = {
	typeEvent: '',
	startTime: '',
	endTime: '',
	detail: '',
}
const formValidations: FormEventValidations = {
	typeEvent: [(value: string) => value.length >= 1, 'Debe ingresar el tipo de evento'],
	startTime: [(value: string) => value.length >= 1, 'Debe ingresar la hora'],
};

interface RenderItemOptions {
	formSubmitted: boolean;
	item: any;
	handleRemoveProduct: () => void;
	onFormStateChange: (value: any, state: boolean) => void;
}

export const CardEvent = (props: RenderItemOptions) => {
	const {
		formSubmitted,
		item,
		handleRemoveProduct,
		onFormStateChange,
	} = props;
	const { events, getEvents } = useEventStore();

	const {
		formState, typeEvent, detail, startTime, endTime,
		onInputChange, isFormValid, onValueChange, onListValuesChange,
		typeEventValid, startTimeValid } = useForm(formEventFields, formValidations);

	useEffect(() => {
		getEvents()
	}, [])

	useEffect(() => {
		onFormStateChange(formState, isFormValid)
	}, [formState, typeEvent, detail, startTime, endTime, isFormValid])


	const { productSelect, date } = item;

	return (
		<Paper sx={{ margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px', backgroundColor: '#E2F6F0' }}>
			{/* {JSON.stringify(productSelect)} */}
			<ListItem
				sx={{ display: 'block', margin: '0 auto' }}
				secondaryAction={
					<IconButton
						edge="end"
						aria-label="delete"
						title="Delete"
						onClick={handleRemoveProduct}
					>
						<HighlightOffOutlined color="primary" />
					</IconButton>
				}
			>
				<div style={{ textAlign: 'center' }}>
					<Chip
						label={`${productSelect.rate.name} ${productSelect.hour_range.time} Hrs`}
						variant="outlined"
						icon={<ProductionQuantityLimits />}
						sx={{ marginBottom: '0px', backgroundColor: '#DEA427', textAlign: 'center' }}
					/>
				</div>
			</ListItem>
			<ComponentInputTime
				date={date}
				value={startTime}
				timeAdd={productSelect.hour_range.time}
				onChange={(start, end) => {
					onListValuesChange(['endTime', 'startTime'], [end, start]);
				}}
				error={!!startTimeValid && formSubmitted}
				helperText={formSubmitted ? startTimeValid : ''}
			/>
			<ComponentAutoComplete
				label="Tipo de evento"
				options={events.map((option: TypeEventModel) => option.name)}
				setValue={(value) => onValueChange('typeEvent', value)}
				error={!!typeEventValid && formSubmitted}
				helperText={formSubmitted ? typeEventValid : ''}
			/>
			<ComponentInput
				type="text"
				label="Detalle"
				name="detail"
				value={detail}
				onChange={onInputChange}
			/>
		</Paper>
	)
}