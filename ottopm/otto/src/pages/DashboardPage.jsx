// src/pages/DashboardPage.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

function DashboardPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e0f7fa', // Un fondo diferente para distinguirlo
      }}
    >
      <Typography variant="h4" component="h1">
        ¡Bienvenido al Dashboard!
      </Typography>
    </Box>
  );
}

export default DashboardPage;