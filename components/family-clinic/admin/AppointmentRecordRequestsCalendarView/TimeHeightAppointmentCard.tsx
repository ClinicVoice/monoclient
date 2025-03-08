'use client';

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { format, addMinutes } from 'date-fns';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

interface TimeHeightAppointmentCardProps {
    appointment: AppointmentRecordRequest;
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
                height,
                overflow: 'hidden',
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
                    paddingLeft: '0.2rem',
                    height: '100%',
                }}
            >
                <Typography variant="caption" sx={{ color: '#1565c0' }}>
                    {format(startTime, 'hh:mm a')} - {format(endTime, 'hh:mm a')}
                </Typography>
            </Box>
        </Paper>
    );
};
