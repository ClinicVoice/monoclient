import React, { useEffect, useState } from 'react';
import {
    Grid,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';
import { StepCard } from '@/app/clinic/[clinic-id]/book-appointment/styles';
import { useParams } from 'next/navigation';
import { useDoctorsByClinic } from '@/hooks/clinics/useDoctorsByClinic';
import { useAvailableSlotsForDoctorByDate } from '@/hooks/doctors/useAvailableSlotsForDoctorByDate';
import { CreateAppointmentForm, SetAppointmentField } from '@/types/appointments';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { CalendarDatePicker } from '@/components/datepicker/CalendarDatePicker';
import { format, parseISO } from 'date-fns';

interface Step1Props {
    appointment: CreateAppointmentForm;
    updateAppointmentField: SetAppointmentField;
    errors: Record<string, string>;
    handleNext: () => void;
    onExit: () => void;
}

const MAX_DAYS_AHEAD = 45;

export default function Step1SelectAppointment({
    appointment,
    updateAppointmentField,
    errors,
    handleNext,
    onExit,
}: Step1Props) {
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);

    const {
        data: doctors,
        isLoading: doctorsLoading,
        error: doctorsError,
    } = useDoctorsByClinic(clinicId);

    const dateStr = appointment.appt_start_time.split('T')[0];
    const {
        data: slots,
        isLoading: slotsLoading,
        error: slotsError,
    } = useAvailableSlotsForDoctorByDate(
        appointment.doctor_id,
        dateStr,
        appointment.appt_duration_minutes,
    );

    const [selectedTime, setSelectedTime] = useState<string>(appointment.appt_start_time || '');

    useEffect(() => {
        if (selectedTime) updateAppointmentField('appt_start_time', selectedTime);
    }, [selectedTime, updateAppointmentField]);

    if (doctorsLoading) return <CircularProgress />;
    if (doctorsError) return <Alert severity="error">Failed to load doctors.</Alert>;

    return (
        <StepCard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.doctor_id}>
                        <InputLabel id="doctor-select-label">Doctor</InputLabel>
                        <Select
                            labelId="doctor-select-label"
                            sx={{ textAlign: 'left' }}
                            value={appointment.doctor_id || ''}
                            label="Doctor"
                            onChange={(e) =>
                                updateAppointmentField('doctor_id', Number(e.target.value))
                            }
                        >
                            <MenuItem value="" disabled>
                                Select a doctor
                            </MenuItem>
                            {doctors?.map((doc) => (
                                <MenuItem key={doc.id} value={doc.id}>
                                    {doc.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Reason for Visit"
                        value={appointment.notes}
                        onChange={(e) => updateAppointmentField('notes', e.target.value)}
                        error={!!errors.notes}
                        helperText={errors.notes}
                    />
                </Grid>

                {Boolean(appointment.doctor_id) && (
                    <Grid item xs={12}>
                        <CalendarDatePicker
                            label="Date"
                            sx={{ width: '100%' }}
                            value={dateStr ? new Date(dateStr) : null}
                            onChange={(newDate) => {
                                if (newDate) {
                                    const isoDate = newDate.toISOString().split('T')[0];
                                    updateAppointmentField('appt_start_time', `${isoDate}T00:00`);
                                }
                            }}
                            minDate={new Date()}
                            maxDate={new Date(Date.now() + MAX_DAYS_AHEAD * 86400000)}
                        />
                    </Grid>
                )}

                {Boolean(appointment.doctor_id && dateStr) && (
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.appt_start_time}>
                            {slotsLoading ? (
                                <CircularProgress size={24} />
                            ) : slotsError ? (
                                <Alert severity="error">Failed to load slots.</Alert>
                            ) : (
                                <>
                                    <InputLabel>Time Slot</InputLabel>
                                    <Select
                                        value={selectedTime}
                                        sx={{ textAlign: 'left' }}
                                        fullWidth
                                        label="Time Slot"
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    >
                                        <MenuItem value="" disabled>
                                            Select a time
                                        </MenuItem>
                                        {slots?.map((slot) => {
                                            const iso = format(
                                                parseISO(`${dateStr}T${slot}`),
                                                "yyyy-MM-dd'T'HH:mm'",
                                            );
                                            return (
                                                <MenuItem key={slot} value={iso}>
                                                    {slot}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </>
                            )}
                        </FormControl>
                    </Grid>
                )}

                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="outlined" onClick={onExit}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </StepCard>
    );
}
