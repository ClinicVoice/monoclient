import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useOpeningHoursForClinic } from '@/hooks/clinics/useOpeningHoursForClinic';

interface ClinicOpeningHoursDisplayProps {
    clinicId: number;
}

const ClinicOpeningHoursDisplay = ({ clinicId }: ClinicOpeningHoursDisplayProps) => {
    const { data: openingHours, isLoading, error } = useOpeningHoursForClinic(clinicId);

    if (isLoading) {
        return (
            <Box marginY={2} display="flex" alignItems="center">
                <CircularProgress size={20} />
                <Typography variant="body2" marginLeft={1}>
                    Loading opening hours...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box marginY={2}>
                <Alert severity="error">Failed to load opening hours.</Alert>
            </Box>
        );
    }

    if (!openingHours) {
        return null;
    }

    return (
        <Box marginY={2}>
            <Typography variant="body1" fontWeight="bold">
                Opening Hours:
            </Typography>
            {Object.entries(openingHours).map(([day, hours]) => (
                <Typography variant="body2" key={day}>
                    {day}: {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                </Typography>
            ))}
        </Box>
    );
};

export default ClinicOpeningHoursDisplay;
