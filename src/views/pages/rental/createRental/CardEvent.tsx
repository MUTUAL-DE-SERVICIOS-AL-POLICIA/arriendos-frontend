import { ComponentInput } from "@/components"
import { useEventStore } from "@/hooks";
import { HighlightOffOutlined, ProductionQuantityLimits } from "@mui/icons-material"
import { Autocomplete, Chip, FormControl, Grid, IconButton, ListItem, TextField } from "@mui/material"
import { useEffect, useState } from "react";

interface RenderItemOptions {
    products: any
    item: any;
    handleRemoveProduct: (item: any) => void;
}

export const CardEvent = (props: RenderItemOptions) => {
    const {
        products,
        item,
        handleRemoveProduct,
    } = props;
    const [detail, setDetail] = useState('')
    const [value, setValue] = useState<object | string | null>({ name: 'sin eventos' })
    const [inputValue, setInputValue] = useState('');
    const { events, getEvents } = useEventStore();
    useEffect(() => {
        getEvents()
    }, [])

    const handleEvents = (id: number, value: any) => {
        setValue(value)
        const productFound: any = products.find((element: any) => element.product == id)
        productFound.event_type = value.name
    }

    const handleInputDetail = (id: number, event: any) => {
        const inputDetail = event
        setDetail(inputDetail)
        const productFound: any = products.find((element: any) => element.product == id)
        productFound.detail = inputDetail
    }


    return (
        <Grid container>
            <ListItem
                sx={{ display: 'block', margin: '0 auto' }}
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        title="Delete"
                        onClick={() => handleRemoveProduct(item.id)}
                    >
                        <HighlightOffOutlined color="primary" />
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
            <Grid item xs={12} sm={12} sx={{ padding: '2px 5px' }}>
                <FormControl sx={{ mr: 5, mb: .5, width: '100%' }} size="small">
                    <Autocomplete
                        value={value}
                        onChange={(event: any, newValue: string | null) => handleEvents(item.id, newValue)}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)
                        }}
                        id="event"
                        options={events}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => <TextField {...params} label="Eventos" />}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ padding: '1px 5px' }}>
                <ComponentInput
                    type={null}
                    label="Detalle"
                    name="Detail"
                    value={detail}
                    onChange={(event: any) => handleInputDetail(item.id, event.target.value)}
                />
            </Grid>
        </Grid>
    )
}