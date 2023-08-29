import { ComponentSelect } from "@/components";
import { Box, Grid, Typography } from "@mui/material";

export const FormUser = (props: any) => {
    const {
        userInfo,
        nameRol,
        valueRol,
        onPressedRol,
        errorRol,
        helperTextRol,
        nameRoom,
        valueRoom,
        onPressedRoom,
        errorRoom,
        helperTextRoom,
    } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Typography>
                {userInfo}
            </Typography>
            <Typography>
                Nombre:
            </Typography>
            <Typography>
                Apellido:
            </Typography>
            <Typography>
                Correo:
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                    <ComponentSelect
                        labelChip={['name']}
                        title='Rol'
                        name={nameRol}
                        value={valueRol}
                        onPressed={onPressedRol}
                        error={errorRol}
                        helperText={helperTextRol}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                    <ComponentSelect
                        labelChip={['name']}
                        title='Ambientes'
                        name={nameRoom}
                        value={valueRoom}
                        onPressed={onPressedRoom}
                        error={errorRoom}
                        helperText={helperTextRoom}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
