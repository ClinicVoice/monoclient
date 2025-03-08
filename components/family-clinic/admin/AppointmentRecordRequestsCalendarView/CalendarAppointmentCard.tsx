'use client';

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { addMinutes, format } from 'date-fns';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

export interface AppointmentCardProps {
    appointment: AppointmentRecordRequest;
    onClick?: () => void;
}

export const CalendarAppointmentCard = ({ appointment, onClick }: AppointmentCardProps) => {
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

    const startTimeEpoch = parseInt(appointment.appointment_time_epoch, 10);
    const startDateTime = new Date(startTimeEpoch * 1000);
    const startTime = format(startDateTime, 'h:mm a');

    let endTime = startTime;
    if (appointment.duration) {
        const durationMinutes = parseInt(appointment.duration, 10);
        const endDateTime = addMinutes(startDateTime, durationMinutes);
        endTime = format(endDateTime, 'h:mm a');
    }

    const hasNotes = appointment.notes && appointment.notes.trim() !== '';

    return (
        <Paper
            onClick={onClick}
            elevation={1}
            sx={{
                p: 0,
                border: '1px solid',
                borderColor: '#64b5f6',
                backgroundColor: '#e3f2fd',
                color: '#1565c0',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    p: 1,
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1565c0', mb: 0 }}>
                    {displayName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#1565c0', mb: 0 }}>
                    {title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#1565c0', mt: 0 }}>
                    {startTime} - {endTime}
                </Typography>
                {hasNotes && (
                    <Typography variant="caption" sx={{ color: '#1565c0', mt: 0 }}>
                        Reason: {appointment.notes}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};
