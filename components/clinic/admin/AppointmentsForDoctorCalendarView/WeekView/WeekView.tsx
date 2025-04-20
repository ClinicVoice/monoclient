'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { AppointmentRead } from '@/types/appointments';
import { WeekViewDayColumn } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/WeekView/WeekViewDayColumn';
import { WeekViewTimeLabels } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/WeekView/WeekViewTimeLabels';

export interface WeekViewProps {
    doctorId: number;
    date: Date;
    onSelectAppointment: (app: AppointmentRead) => void;
}

const totalMinutes = 12 * 60; // 720 minutes (8 AM to 8 PM)

export const WeekView = ({ doctorId, date, onSelectAppointment }: WeekViewProps) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
        <Box sx={{ display: 'flex', width: '100%', mx: 'auto' }}>
            <WeekViewTimeLabels totalMinutes={totalMinutes} />
            <Box sx={{ flex: 1 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    {days.map((day) => (
                        <Box
                            key={format(day, 'yyyy-MM-dd')}
                            sx={{
                                textAlign: 'center',
                                py: 1,
                                borderRight: '1px solid #e0e0e0',
                            }}
                        >
                            <Typography variant="subtitle2">{format(day, 'EEE, MMM d')}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        height: totalMinutes,
                    }}
                >
                    {days.map((day) => (
                        <WeekViewDayColumn
                            key={format(day, 'yyyy-MM-dd')}
                            doctorId={doctorId}
                            day={day}
                            onSelectAppointment={onSelectAppointment}
                            totalMinutes={totalMinutes}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
