'use client';

import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
    Button,
    TextField,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { exportAppointmentRecordRequestsToCSV } from '@/utils/exportUtils';
import { getScheduledAppointmentsByDate } from '@/services/familyClinicService';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { MonthView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/MonthView';
import { WeekView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/WeekView';
import { DayView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/DayView';
import { AppointmentRecordRequestDetailsPanel } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/AppointmentRecordRequestDetailsPanel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const AppointmentRecordRequestsCalendarView: React.FC = () => {
    const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('month');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecordRequest | null>(
        null,
    );

    const handleExport = async () => {
        let startDate: Date, endDate: Date;
        if (currentView === 'day') {
            startDate = currentDate;
            endDate = currentDate;
        } else if (currentView === 'week') {
            startDate = startOfWeek(currentDate);
            endDate = endOfWeek(currentDate);
        } else {
            const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            startDate = startOfWeek(monthStart);
            endDate = endOfWeek(monthEnd);
        }
        const days = eachDayOfInterval({ start: startDate, end: endDate });
        const appointmentsArrays = await Promise.all(
            days.map(async (day) => {
                const formattedDay = format(day, 'yyyy-MM-dd');
                const result = await getScheduledAppointmentsByDate(formattedDay);
                return result.scheduled_appointments || [];
            }),
        );
        const allAppointments = appointmentsArrays.flat();
        exportAppointmentRecordRequestsToCSV(allAppointments, currentView);
    };

    const handleViewChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: 'day' | 'week' | 'month',
    ) => {
        if (newView !== null) {
            setCurrentView(newView);
        }
    };

    const handlePrev = () => {
        if (currentView === 'day') {
            setCurrentDate(addDays(currentDate, -1));
        } else if (currentView === 'week') {
            setCurrentDate(addDays(currentDate, -7));
        } else if (currentView === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        }
    };

    const handleNext = () => {
        if (currentView === 'day') {
            setCurrentDate(addDays(currentDate, 1));
        } else if (currentView === 'week') {
            setCurrentDate(addDays(currentDate, 7));
        } else if (currentView === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        }
    };

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <IconButton onClick={handlePrev}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h3">
                    {currentView === 'day'
                        ? format(currentDate, 'PPP')
                        : currentView === 'week'
                          ? `${format(startOfWeek(currentDate), 'MMM d')} - ${format(
                                endOfWeek(currentDate),
                                'MMM d, yyyy',
                            )}`
                          : format(currentDate, 'MMMM yyyy')}
                </Typography>
                <IconButton onClick={handleNext}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    width: '100%',
                    gap: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExport}
                >
                    Export CSV
                </Button>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Date"
                        value={currentDate}
                        onChange={(newDate) => {
                            if (newDate) {
                                setCurrentDate(newDate);
                            }
                        }}
                    />
                </LocalizationProvider>
                <ToggleButtonGroup
                    value={currentView}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="calendar view"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ToggleButton value="day" aria-label="day view">
                        Day
                    </ToggleButton>
                    <ToggleButton value="week" aria-label="week view">
                        Week
                    </ToggleButton>
                    <ToggleButton value="month" aria-label="month view">
                        Month
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ width: '100%' }}>
                {currentView === 'month' && (
                    <MonthView
                        currentDate={currentDate}
                        onSelectAppointment={setSelectedAppointment}
                    />
                )}
                {currentView === 'week' && (
                    <WeekView date={currentDate} onSelectAppointment={setSelectedAppointment} />
                )}
                {currentView === 'day' && (
                    <DayView date={currentDate} onSelectAppointment={setSelectedAppointment} />
                )}
            </Box>

            {selectedAppointment && (
                <AppointmentRecordRequestDetailsPanel
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
        </Box>
    );
};
