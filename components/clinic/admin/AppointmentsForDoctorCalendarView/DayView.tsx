'use client';

import React from 'react';
import { format, differenceInMinutes } from 'date-fns';
import { Box, Typography, Skeleton } from '@mui/material';
import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import { AppointmentRead } from '@/types/appointments';
import { TimeHeightAppointmentCard } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/TimeHeightAppointmentCard';

const totalMinutes = 12 * 60; // 720 minutes from 8 AM to 8 PM

export interface DayViewProps {
    date: Date;
    onSelectAppointment: (app: AppointmentRead) => void;
}

export const DayView = ({ date, onSelectAppointment }: DayViewProps) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const { data, isLoading, error } = useScheduledAppointmentsByDate(formattedDate);
    const appointments: AppointmentRead[] = data?.scheduled_appointments || [];
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
            <Box
                sx={{
                    width: 60,
                    borderRight: '1px solid #e0e0e0',
                    display: 'grid',
                    gridTemplateRows: 'repeat(13, 60px)',
                }}
            >
                {Array.from({ length: 12 }, (_, i) => {
                    const hour = 8 + i;
                    return (
                        <Box
                            key={i}
                            sx={{
                                pt: 0.5,
                                textAlign: 'left',
                                pl: 1,
                                border: '0.5px solid #e0e0e0',
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

            <Box sx={{ flex: 1, position: 'relative' }}>
                {Array.from({ length: 13 }, (_, i) => (
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
                            <Box
                                key={appointment.request_timestamp}
                                sx={{
                                    position: 'absolute',
                                    top: minutesFromStart,
                                    left: 4,
                                    right: 4,
                                    height: durationMinutes,
                                }}
                            >
                                <TimeHeightAppointmentCard
                                    appointment={appointment}
                                    height={durationMinutes}
                                    onClick={() => onSelectAppointment(appointment)}
                                />
                            </Box>
                        );
                    })
                )}
            </Box>
        </Box>
    );
};
