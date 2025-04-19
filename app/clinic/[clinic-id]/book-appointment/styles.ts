import { styled } from '@mui/material/styles';
import { Container, Paper } from '@mui/material';

export const FormContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(6),
}));

export const StepCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));
