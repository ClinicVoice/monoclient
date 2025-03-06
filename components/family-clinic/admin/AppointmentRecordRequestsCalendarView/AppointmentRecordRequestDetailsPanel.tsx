'use client';

import React from 'react';
import { Box, Typography, IconButton, Drawer, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

export interface AppointmentRecordRequestDetailsPanelProps {
    appointment: AppointmentRecordRequest;
    onClose: () => void;
}

export const AppointmentRecordRequestDetailsPanel = ({
    appointment,
    onClose,
}: AppointmentRecordRequestDetailsPanelProps) => {
    return (
        <Drawer anchor="right" open onClose={onClose}>
            <Box sx={{ width: 320, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        Appointment Details
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Typography variant="body1">
                        <strong>Provider:</strong> {appointment.provider}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Type:</strong> {appointment.appointment_type}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Patient:</strong> {appointment.first_name} {appointment.last_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Health Card:</strong> {appointment.health_card_number} (
                        {appointment.health_card_version})
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone:</strong> {appointment.phone_number}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {appointment.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Appointment Date:</strong> {appointment.appointment_date}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Time:</strong>{' '}
                        {new Date(
                            Number(appointment.appointment_time_epoch) * 1000,
                        ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Duration:</strong> {appointment.duration} minutes
                    </Typography>
                    <Typography variant="body1">
                        <strong>Birth Date:</strong> {appointment.birth_date}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Sex:</strong> {appointment.sex}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Pharmacy:</strong> {appointment.pharmacy}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Notes:</strong> {appointment.notes}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Requested:</strong>{' '}
                        {new Date(Number(appointment.request_timestamp) * 1000).toLocaleString()}
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};
