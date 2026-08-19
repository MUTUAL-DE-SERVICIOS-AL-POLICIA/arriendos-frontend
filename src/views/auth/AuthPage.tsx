import { useState } from 'react';
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthStore, useForm } from '@/hooks';
import { ComponentButton, ComponentInput, EnvironmentBadge } from '@/components';
import { getEnvVariables } from '@/helpers/getEnvVariables';
import logo from '@/assets/images/muserpol-logo-without-text.png';

const loginFormFields = {
    username: '',
    password: '',
}
const formValidations = {
    username: [(value: any) => value.length >= 1, 'Debe ingresar su cuenta'],
    password: [(value: any) => value.length >= 4, 'La contraseña debe de tener más de 6 letras.'],
}

export const AuthPage = () => {
    const { startLogin } = useAuthStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { username, password, onInputChange, isFormValid, usernameValid, passwordValid, } = useForm(loginFormFields, formValidations);



    const loginSubmit = async (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        setLoading(true);
        await startLogin({ username: username, password: password });
        setLoading(false);
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <EnvironmentBadge
                environment={getEnvVariables().VITE_DEPLOY_ENV as 'dev' | 'test' | 'prod'}
            />
            <Grid container justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
                <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                    <img src={logo} alt="Descripción de la imagen" style={{ maxHeight: '30vw' }} />
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 17 }} >SOFTWARE ALQUILERES DE EVENTOS</Typography>
                    </Stack>
                    <form onSubmit={loginSubmit}>
                        <div style={{ height: 10 }} />
                        <ComponentInput
                            type="text"
                            label="Cuenta"
                            name="username"
                            value={username}
                            onChange={onInputChange}
                            error={!!usernameValid && formSubmitted}
                            helperText={formSubmitted ? usernameValid : ''}
                        />
                        <div style={{ height: 10 }} />
                        <ComponentInput
                            type={showPassword ? 'text' : 'password'}
                            label="Contraseña"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            endAdornment={(
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )}
                            error={!!passwordValid && formSubmitted}
                            helperText={formSubmitted ? passwordValid : ''}
                        />
                        <div style={{ height: 10 }} />
                        <ComponentButton type="submit" text="INGRESAR" width="100%" loading={loading} />
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}