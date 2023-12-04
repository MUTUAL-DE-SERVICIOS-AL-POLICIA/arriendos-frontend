import { PhotoCamera } from '@mui/icons-material';
import { Card, CardMedia, IconButton } from '@mui/material';
import { useRef } from 'react';
import noimage from "@/assets/images/no-image.webp";

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
        borderColor: error ? 'red' : 'initial',
    };

    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: error ? 'red' : 'gray',
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
                sx={{ display: 'flex', justifyContent: 'center', marginLeft: 5 }}
            >
                <CardMedia component="img" src={fileImage} alt="Sin imágen" onError={(e: any) => e.target.src = noimage } />
                <IconButton style={iconStyle}>
                    <PhotoCamera fontSize="small" />
                </IconButton>
            </Card>
            {error && <div style={{ color: 'red' }}>{helperText}</div>}
        </>
    );
};
