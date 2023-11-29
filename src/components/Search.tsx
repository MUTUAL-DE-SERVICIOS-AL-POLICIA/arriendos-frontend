import { useState } from "react";
import { ComponentInput } from "."
import { CircularProgress } from "@mui/material";

interface searchProps {
    title: string;
    onSearch: (value: string) => void;
    width?: any;
}
export const ComponentSearch = (props: searchProps) => {
    const {
        title,
        onSearch,
        width,
    } = props;
    /*BUSCADOR */
    const [query, setQuery] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [Loading, setLoading] = useState(false);

    const handleInputChange = (event: any) => {
        const inputQuery = event.target.value;
        setQuery(inputQuery);
        setLoading(true);
        // Limpiamos el timeout anterior si existe
        if (typingTimeout) clearTimeout(typingTimeout);

        // Configuramos un nuevo timeout para realizar la búsqueda después de 2 segundos
        const newTypingTimeout = setTimeout(() => {
            // Aquí podrías llamar a tu función de búsqueda con el valor actual de 'query'
            console.log('Realizar búsqueda con:', inputQuery);
            onSearch(inputQuery);
            setLoading(false);
        }, 1500);

        setTypingTimeout(newTypingTimeout);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <ComponentInput
                type="text"
                label={title}
                name="search"
                value={query}
                onChange={handleInputChange}
                width={width}
            />
            {Loading &&
                <CircularProgress color="success" size={30} />
            }
        </div>
    )
}
