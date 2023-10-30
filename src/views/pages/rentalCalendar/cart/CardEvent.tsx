import { useEventStore, useForm } from "@/hooks";
import { HighlightOffOutlined } from "@mui/icons-material"
import { IconButton, ListItem, Paper, Typography } from "@mui/material"
import { useEffect } from "react";
import { ComponentAutoComplete, ComponentInput, ComponentInputTime } from "@/components";
import { FormEventModel, FormEventValidations, TypeEventModel } from "@/models";

const formEventFields: FormEventModel = {
	typeEvent: '',
	startTime: null,
	endTime: null,
	detail: '',
}
const formValidations: FormEventValidations = {
	typeEvent: [(value: string) => value.length >= 1, 'Debe ingresar el tipo de evento'],
	startTime: [(value: Date) => value != null, 'Debe ingresar la hora'],
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
		<Paper sx={{ margin: '7px', padding: '7px', borderRadius: '10px', backgroundColor: '##f2fbf9' }}>
			<ListItem
				secondaryAction={
					<IconButton
						edge="end"
						aria-label="delete"
						title="Delete"
						onClick={handleRemoveProduct}
					>
						<HighlightOffOutlined color="error" />
					</IconButton>
				}
			>
				<Typography sx={{ fontWeight: 'bold' }}>
					{`${productSelect.room.name}/${productSelect.rate.name}/${productSelect.hour_range.time} Hrs/ ${productSelect.mount} Bs`}
				</Typography>
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