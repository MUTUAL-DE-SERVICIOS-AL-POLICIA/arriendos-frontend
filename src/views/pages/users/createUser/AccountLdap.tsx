import { ComponentInput } from "@/components";

export const AccountLdap = (props: any) => {
    const {
        name,
        value,
        onChange,
        error,
        helperText
    } = props;

    return (
        <ComponentInput
            type="text"
            label="Nombre"
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
        />
    )
}
