'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    CircularProgress,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { exportAppointmentsToCSV } from '@/utils/exportUtils';
import { getAppointmentsForDoctorByDate } from '@/services/doctorService';
import { AppointmentRead } from '@/types/appointments';
import { DoctorRead } from '@/types/doctors';
import { useAppointmentsForDoctorByDate } from '@/hooks/doctors/useAppointmentsForDoctorByDate';
import { useDoctorsByClinic } from '@/hooks/clinics/useDoctorsByClinic';
import { useParams } from 'next/navigation';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { MonthView } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/MonthView/MonthView';
import { WeekView } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/WeekView/WeekView';
import { DayView } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/DayView';
import { AppointmentDetailsPanel } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/AppointmentDetailsPanel';
import { BookAppointmentDialog } from '@/components/forms/book-appointment/BookAppointmentDialog';
import { DateNavigator } from '@/components/datepicker/DateNavigator';
import RegisterPatientDialog from '@/components/forms/register-patient/RegisterPatientDialog';

export type AppointmentsForDoctorCalendarViewProps = object;

export const AppointmentsForDoctorCalendarView = forwardRef<
    HTMLDivElement,
    AppointmentsForDoctorCalendarViewProps
>((props, ref) => {
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);
    const {
        data: doctors,
        isLoading: isDoctorsLoading,
        error: doctorsError,
    } = useDoctorsByClinic(clinicId);

    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

    useEffect(() => {
        if (!selectedDoctorId && doctors && doctors.length > 0) {
            setSelectedDoctorId(doctors[0].id);
        }
    }, [doctors, selectedDoctorId]);

    const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRead | null>(null);
    const [openCreateAppointment, setOpenCreateAppointment] = useState(false);
    const [openRegisterPatient, setOpenRegisterPatient] = useState(false);

    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const {
        data: appointments,
        isLoading: isApptsLoading,
        error: apptsError,
    } = useAppointmentsForDoctorByDate(selectedDoctorId ?? 0, formattedDate);

    const handleExport = async () => {
        if (!selectedDoctorId) return;
        let startDate: Date;
        let endDate: Date;
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
        const allAppointments = (
            await Promise.all(
                days.map((day) =>
                    getAppointmentsForDoctorByDate(
                        selectedDoctorId as number,
                        format(day, 'yyyy-MM-dd'),
                    ),
                ),
            )
        )
            .flat()
            .filter(Boolean);

        exportAppointmentsToCSV(allAppointments, `${currentView}-${selectedDoctorId}`);
    };

    const handleViewChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: 'day' | 'week' | 'month',
    ) => {
        if (newView) setCurrentView(newView);
    };

    const handlePrev = () => {
        if (currentView === 'day') setCurrentDate(addDays(currentDate, -1));
        else if (currentView === 'week') setCurrentDate(addDays(currentDate, -7));
        else setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNext = () => {
        if (currentView === 'day') setCurrentDate(addDays(currentDate, 1));
        else if (currentView === 'week') setCurrentDate(addDays(currentDate, 7));
        else setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const displayDate =
        currentView === 'day'
            ? format(currentDate, 'PPP')
            : currentView === 'week'
              ? `${format(startOfWeek(currentDate), 'MMM d')} - ${format(
                    endOfWeek(currentDate),
                    'MMM d, yyyy',
                )}`
              : format(currentDate, 'MMMM yyyy');

    return (
        <Box sx={{ width: '100%', mb: 4 }} ref={ref}>
            <Typography align="center" variant="h2">
                Scheduled Appointments
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                    mb: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl size="small">
                        <InputLabel id="doctor-select-label">Doctor</InputLabel>
                        <Select
                            labelId="doctor-select-label"
                            value={selectedDoctorId ?? ''}
                            label="Doctor"
                            onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                            disabled={isDoctorsLoading || !doctors?.length}
                            sx={{ minWidth: 150 }}
                        >
                            {doctors?.map((doc: DoctorRead) => (
                                <MenuItem key={doc.id} value={doc.id}>
                                    {doc.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenCreateAppointment(true)}
                        disabled={!selectedDoctorId}
                    >
                        Create Appointment
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenRegisterPatient(true)}
                        disabled={!selectedDoctorId}
                    >
                        Create Patient
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FileDownloadIcon />}
                        onClick={handleExport}
                        disabled={!selectedDoctorId}
                    >
                        Export CSV
                    </Button>
                    {isDoctorsLoading && <CircularProgress size={24} />}
                    {doctorsError && <Typography color="error">Error loading doctors</Typography>}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <DateNavigator
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        formattedDate={displayDate}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                    <ToggleButtonGroup
                        value={currentView}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="calendar view"
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ToggleButton value="day">Day</ToggleButton>
                        <ToggleButton value="week">Week</ToggleButton>
                        <ToggleButton value="month">Month</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            <Box sx={{ width: '100%' }}>
                {selectedDoctorId ? (
                    currentView === 'month' ? (
                        <MonthView
                            currentDate={currentDate}
                            doctorId={selectedDoctorId}
                            onSelectAppointment={setSelectedAppointment}
                        />
                    ) : currentView === 'week' ? (
                        <WeekView
                            date={currentDate}
                            doctorId={selectedDoctorId}
                            onSelectAppointment={setSelectedAppointment}
                        />
                    ) : (
                        <DayView
                            date={currentDate}
                            doctorId={selectedDoctorId}
                            onSelectAppointment={setSelectedAppointment}
                        />
                    )
                ) : (
                    <Typography>Select a doctor to view appointments</Typography>
                )}
            </Box>

            {selectedAppointment && (
                <AppointmentDetailsPanel
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}

            <BookAppointmentDialog
                open={openCreateAppointment}
                onClose={() => setOpenCreateAppointment(false)}
            />

            {selectedDoctorId && (
                <RegisterPatientDialog
                    open={openRegisterPatient}
                    onClose={() => setOpenRegisterPatient(false)}
                    clinicId={clinicId}
                    doctorId={selectedDoctorId}
                />
            )}
        </Box>
    );
});
AppointmentsForDoctorCalendarView.displayName = 'AppointmentsForDoctorCalendarView';
