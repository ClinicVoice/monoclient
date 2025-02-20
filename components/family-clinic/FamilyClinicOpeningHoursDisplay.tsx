import { Typography, Box } from '@mui/material';
import { FamilyClinicOpeningHours } from '@/types/family_clinic/family_clinic';

interface FamilyClinicOpeningHoursDisplayProps {
    openingHours: FamilyClinicOpeningHours;
}

const FamilyClinicOpeningHoursDisplay = ({
    openingHours,
}: FamilyClinicOpeningHoursDisplayProps) => {
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

export default FamilyClinicOpeningHoursDisplay;
