import { Button } from '@mui/material'
import { memo } from 'react'

export const ComponentButton = memo(({ type, text, onClick, width, startIcon, disable }: { type?: any, text: string, onClick?: any, width?: any, startIcon?: any, disable?: boolean }) => {
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
            sx={{ fontWeight: 'bold', margin: '8px', width: { width } }}
        >
            {text}
        </Button>
    )
});