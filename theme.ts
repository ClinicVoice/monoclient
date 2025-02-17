'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2A398C',
            light: '#4c7fb5',
            dark: '#1F2E75',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffffff',
            light: '#f8f9fa',
            dark: '#d4d4d4',
            contrastText: '#225c90',
        },
        error: {
            main: '#d32f2f',
            light: '#fff3f3',
            dark: '#c62828',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f7fb',
            paper: '#F3E6E380',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
            disabled: '#aaaaaa',
        },
    },
    typography: {
        h1: {
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h3: {
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 500,
            fontSize: '1.5rem',
        },
        body1: {
            fontFamily: 'var(--font-manrope), sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
        },
        body2: {
            fontFamily: 'var(--font-manrope), sans-serif',
            fontWeight: 400,
            fontSize: '0.875rem',
        },
        button: {
            fontFamily: 'var(--font-manrope), sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.835rem',
        },
    },
});

export default theme;
