'use client';

import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, differenceInMinutes } from 'date-fns';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';

export interface WeekViewProps {
    date: Date;
    onSelectAppointment: (app: AppointmentRecordRequest) => void;
}

const totalMinutes = 12 * 60; // 720 minutes for 8 AM to 8 PM

export const WeekView = ({ date, onSelectAppointment }: WeekViewProps) => {
    const weekStart = startOfWeek(date);
    const days = eachDayOfInterval({ start: weekStart, end: endOfWeek(date) });

    const timeLabels = (
        <Box
            sx={{
                marginTop: '2rem',
                width: 60,
                borderRight: '1px solid #e0e0e0',
                position: 'relative',
                height: totalMinutes,
            }}
        >
            {Array.from({ length: 13 }, (_, i) => i).map((i) => {
                const hour = 8 + i;
                return (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            top: i * 60 - 4, // Adjust for alignment
                            width: '100%',
                            textAlign: 'right',
                            pr: 1,
                        }}
                    >
                        <Typography variant="caption">
                            {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );

    const DayColumn: React.FC<{ day: Date }> = ({ day }) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const { data, isLoading, error } = useScheduledAppointmentsByDate(formattedDate);
        const appointments: AppointmentRecordRequest[] = data?.scheduled_appointments || [];
        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 8, 0, 0);

        return (
            <Box sx={{ position: 'relative', height: totalMinutes, border: '1px solid #e0e0e0' }}>
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
                        Error
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
        );
    };

    return (
        <Box sx={{ display: 'flex', width: '100%', mx: 'auto' }}>
            {timeLabels}
            <Box
                sx={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: 1,
                    height: totalMinutes,
                }}
            >
                {days.map((day) => (
                    <Box key={format(day, 'yyyy-MM-dd')}>
                        <Box sx={{ textAlign: 'center', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                            <Typography variant="subtitle2">{format(day, 'EEE, MMM d')}</Typography>
                        </Box>
                        <DayColumn day={day} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
