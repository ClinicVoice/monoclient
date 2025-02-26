import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
    '&:hover': {
        opacity: 0.8,
    },
}));
