import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    padding: '0.75rem',
    marginTop: '1.5rem',
    textTransform: 'none',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(34, 92, 144, 0.4)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',

    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        boxShadow: '0 6px 16px rgba(255, 122, 93, 0.5)',
    },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginTop: 'auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: 8,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

interface BackButtonProps {
    label: string;
    onClick: () => void;
}

const BackButton = ({ label, onClick }: BackButtonProps) => {
    return (
        <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={onClick}
            style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}
        >
            {label}
        </Button>
    );
};

interface PrevNextNavigationProps {
    onBackClick: () => void;
    onNextClick: () => void;
    isBackDisabled?: boolean;
    isNextDisabled?: boolean;
}

function PrevNextNavigation(props: PrevNextNavigationProps) {
    const { onBackClick, onNextClick, isBackDisabled = false, isNextDisabled = false } = props;

    return (
        <Box display="flex" justifyContent="space-between" width="100%" maxWidth="800px" mt={2}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={onBackClick}
                disabled={isBackDisabled}
            >
                Previous
            </Button>
            <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={onNextClick}
                disabled={isNextDisabled}
            >
                Next
            </Button>
        </Box>
    );
}

export { LoginButton, LogoutButton, PrimaryButton, BackButton, PrevNextNavigation };
