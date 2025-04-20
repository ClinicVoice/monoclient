import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const InfoCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));
