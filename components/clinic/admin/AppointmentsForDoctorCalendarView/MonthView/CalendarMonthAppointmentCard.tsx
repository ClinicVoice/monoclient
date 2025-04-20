'use client';

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { AppointmentRead } from '@/types/appointments';

export interface AppointmentCardProps {
    appointment: AppointmentRead;
    onClick?: () => void;
}

export const CalendarMonthAppointmentCard = ({ appointment, onClick }: AppointmentCardProps) => {
    const startDate = new Date(appointment.appt_start_time);
    const startTime = format(startDate, 'h:mm a');

    const firstName = appointment.patient?.first_name?.trim();
    const lastName = appointment.patient?.surname?.trim();
    const displayName = firstName && lastName ? `${lastName}, ${firstName}` : 'Name N/A';

    const title = 'Appointment';
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
                cursor: onClick ? 'pointer' : 'default',
                transition: 'box-shadow 0.3s',
                overflow: 'hidden',
                '&:hover': onClick ? { boxShadow: 3 } : {},
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
