import { Button } from '@mui/material'
import { memo } from 'react'

export const ComponentButton = memo(({ type, text, onClick, width, startIcon, margin, height }: { type?: any, text: string, onClick?: any, width?: any, startIcon?: any, margin?: any, height?: any }) => {
    return (
        <Button
            type={type}
            className='mt-2'
            variant="contained"
            disableElevation
            disableRipple
            startIcon={startIcon}
            onClick={onClick}
            sx={{ fontWeight: 'bold', margin: { margin }, width: { width }, height: { height } }}
        >
            {text}
        </Button>
    )
});