
import { useSelectorStore } from '@/hooks';
import { Chip } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ComponentInput } from '.';

export const ComponentSelect = React.memo((
    {
        labelChip,
        title,
        onPressed,
        items = [],
        select = 'id',
        error = false,
        helperText = '',
        name,
        value
    }:
        {
            labelChip: any,
            title: string,
            onPressed: any,
            items?: any,
            select?: string,
            error?: boolean,
            helperText?: string,
            name: any,
            value: any
        }) => {
    const { deselectOne } = useSelectorStore();
    const { selection = [] } = useSelector((state: any) => state.selections);

    const generateLabel = (data: Array<number>) => {
        return labelChip.map((key: number) => data[key]).join('-');
    };
    return (
        <>
            <div onClick={() => onPressed()}>
                <ComponentInput
                    type="text"
                    label={title}
                    name={name}
                    value={value}
                    error={error}
                    helperText={helperText}
                />
            </div>
            {/* <Button
                variant="outlined"
                color="primary"
                onClick={onPressed}
                style={{
                    width: '100%',
                    height: '50px',
                    color: 'grey',
                    textTransform: 'none',
                    fontSize: '1.0rem',
                    padding: '8px'
                }}
                sx={{
                    padding: '8px'
                }}
                classes={{
                    // focus: {
                    //     borderColor: '#F26522',
                    //     borderWidth: '2px',
                    // },
                    // label: {
                    //     color: 'grey',
                    // },
                }}
            >
                {title}
            </Button> */}
            {
                items.length > 0 ?
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                        {[...items.filter((e: any) => selection.includes(e[select]))].map((data) => {
                            return (
                                <Chip
                                    key={data.id}
                                    color="primary"
                                    label={generateLabel(data)}
                                    style={{ margin: '1px' }}
                                    onDelete={() => {
                                        deselectOne(data[select])
                                    }}
                                />
                            );
                        })}
                    </div>
                    : <></>
            }
        </>
    )
})
