import { useProductStore } from "@/hooks";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

interface selectProps {
    handleAddProduct: (value: any) => void;
}
export const SelectComponent = (props: selectProps) => {
    const {
        handleAddProduct
    } = props;

    const { leakedProducts = [] } = useProductStore();
    const onChange = (event: SelectChangeEvent) => {
        let objSelected: any = event.target.value;
        handleAddProduct(objSelected);
    }
    return (
        <FormControl sx={{ mr: 5, mb: .5, width: '100%' }} size="small">
            <InputLabel id="products">Productos</InputLabel>
            <Select
                labelId="products"
                id="product"
                value={''}
                label="products"
                onChange={onChange}
                sx={{ borderRadius: 2 }}
            >
                {leakedProducts.map((product: any) => {
                    return <MenuItem key={product.id} value={product}>{`${product.rate.name} ${product.hour_range.time}-Hrs Bs`}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
