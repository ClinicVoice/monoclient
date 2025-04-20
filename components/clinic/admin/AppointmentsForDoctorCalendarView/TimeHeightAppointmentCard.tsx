'use client';

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
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
    const startTime = new Date(appointment.appt_start_time);
    const endTime = new Date(appointment.appt_end_time);
    const renderedHeight = Math.max(height, 20);

    // Display patient name
    const { first_name, surname } = appointment.patient;
    const hasName = first_name?.trim() || surname?.trim();
    const displayName = hasName ? `${surname.trim()}, ${first_name.trim()}` : 'Name N/A';

    // Fixed title since appointment_type is no longer available
    const title = 'Appointment';

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
