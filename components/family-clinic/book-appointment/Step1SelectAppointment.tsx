'use client';

import { useEffect, useState } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { StepCard } from '@/app/family-clinic/[family-clinic-id]/book-appointment/styles';
import { useRouter, useParams } from 'next/navigation';
import { useAvailableAppointmentSlots } from '@/hooks/family_clinic/useAvailableAppointmentSlots';
import { extractStartTimes } from '@/utils/dateTimeUtils';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {
    CreateAppointmentForm,
    SetAppointmentField,
} from '@/types/family_clinic/appointment_records';
import { FamilyClinicProvider } from '@/types/family_clinic/family_clinic';

interface Step1Props {
    appointment: CreateAppointmentForm;
    updateAppointmentField: SetAppointmentField;
    errors: { [key: string]: string };
    handleNext: () => void;
}

const Step1SelectAppointment = ({
    appointment,
    updateAppointmentField,
    errors,
    handleNext,
}: Step1Props) => {
    const router = useRouter();
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);

    const [selectedTime, setSelectedTime] = useState('');
    const [appointmentDuration, setAppointmentDuration] = useState(30);

    const {
        data: clinic,
        isLoading: clinicLoading,
        error: clinicError,
    } = useFamilyClinicInfo(familyClinicId);
    const { data, isLoading: slotsLoading } = useAvailableAppointmentSlots(
        appointment.date,
        appointmentDuration,
    );

    const availableSlots = data?.available_times || [];
    const formattedSlots = extractStartTimes(availableSlots);

    const providerDurationMap =
        clinic?.providers.reduce<Record<string, number>>((acc, provider: FamilyClinicProvider) => {
            acc[provider.name] = provider.appointmentDuration;
            return acc;
        }, {}) || {};

    useEffect(() => {
        if (selectedTime) {
            updateAppointmentField('time', selectedTime);
        }
    }, [selectedTime, updateAppointmentField]);

    if (clinicLoading) {
        return <CircularProgress />;
    }

    if (clinicError || !clinic) {
        return <Alert severity="error">Failed to load clinic information.</Alert>;
    }

    return (
        <StepCard>
            <FormControl fullWidth margin="normal" error={!!errors.provider}>
                <InputLabel>Provider</InputLabel>
                <Select
                    sx={{ textAlign: 'left' }}
                    label="Provider"
                    value={appointment.provider}
                    onChange={(e) => {
                        const selectedProviderName = e.target.value;
                        updateAppointmentField('provider', selectedProviderName);
                        setAppointmentDuration(providerDurationMap[selectedProviderName] || 30);
                    }}
                >
                    {clinic.providers.map((provider, index) => (
                        <MenuItem key={index} value={provider.name}>
                            {provider.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {appointment.provider && (
                <>
                    <FormControl fullWidth margin="normal" error={!!errors.appointment_type}>
                        <InputLabel>Appointment Type</InputLabel>
                        <Select
                            sx={{ textAlign: 'left' }}
                            label="Appointment Type"
                            value={appointment.appointment_type}
                            onChange={(e) =>
                                updateAppointmentField('appointment_type', e.target.value)
                            }
                        >
                            {clinic.appointmentTypes.map((type: string, index: number) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Reason for Visit"
                        inputProps={{ maxLength: 150 }}
                        value={appointment.note}
                        onChange={(e) => updateAppointmentField('note', e.target.value)}
                        error={!!errors.note}
                        helperText={errors.note}
                    />
                </>
            )}

            {appointment.provider && appointment.appointment_type && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        value={appointment.date ? new Date(appointment.date) : null}
                        onChange={(newDate) => {
                            if (newDate) {
                                updateAppointmentField('date', newDate.toISOString().split('T')[0]);
                            }
                        }}
                        minDate={new Date()}
                        maxDate={
                            new Date(
                                new Date().getFullYear() + 50,
                                new Date().getMonth(),
                                new Date().getDate(),
                            )
                        }
                        sx={{
                            width: '100%',
                            marginTop: '0.5rem',
                        }}
                    />
                </LocalizationProvider>
            )}

            {appointment.date && (
                <>
                    {slotsLoading ? (
                        <Grid container justifyContent="center" mt={2}>
                            <CircularProgress />
                        </Grid>
                    ) : formattedSlots.length === 0 ? (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                            No available appointment slots for this date. Please select another
                            date.
                        </Alert>
                    ) : (
                        <FormControl fullWidth margin="normal" error={!!errors.time}>
                            <InputLabel>Time Slot</InputLabel>
                            <Select
                                sx={{ textAlign: 'left' }}
                                label="Time Slot"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                {formattedSlots.map((slot, index) => (
                                    <MenuItem key={index} value={slot}>
                                        {slot}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </>
            )}

            <Grid container spacing={2} mt={2} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(`/family-clinic/${familyClinicId}`)}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </Grid>
            </Grid>
        </StepCard>
    );
};

export default Step1SelectAppointment;
