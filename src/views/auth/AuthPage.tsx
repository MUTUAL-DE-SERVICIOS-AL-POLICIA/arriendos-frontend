import { useState } from 'react';
import { Grid, IconButton, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthStore, useForm } from '@/hooks';
import { ComponentButton, ComponentInput } from '@/components';

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
    const { username, password, onInputChange, isFormValid, usernameValid, passwordValid, } = useForm(loginFormFields, formValidations);



    const loginSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        startLogin({ username: username, password: password });
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                {/* <img src={imagelogo} alt="Descripción de la imagen" style={{ maxHeight: '80%', maxWidth: '80%' }} /> */}
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center" style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>ARRIENDOS</Typography>
                <form onSubmit={loginSubmit}>
                    <ComponentInput
                        type="text"
                        label="Cuenta"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                        error={!!usernameValid && formSubmitted}
                        helperText={formSubmitted ? usernameValid : ''}
                    />
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
                    <ComponentButton type="submit" text="INGRESAR" width="100%" />
                </form>
            </Grid>
        </Grid >
    )
}