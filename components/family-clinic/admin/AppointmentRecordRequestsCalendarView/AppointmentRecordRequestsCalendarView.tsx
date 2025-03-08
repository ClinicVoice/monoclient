import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Box, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { exportAppointmentRecordRequestsToCSV } from '@/utils/exportUtils';
import { getScheduledAppointmentsByDate } from '@/services/familyClinicService';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { MonthView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/MonthView/MonthView';
import { WeekView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/WeekView/WeekView';
import { DayView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/DayView';
import { AppointmentRecordRequestDetailsPanel } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/AppointmentRecordRequestDetailsPanel';
import { BookAppointmentDialog } from '@/components/family-clinic/book-appointment/BookAppointmentDialog';
import { DateNavigator } from '@/components/datepicker/DateNavigator';

export const AppointmentRecordRequestsCalendarView = () => {
    const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecordRequest | null>(
        null,
    );
    const [openCreateAppointment, setOpenCreateAppointment] = useState(false);

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

    const formattedDate =
        currentView === 'day'
            ? format(currentDate, 'PPP')
            : currentView === 'week'
              ? `${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}`
              : format(currentDate, 'MMMM yyyy');

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenCreateAppointment(true)}
                    >
                        Create Appointment
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FileDownloadIcon />}
                        onClick={handleExport}
                    >
                        Export CSV
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        <DateNavigator
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            formattedDate={formattedDate}
                            onPrev={handlePrev}
                            onNext={handleNext}
                        />
                    </Box>
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

            <BookAppointmentDialog
                open={openCreateAppointment}
                onClose={() => setOpenCreateAppointment(false)}
            />
        </Box>
    );
};
