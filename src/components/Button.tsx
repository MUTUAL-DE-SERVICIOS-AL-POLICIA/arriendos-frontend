import { Button } from '@mui/material'
import { memo } from 'react'

export const ComponentButton = memo(({ type, text, onClick, width, startIcon }: { type?: any, text: string, onClick?: any, width?: any, startIcon?: any }) => {
    return (
        <Button
            type={type}
            className='mt-2'
            variant="contained"
            disableElevation
            disableRipple
            startIcon={startIcon}
            onClick={onClick}
            sx={{ fontWeight: 'bold', margin: '8px', width: { width } }}
        >
            {text}
        </Button>
    )
});