import { useState } from "react";
import { ComponentInput } from "."

interface searchProps {
    title: string;
}
export const ComponentSearch = (props: searchProps) => {
    const {
        title,
    } = props;
    /*BUSCADOR */
    const [query, setQuery] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (event: any) => {
        const inputQuery = event.target.value;
        setQuery(inputQuery);

        // Limpiamos el timeout anterior si existe
        if (typingTimeout) clearTimeout(typingTimeout);

        // Configuramos un nuevo timeout para realizar la búsqueda después de 2 segundos
        const newTypingTimeout = setTimeout(() => {
            // Aquí podrías llamar a tu función de búsqueda con el valor actual de 'query'
            console.log('Realizar búsqueda con:', inputQuery);
        }, 1500);

        setTypingTimeout(newTypingTimeout);
    };
    return (
        <ComponentInput
            type="text"
            label={title}
            name="search"
            value={query}
            onChange={handleInputChange}
        />
    )
}
