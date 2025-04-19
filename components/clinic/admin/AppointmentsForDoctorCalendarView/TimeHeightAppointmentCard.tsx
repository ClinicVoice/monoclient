'use client';

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { format, addMinutes } from 'date-fns';
import { AppointmentRead } from '@/types/appointments';

interface TimeHeightAppointmentCardProps {
    appointment: AppointmentRead;
    onClick: () => void;
    height: number;
}

export const TimeHeightAppointmentCard = ({
    appointment,
    onClick,
    height,
}: TimeHeightAppointmentCardProps) => {
    const startTime = new Date(parseInt(appointment.appointment_time_epoch) * 1000);
    const durationMinutes = parseInt(appointment.duration);
    const endTime = addMinutes(startTime, durationMinutes);
    const renderedHeight = Math.max(height, 20);

    let displayName: string;
    if (
        !appointment.first_name ||
        !appointment.last_name ||
        (appointment.first_name.trim() === '' && appointment.last_name.trim() === '')
    ) {
        displayName = 'Name N/A';
    } else {
        const firstName = appointment.first_name.trim();
        const lastName = appointment.last_name.trim();
        displayName = `${lastName}, ${firstName}`;
    }

    const title =
        appointment.appointment_type && appointment.appointment_type.trim() !== ''
            ? appointment.appointment_type
            : 'General Checkup';

    const hasNotes = appointment.notes && appointment.notes.trim() !== '';

    return (
        <Paper
            onClick={onClick}
            elevation={1}
            sx={{
                pl: 0.5,
                border: '1px solid',
                borderColor: '#64b5f6',
                backgroundColor: '#e3f2fd',
                color: '#1565c0',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
                height: renderedHeight,
                overflowY: 'hidden',
                overflowX: 'hidden',
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    whiteSpace: 'nowrap',
                }}
            >
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                    {displayName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#1565c0' }}>
                    {title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#1565c0' }}>
                    {format(startTime, 'hh:mm a')} - {format(endTime, 'hh:mm a')}
                </Typography>
                {hasNotes && (
                    <Typography variant="caption" sx={{ color: '#1565c0' }}>
                        Reason: {appointment.notes}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};
