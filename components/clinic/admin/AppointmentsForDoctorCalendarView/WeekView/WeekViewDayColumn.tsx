'use client';

import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { format, differenceInMinutes } from 'date-fns';
import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import { AppointmentRead } from '@/types/appointments';
import { TimeHeightAppointmentCard } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/TimeHeightAppointmentCard';

export interface WeekViewDayColumnProps {
    day: Date;
    onSelectAppointment: (app: AppointmentRead) => void;
    totalMinutes: number;
}

export const WeekViewDayColumn = ({
    day,
    onSelectAppointment,
    totalMinutes,
}: WeekViewDayColumnProps) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const { data, isLoading, error } = useScheduledAppointmentsByDate(formattedDate);
    const appointments: AppointmentRead[] = data?.scheduled_appointments || [];
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 8, 0, 0);

    return (
        <Box sx={{ position: 'relative', height: totalMinutes, borderRight: '1px solid #e0e0e0' }}>
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
                    const startTime = new Date(parseInt(appointment.appointment_time_epoch) * 1000);
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
    );
};
