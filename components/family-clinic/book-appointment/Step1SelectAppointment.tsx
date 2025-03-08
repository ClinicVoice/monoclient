import React, { useEffect, useState } from 'react';
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
import {
    CreateAppointmentForm,
    SetAppointmentField,
} from '@/types/family_clinic/appointment_records';
import {
    FamilyClinicProvider,
    FamilyClinicRestrictions,
} from '@/types/family_clinic/family_clinic';
import { parse } from 'date-fns';
import { CalendarDatePicker } from '@/components/datepicker/CalendarDatePicker';

interface Step1Props {
    appointment: CreateAppointmentForm;
    updateAppointmentField: SetAppointmentField;
    errors: { [key: string]: string };
    handleNext: () => void;
    onExit: () => void;
}

// TODO: move logic to backend
function isSlotRestricted(
    slot: string,
    appointmentDate: string,
    restrictions?: FamilyClinicRestrictions,
): boolean {
    const dateObj = new Date(appointmentDate);
    const slotDate = parse(slot, 'h:mm a', dateObj);

    if (!restrictions) {
        return false;
    }
    if (restrictions.unavailableDays && restrictions.unavailableDays.includes(appointmentDate)) {
        return true;
    }
    if (restrictions.dailyUnavailableRanges) {
        for (const range of restrictions.dailyUnavailableRanges) {
            const startTime = parse(range.start, 'HH:mm', dateObj);
            const endTime = parse(range.end, 'HH:mm', dateObj);
            if (slotDate >= startTime && slotDate < endTime) {
                return true;
            }
        }
    }
    if (restrictions.restrictedDays) {
        const restrictedForDate = restrictions.restrictedDays.find(
            (r) => r.date === appointmentDate,
        );
        if (restrictedForDate) {
            for (const range of restrictedForDate.unavailableRanges) {
                const startTime = parse(range.start, 'HH:mm', dateObj);
                const endTime = parse(range.end, 'HH:mm', dateObj);
                if (slotDate >= startTime && slotDate < endTime) {
                    return true;
                }
            }
        }
    }
    return false;
}

const MAX_DAYS_AHEAD = 45;

const Step1SelectAppointment = ({
    appointment,
    updateAppointmentField,
    errors,
    handleNext,
    onExit,
}: Step1Props) => {
    const router = useRouter();
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);

    const [selectedTime, setSelectedTime] = useState('');
    const {
        data: clinic,
        isLoading: clinicLoading,
        error: clinicError,
    } = useFamilyClinicInfo(familyClinicId);
    const { data, isLoading: slotsLoading } = useAvailableAppointmentSlots(
        appointment.date,
        appointment.duration,
    );

    const availableSlots = data?.available_times || [];
    const formattedSlots = extractStartTimes(availableSlots);

    const filteredSlots = formattedSlots.filter(
        (slot) => !isSlotRestricted(slot, appointment.date, clinic?.restrictions),
    );

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
                        updateAppointmentField(
                            'duration',
                            providerDurationMap[selectedProviderName] || 30,
                        );
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
                <CalendarDatePicker
                    label="Date"
                    value={appointment.date ? new Date(appointment.date) : null}
                    onChange={(newDate) => {
                        if (newDate) {
                            updateAppointmentField('date', newDate.toISOString().split('T')[0]);
                        }
                    }}
                    minDate={new Date()}
                    maxDate={new Date(new Date().getTime() + MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000)}
                    sx={{ width: '100%', marginTop: '0.5rem' }}
                />
            )}

            {appointment.date && (
                <>
                    {slotsLoading ? (
                        <Grid container justifyContent="center" mt={2}>
                            <CircularProgress />
                        </Grid>
                    ) : filteredSlots.length === 0 ? (
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
                                {filteredSlots.map((slot, index) => (
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
                    <Button variant="contained" color="secondary" onClick={onExit}>
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
