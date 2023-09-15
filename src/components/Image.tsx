import { PhotoCamera } from '@mui/icons-material';
import { Card, CardMedia, IconButton } from '@mui/material';
import { useRef } from 'react';

export const ComponentImage = (props: any) => {
    const {
        onChange,
        fileImage,
        accept,
        error,
        helperText,
    } = props;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const cardStyle: React.CSSProperties = {
        position: 'relative',
        height: 200,
        width: 200,
        borderRadius: '10%',
        borderColor: error ? 'red' : 'initial', // Aplica el borde rojo si hay un error
    };

    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: error ? 'red' : 'gray', // Cambia el color a rojo si hay un error
    };

    const onFileInputChange = async ({ target }: { target: any }) => {
        onChange(target.files[0]);
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{ display: 'none' }}
                accept={accept}
            />
            <Card
                style={cardStyle}
                onClick={() => fileInputRef.current?.click()}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <CardMedia component="img" src={fileImage} alt="No Image" />
                <IconButton style={iconStyle}>
                    <PhotoCamera fontSize="small" />
                </IconButton>
            </Card>
            {error && <div style={{ color: 'red' }}>{helperText}</div>}
        </>
    );
};
