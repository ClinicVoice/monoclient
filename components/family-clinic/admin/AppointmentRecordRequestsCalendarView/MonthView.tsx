'use client';

import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Box, Paper, Typography } from '@mui/material';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { MonthDayCell } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/MonthDayCell';

export interface MonthViewProps {
    currentDate: Date;
    onSelectAppointment: (app: AppointmentRecordRequest) => void;
}

export const MonthView = ({ currentDate, onSelectAppointment }: MonthViewProps) => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const start = startOfWeek(monthStart);
    const end = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start, end });

    return (
        <Box
            sx={{
                mx: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1,
                width: '100%',
            }}
        >
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Box
                    key={day}
                    sx={{ textAlign: 'center', py: 1, borderBottom: '1px solid #e0e0e0' }}
                >
                    <Typography variant="subtitle2">{day}</Typography>
                </Box>
            ))}
            {days.map((day, index) => (
                <MonthDayCell
                    key={index}
                    day={day}
                    currentMonth={currentDate.getMonth()}
                    onSelectAppointment={onSelectAppointment}
                />
            ))}
        </Box>
    );
};
