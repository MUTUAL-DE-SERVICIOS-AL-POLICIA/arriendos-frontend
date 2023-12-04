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
        if (typingTimeout) clearTimeout(typingTimeout);

        const newTypingTimeout = setTimeout(() => {
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
