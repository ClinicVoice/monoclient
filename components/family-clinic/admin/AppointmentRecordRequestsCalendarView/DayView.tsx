'use client';

import React from 'react';
import { format, differenceInMinutes } from 'date-fns';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

export interface DayViewProps {
    date: Date;
    onSelectAppointment: (app: AppointmentRecordRequest) => void;
}

const totalMinutes = 12 * 60; // 720 minutes from 8 AM to 8 PM

export const DayView = ({ date, onSelectAppointment }: DayViewProps) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const { data, isLoading, error } = useScheduledAppointmentsByDate(formattedDate);
    const appointments: AppointmentRecordRequest[] = data?.scheduled_appointments || [];
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0);

    return (
        <Box
            sx={{
                display: 'flex',
                mx: 'auto',
                height: totalMinutes,
                border: '1px solid #e0e0e0',
                position: 'relative',
                width: '100%',
            }}
        >
            {/* Hour Labels */}
            <Box sx={{ width: 60, borderRight: '1px solid #e0e0e0', position: 'relative' }}>
                {Array.from({ length: 13 }, (_, i) => i).map((i) => {
                    const hour = 8 + i;
                    return (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                top: i * 60 - 8,
                                width: '100%',
                                textAlign: 'right',
                                pr: 1,
                            }}
                        >
                            <Typography variant="caption">
                                {hour === 12
                                    ? '12 PM'
                                    : hour < 12
                                      ? `${hour} AM`
                                      : `${hour - 12} PM`}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            {/* Appointment Grid */}
            <Box sx={{ flex: 1, position: 'relative' }}>
                {Array.from({ length: 13 }, (_, i) => i).map((i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            top: i * 60,
                            left: 0,
                            right: 0,
                            borderTop: '1px solid #e0e0e0',
                        }}
                    />
                ))}
                {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : error ? (
                    <Typography
                        variant="caption"
                        color="error"
                        sx={{ position: 'absolute', top: 0, left: 0 }}
                    >
                        Error loading appointments
                    </Typography>
                ) : (
                    appointments.map((appointment) => {
                        const startTime = new Date(
                            parseInt(appointment.appointment_time_epoch) * 1000,
                        );
                        const durationMinutes = parseInt(appointment.duration);
                        const minutesFromStart = differenceInMinutes(startTime, dayStart);
                        if (minutesFromStart < 0 || minutesFromStart > totalMinutes) return null;
                        return (
                            <Paper
                                key={appointment.request_timestamp}
                                onClick={() => onSelectAppointment(appointment)}
                                sx={{
                                    position: 'absolute',
                                    top: minutesFromStart,
                                    left: 4,
                                    right: 4,
                                    height: durationMinutes,
                                    bgcolor: 'info.light',
                                    p: 0.5,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                }}
                            >
                                <Typography variant="caption">
                                    {format(startTime, 'h:mm a')} - {appointment.first_name}{' '}
                                    {appointment.last_name}
                                </Typography>
                            </Paper>
                        );
                    })
                )}
            </Box>
        </Box>
    );
};
