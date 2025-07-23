// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress, // Para el indicador de carga
  Alert, // Para mostrar mensajes de error/éxito
  IconButton, // Para el ícono de visibilidad de contraseña
  InputAdornment, // Para el adornment del TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [error, setError] = useState(''); // Estado para mensajes de error
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();

  const handleSubmit = async (event) => { // Marca la función como async
    event.preventDefault();
    setError(''); // Limpiar errores anteriores
    setLoading(true); // Iniciar estado de carga

    if (!email || !password) {
      setError('Por favor, ingresa tu correo electrónico y contraseña.');
      setLoading(false);
      return;
    }

    try {
      // Simulamos una llamada a la API con un retardo
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula un retardo de 1.5 segundos

      // Lógica de autenticación REAL (en un proyecto real, esto sería una llamada a tu backend)
      // Ejemplo: const response = await authService.login(email, password);
      // if (response.success) { navigate('/dashboard'); } else { setError(response.message); }

      if (email === 'carlos.pmo@embol.com' && password === 'password') {
        // En un sistema real, aquí guardarías el token JWT y el rol del usuario
        // localStorage.setItem('token', 'tu_jwt_aqui');
        // localStorage.setItem('userRole', 'admin'); // O el rol correspondiente
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Por favor, inténtalo más tarde.');
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd', // Un azul claro más agradable
      }}
    >
      <Paper elevation={6} sx={{ // Aumentamos la elevación para un efecto más "flotante"
        padding: 5,
        borderRadius: 3,
        width: '100%',
        maxWidth: 450, // Un poco más ancho
        textAlign: 'center', // Centrar el contenido dentro del Paper
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, color: '#1976d2' }}>
          Sistema de Gestión
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 4, color: '#424242' }}>
          Iniciar Sesión
        </Typography>

        {error && ( // Muestra el mensaje de error si existe
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }} // Espacio debajo del campo
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'} // Cambia el tipo según showPassword
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }} // Espacio debajo del campo
            InputProps={{ // Añade el ícono de visibilidad
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5 }} // Más padding vertical para el botón
            disabled={loading} // Deshabilita el botón si está cargando
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;