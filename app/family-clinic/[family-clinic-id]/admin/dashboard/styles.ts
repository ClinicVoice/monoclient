import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const DashboardContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(6),
    maxWidth: '100vw !important',
}));

export const ButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '90vw',
    marginBottom: theme.spacing(2),
}));
