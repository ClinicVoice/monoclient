'use client';

import React from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Box, Typography } from '@mui/material';
import { AppointmentRead } from '@/types/appointments';
import { MonthDayCell } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/MonthView/MonthDayCell';

export interface MonthViewProps {
    currentDate: Date;
    onSelectAppointment: (app: AppointmentRead) => void;
}

export const MonthView = ({ currentDate, onSelectAppointment }: MonthViewProps) => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const start = startOfWeek(monthStart, { weekStartsOn: 0 });
    const end = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start, end });

    return (
        <Box
            sx={{
                mx: 'auto',
                width: '100%',
                border: '1px solid #e0e0e0',
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
            }}
        >
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <Box
                    key={index}
                    sx={{
                        p: 1,
                        textAlign: 'center',
                        borderBottom: '1px solid #e0e0e0',
                        fontWeight: 'bold',
                    }}
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
