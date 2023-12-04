import LoadingButton from '@mui/lab/LoadingButton'
import { memo } from 'react'

export const ComponentButton = memo((
    { type, text, onClick, startIcon, endIcon, disable, margin, height, loading = false, variant = "contained",
    sx={fontWeight: 'bold',
         display: 'flex',
         margin: { margin },
         height: { height }
    }, color}
    : { type?: any, text: string, onClick?: any, width?: any, startIcon?: any, margin?: any, height?: any, disable?: boolean, loading?: boolean, variant?: any, endIcon?: any, sx?: object, color?: any }) => {
    return (
        <LoadingButton
            loading={loading}
            type={type}
            className='mt-2'
            variant={variant}
            disableElevation
            disableRipple
            disabled={disable}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            color={color}
            sx={sx}
        >
            {text}
        </LoadingButton>
    )
});