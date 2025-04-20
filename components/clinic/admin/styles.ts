import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const TableCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '96vw',
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
}));
