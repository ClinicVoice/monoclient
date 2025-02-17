import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const ContentSideContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const ModuleContainer = styled(Box)<{ isMobile?: boolean }>(({ isMobile = false }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: isMobile ? '100vw' : '100vw',
    padding: 0,
    margin: 0,
}));

const MarginContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem',
    margin: '1rem',
}));

const WidgetContainer = styled(Box)(({ theme }) => ({
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',

    '&:hover': {
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
}));

const FormContainer = styled(Box)`
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    border-top: 4px solid ${({ theme }) => theme.palette.primary.main};
`;

const AccentContainer = styled(Box)<{ isMobile?: boolean }>(({ theme, isMobile = false }) => ({
    backgroundColor: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: isMobile ? '1rem' : '1.5rem',
    borderRadius: '12px',
    width: isMobile ? '95%' : '100%',
    height: isMobile ? '85%' : '100vh',
    maxWidth: '1040px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: isMobile ? '1rem' : '2rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
}));

export {
    AccentContainer,
    ModuleContainer,
    MarginContainer,
    WidgetContainer,
    FormContainer,
    ContentSideContainer,
};
