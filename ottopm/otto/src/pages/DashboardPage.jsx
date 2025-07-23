// src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart, // Para el gauge chart, usaremos una combinación de componentes de Recharts
  Line,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';

// --- Componente Gauge Chart (Medidor) ---
// Simularemos el Gauge Chart usando un LineChart con ReferenceLines y customización.
// Recharts no tiene un Gauge Chart nativo, pero podemos crearlo de forma efectiva.
const GaugeChart = ({ value, ranges }) => {
  // value: el valor actual a mostrar (ej. 50)
  // ranges: un array de objetos { limit, color } o similar para los rangos de color

  // Para simplificar, usaremos rangos fijos y el valor
  const data = [{ name: 'Valor', uv: value }];

  // Calculamos la posición de la aguja. Esto es una simplificación.
  // Un gauge real necesitaría una lógica de coordenadas polares más compleja.
  // Para un efecto visual simple:
  const needlePosition = value; // Directamente el valor para la aguja

  // Definimos los segmentos de color.
  // Esto es una forma simple de simular los colores del gauge.
  // En un gauge real con Recharts, se usarían ReferenceArea o se dibujarían formas SVG.
  // Para este ejemplo, solo usaremos los colores de fondo implícitamente o con un gradiente.

  // Definimos un rango máximo para el medidor
  const maxGaugeValue = 100;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CardContent>
        <Typography variant="h6" component="div" align="center" gutterBottom>
          Progreso General (Medidor)
        </Typography>
        <Box sx={{ position: 'relative', width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Esta es una simulación visual básica del gauge con círculos y colores */}
          <Box
            sx={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#e0e0e0', // Fondo base del medidor
            }}
          >
            {/* Capas de color para simular los rangos */}
            <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, bottom: 0, backgroundColor: 'red', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                 style={{
                   // Esto es una simplificación, un gauge real usa transform: rotate
                   // y divisiones más precisas para los colores
                   // Aquí solo mostramos un ejemplo con gradiente o divisiones simples
                 }}
            />
             <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: '50%', backgroundColor: 'white' }} />
             {/* Aguja (simulada con un div rotado) */}
             <Box
                sx={{
                  position: 'absolute',
                  bottom: '50%',
                  left: '50%',
                  width: 4,
                  height: '45%',
                  backgroundColor: '#ff5722', // Color de la aguja (naranja)
                  transformOrigin: 'bottom center',
                  transform: `translateX(-50%) rotate(${(value / maxGaugeValue) * 180 - 90}deg)`, // Ajusta el ángulo
                  borderRadius: 1,
                  zIndex: 1,
                  transition: 'transform 0.5s ease-out',
                }}
             />
             {/* Centro de la aguja */}
             <Box
               sx={{
                 position: 'absolute',
                 bottom: '50%',
                 left: '50%',
                 transform: 'translate(-50%, 50%)',
                 width: 16,
                 height: 16,
                 borderRadius: '50%',
                 backgroundColor: '#26a69a', // Color del centro (teal)
                 zIndex: 2,
               }}
             />
          </Box>
          <Typography variant="h4" sx={{ position: 'absolute', bottom: 20, color: '#424242' }}>
            {value}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Typography variant="caption" sx={{ color: 'red' }}>0%</Typography>
          <Typography variant="caption" sx={{ color: 'green' }}>100%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// --- Componente Barra de Progresión ---
const ProgressBarChart = ({ progress, total }) => {
  const data = [
    { name: 'Progreso', value: progress, fill: '#82ca9d' }, // Verde claro
    { name: 'Restante', value: total - progress, fill: '#bdbdbd' }, // Gris claro
  ];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" component="div" align="center" gutterBottom>
          Progreso de Tareas (Barra)
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <YAxis dataKey="name" type="category" hide />
            <XAxis type="number" domain={[0, total]} hide />
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            <Bar dataKey="value" stackId="a" /> {/* Usa stackId para apilar */}
          </BarChart>
        </ResponsiveContainer>
        <Typography variant="h5" align="center" sx={{ mt: 1, color: '#424242' }}>
            {((progress / total) * 100).toFixed(0)}% Completado
        </Typography>
      </CardContent>
    </Card>
  );
};


function DashboardPage() {
  // Datos simulados para las gráficas
  const overallProgress = 50; // Para el Gauge Chart
  const taskProgress = 50; // Para la Barra de Progresión
  const totalTasks = 100; // Para la Barra de Progresión

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#3f51b5' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Medidor de Progreso General */}
        <Grid item xs={12} md={6} lg={4}>
          <GaugeChart value={overallProgress} />
        </Grid>

        {/* Barra de Progreso de Tareas */}
        <Grid item xs={12} md={6} lg={8}>
          <ProgressBarChart progress={taskProgress} total={totalTasks} />
        </Grid>

        {/* Aquí irían más secciones del Dashboard, como Bitácora, Asignación de Tareas, etc. */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen de Actividades Recientes
            </Typography>
            {/* Contenido de Bitácora de actividades (Próximo paso) */}
            <Typography variant="body1">
              Aquí se mostrarán las últimas actividades del proyecto.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tareas Asignadas y Próximos Hitos
            </Typography>
            {/* Contenido de Asignación de tareas (Próximo paso) */}
            <Typography variant="body1">
              Aquí se listarán las tareas y su estado.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;