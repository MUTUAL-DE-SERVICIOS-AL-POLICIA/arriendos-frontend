import { Button } from '@mui/material'
import { memo } from 'react'

export const ComponentButton = memo(({ type, text, onClick, width, startIcon, disable, margin, height }: { type?: any, text: string, onClick?: any, width?: any, startIcon?: any, margin?: any, height?: any, disable?: boolean }) => {
    return (
        <Button
            type={type}
            className='mt-2'
            variant="contained"
            disableElevation
            disableRipple
            disabled={disable}
            startIcon={startIcon}
            onClick={onClick}
            sx={{ fontWeight: 'bold', margin: { margin }, width: { width }, height: { height } }}
        >
            {text}
        </Button>
    )
});