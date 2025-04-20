import React from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { parse, format } from 'date-fns';
import { useOpeningHoursForClinic } from '@/hooks/clinics/useOpeningHoursForClinic';

interface ClinicOpeningHoursDisplayProps {
    clinicId: number;
}

const DAY_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const ClinicOpeningHoursDisplay = ({ clinicId }: ClinicOpeningHoursDisplayProps) => {
    const { data, isLoading, error } = useOpeningHoursForClinic(clinicId);

    if (isLoading) {
        return (
            <Box my={2} display="flex" alignItems="center">
                <CircularProgress size={20} />
                <Typography variant="body2" ml={1}>
                    Loading opening hours...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box my={2}>
                <Alert severity="error">Failed to load opening hours.</Alert>
            </Box>
        );
    }

    if (!data?.opening_hours) {
        return null;
    }

    return (
        <Box my={2}>
            <Typography variant="body1" fontWeight="bold">
                Opening Hours:
            </Typography>
            {DAY_ORDER.map((day) => {
                const dayLabel = day.charAt(0).toUpperCase() + day.slice(1);
                const hours = data.opening_hours[day as keyof typeof data.opening_hours];
                if (!hours) {
                    return (
                        <Typography variant="body2" key={day}>
                            {dayLabel}: Closed
                        </Typography>
                    );
                }
                const openTime = format(parse(hours.open_time, 'HH:mm:ss', new Date()), 'h:mm a');
                const closeTime = format(parse(hours.close_time, 'HH:mm:ss', new Date()), 'h:mm a');
                return (
                    <Typography variant="body2" key={day}>
                        {dayLabel}: {openTime} - {closeTime}
                    </Typography>
                );
            })}
        </Box>
    );
};

export default ClinicOpeningHoursDisplay;
