'use client';

import React from 'react';
import { format } from 'date-fns';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { CalendarAppointmentCard } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/CalendarAppointmentCard';

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
                height: 125,
                p: 1,
                pt: 3,
                position: 'relative',
                bgcolor: day.getMonth() === currentMonth ? 'background.paper' : 'grey.100',
                width: '100%',
                border: '0.5px solid #e0e0e0',
                boxSizing: 'border-box',
                overflowY: 'auto',
                borderRadius: 0,
                '&:hover': { boxShadow: 3 },
            }}
        >
            <Box sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}>
                <Typography variant="caption">{format(day, 'd')}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height="30%" />
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
                        <Box key={appointment.request_timestamp} sx={{ mb: 0.5 }}>
                            <CalendarAppointmentCard
                                appointment={appointment}
                                onClick={() => onSelectAppointment(appointment)}
                            />
                        </Box>
                    ))
                )}
            </Box>
        </Paper>
    );
};
