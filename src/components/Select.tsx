
import { useSelectorStore } from '@/hooks';
import { Button, Chip, Color, Typography } from '@mui/material';
import React from 'react';

export const ComponentSelect = React.memo((
    {
        label = '',
        title,
        onPressed,
        items = [],
        select = 'id',
        error = false,
        helperText,
        name,
        value,
        color
    }:
        {
            label?: string,
            title: string,
            onPressed: any,
            items?: any,
            select?: string,
            error?: boolean,
            helperText?: string,
            name?: string,
            value?: any,
            color?: any
        }) => {
    const { selections = [], deselectOne } = useSelectorStore();

    return (
        <>
            <>
                <div style={{ position: 'relative', paddingTop: '5px', marginBottom: '10px' }}>
                    <span
                        style={{
                            position: 'absolute',
                            top: -8,
                            left: 2,
                            backgroundColor: 'white',
                            padding: '2px',
                            zIndex: 1,
                        }}
                    >
                        {label}
                    </span>
                    <Button
                        variant="outlined"
                        onClick={onPressed}
                        style={{
                            width: '100%',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            color: 'black',
                            borderColor: error ? 'red' : 'black',
                            textTransform: 'none',
                            zIndex: 0,
                            backgroundColor: color
                        }}
                    >
                        {title}
                    </Button>
                </div>
                {
                    items.length > 0 ?
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                            {[...items].map((data) => {
                                return (
                                    <Chip
                                        key={data.id}
                                        color="primary"
                                        label={data.name}
                                        style={{ margin: '1px' }}
                                        onDelete={() => {
                                            deselectOne(data.id)
                                        }}
                                    />
                                );
                            })}
                        </div>
                        : <></>
                }
                {error && (
                    <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
                )}
            </>
        </>
    )
})
