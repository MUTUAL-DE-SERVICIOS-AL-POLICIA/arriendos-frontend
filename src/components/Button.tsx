import { Button, CircularProgress } from '@mui/material'
import { memo } from 'react'

export const ComponentButton = memo((
    { type, text, onClick, startIcon, endIcon, disable, margin, height, loading, variant = "contained",
    sx={fontWeight: 'bold',
         display: 'flex',
         margin: { margin },
         height: { height }
    }, color}
    : { type?: any, text: string, onClick?: any, width?: any, startIcon?: any, margin?: any, height?: any, disable?: boolean, loading?: boolean, variant?: any, endIcon?: any, sx?: object, color?: any }) => {
    return (
        <Button
            type={type}
            className='mt-2'
            variant={variant}
            disableElevation
            disableRipple
            disabled={disable || loading}
            startIcon={!loading ? startIcon : undefined}
            endIcon={!loading ? endIcon : undefined}
            onClick={onClick}
            color={color}
            sx={sx}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : text}
        </Button>
    )
});