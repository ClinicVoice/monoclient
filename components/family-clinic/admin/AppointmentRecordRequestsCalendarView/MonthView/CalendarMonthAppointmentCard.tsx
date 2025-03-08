'use client';

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

export interface AppointmentCardProps {
    appointment: AppointmentRecordRequest;
    onClick?: () => void;
}

export const CalendarMonthAppointmentCard = ({ appointment, onClick }: AppointmentCardProps) => {
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

    const hasNotes = appointment.notes && appointment.notes.trim() !== '';

    return (
        <Paper
            onClick={onClick}
            elevation={1}
            sx={{
                p: 0.5,
                border: '1px solid',
                borderColor: '#64b5f6',
                backgroundColor: '#e3f2fd',
                color: '#1565c0',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
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
                <Typography variant="caption" sx={{ color: '#1565c0' }}>
                    {startTime}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                    {displayName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#1565c0' }}>
                    {title}
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
