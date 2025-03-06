'use client';

import React from 'react';
import { format } from 'date-fns';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

export interface MonthDayCellProps {
    day: Date;
    currentMonth: number;
    onSelectAppointment: (app: AppointmentRecordRequest) => void;
}

export const MonthDayCell = ({ day, currentMonth, onSelectAppointment }: MonthDayCellProps) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const { data, isLoading, error } = useScheduledAppointmentsByDate(formattedDate);
    const appointments: AppointmentRecordRequest[] = data?.scheduled_appointments || [];

    return (
        <Paper
            sx={{
                height: 100,
                p: 1,
                pt: 3,
                position: 'relative',
                bgcolor: day.getMonth() === currentMonth ? 'background.paper' : 'grey.100',
                width: '100%',
                overflowY: 'auto',
            }}
        >
            <Box sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}>
                <Typography variant="caption">{format(day, 'd')}</Typography>
            </Box>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height="60%" />
            ) : error ? (
                <Typography variant="caption" color="error">
                    Error
                </Typography>
            ) : appointments.length === 0 ? (
                <Typography variant="caption" color="text.secondary">
                    No appointments
                </Typography>
            ) : (
                appointments.map((appointment) => (
                    <Paper
                        key={appointment.request_timestamp}
                        onClick={() => onSelectAppointment(appointment)}
                        sx={{
                            p: 0.5,
                            mb: 0.5,
                            bgcolor: 'info.light',
                            width: '100%',
                            cursor: 'pointer',
                        }}
                    >
                        <Typography variant="caption">
                            {format(
                                new Date(parseInt(appointment.appointment_time_epoch) * 1000),
                                'h:mm a',
                            )}{' '}
                            - {appointment.first_name} {appointment.last_name}
                        </Typography>
                    </Paper>
                ))
            )}
        </Paper>
    );
};
