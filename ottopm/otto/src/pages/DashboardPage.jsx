// src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

// --- Componente Speedometer Gauge (Simulación con CSS/MUI Box) ---
const SpeedometerGauge = ({ value, label }) => {
  // Calcula el ángulo de la aguja (0% = -90deg, 100% = +90deg, total 180deg)
  const angle = (value / 100) * 180 - 90;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CardContent sx={{ textAlign: 'center', pb: 0, pt: 1 }}> {/* Ajuste de padding */}
        <Box
          sx={{
            width: 150, // Tamaño del círculo del medidor
            height: 75, // Altura para la mitad superior del círculo
            borderRadius: '150px 150px 0 0', // Crea la forma de semicírculo superior
            position: 'relative',
            overflow: 'hidden',
            mx: 'auto', // Centrar
            mb: 2,
            backgroundColor: 'transparent', // Se elimina el color base para usar el gradiente
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            border: '2px solid #ccc', // Borde exterior
            borderBottom: 'none', // Sin borde inferior para el efecto semicírculo
            // Gradiente de color para simular los rangos directamente en el fondo
            backgroundImage: 'linear-gradient(to right, #f44336 0%, #ffeb3b 50%, #4caf50 100%)',
          }}
        >
          {/* El agujero blanco central */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%', // A la mitad de la altura del semicírculo
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 130, // Tamaño del "agujero" blanco
              height: 65, // Altura del "agujero" blanco
              borderRadius: '130px 130px 0 0',
              backgroundColor: 'white',
              zIndex: 1, // Por encima del gradiente
            }}
          />

          {/* Aguja */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0, // Posiciona la base de la aguja en el centro inferior del semicírculo
              left: '50%',
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${angle}deg)`,
              width: 3, // Grosor de la aguja
              height: '90%', // Longitud de la aguja
              backgroundColor: '#ff5722', // Color naranja
              borderRadius: '2px 2px 0 0', // Punta redondeada
              zIndex: 2,
              transition: 'transform 0.5s ease-out',
            }}
          />
          {/* Centro de la aguja */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, 50%)', // Mueve para que el centro esté en la base de la aguja
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#26a69a', // Color teal
              zIndex: 3,
            }}
          />

          {/* Marcas de 0 y 100 */}
          <Typography variant="caption" sx={{ position: 'absolute', bottom: -15, left: -5, color: '#424242' }}>0</Typography>
          <Typography variant="caption" sx={{ position: 'absolute', bottom: -15, right: -5, color: '#424242' }}>100</Typography>
        </Box>
        {/* Valor actual */}
        <Typography variant="h5" component="div" sx={{ mt: 0, color: '#424242', fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mt: 0.5, fontWeight: 'bold' }}>
          {label}
        </Typography>

        {/* INTEGRAR LA BARRA DE PROGRESO AQUÍ DENTRO DEL MISMO CARDCONTENT */}
        {/* Pasamos 'value' como 'progress' y 100 como 'total' */}
        <ProgressBarPureCSS progress={value} total={100} />

      </CardContent>
    </Card>
  );
};


// --- Componente Barra de Progresión ---
const ProgressBarPureCSS = ({ progress, total }) => {
  const actualProgress = Math.min(Math.max(0, progress), total);
  const percentage = (actualProgress / total) * 100;

  return (
    // Ya no necesitamos un Card aquí, solo la Box principal de la barra
    <Box sx={{
        width: '100%',
        height: 20,
        backgroundColor: '#bdbdbd', // Color de fondo (restante)
        borderRadius: 1,
        overflow: 'hidden', // Asegura que el progreso no se salga del contenedor
        mt: 2, // Margen superior para separarlo del texto/gauge
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: `${percentage}%`, // Ancho dinámico basado en el progreso
          backgroundColor: '#82ca9d', // Color de progreso (verde)
          borderRadius: 1,
          transition: 'width 0.5s ease-out', // Animación suave
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 0.5 }}>
        <Typography variant="caption" sx={{ color: '#424242' }}>{actualProgress}</Typography>
        <Typography variant="caption" sx={{ color: '#424242' }}>{total - actualProgress}</Typography>
      </Box>
    </Box>
  );
};


function DashboardPage() {
  const gaugeData = [
    { label: 'PERSONAS', value: 50 },
    { label: 'PROCESOS', value: 30 },
    { label: 'TECNOLOGIA', value: 40 },
  ];

  return (
    <Box sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#3f51b5' }}>
        Dashboard
      </Typography>

      {/* Grid Container principal para todo el contenido del dashboard */}
      <Grid container spacing={3} sx={{ width: '100%', maxWidth: 'lg' }}>

        {/* Fila superior para los Medidores (ahora con barras integradas) */}
        {gaugeData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {/* SpeedometerGauge ahora renderiza la barra de progreso internamente */}
            <SpeedometerGauge value={item.value} label={item.label} />
            {/* ¡Eliminamos la llamada a ProgressBarPureCSS aquí! */}
            {/* <ProgressBarPureCSS progress={item.value} total={100} /> */}
          </Grid>
        ))}

        {/* Nueva Fila para las secciones "Resumen de Actividades" y "Tareas Asignadas" */}
        <Grid container item xs={12} spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Resumen de Actividades Recientes
                </Typography>
                <Typography variant="body1">
                  Aquí se mostrarán las últimas actividades del proyecto.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Tareas Asignadas y Próximos Hitos
                </Typography>
                <Typography variant="body1">
                  Aquí se listarán las tareas y su estado.
                </Typography>
              </Paper>
            </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}


export default DashboardPage;