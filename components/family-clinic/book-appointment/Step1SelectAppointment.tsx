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
import {
    CreateAppointmentForm,
    SetAppointmentField,
} from '@/types/family_clinic/appointment_records';
import { StepCard } from '@/app/family-clinic/[family-clinic-id]/book-appointment/styles';
import { useRouter, useParams } from 'next/navigation';
import { useAvailableAppointmentSlots } from '@/hooks/family_clinic/useAvailableAppointmentSlots';
import { extractStartTimes } from '@/utils/dateTimeUtils';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';

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

    const {
        data: clinic,
        isLoading: clinicLoading,
        error: clinicError,
    } = useFamilyClinicInfo(familyClinicId);
    const { data, isLoading: slotsLoading } = useAvailableAppointmentSlots(appointment.date, 30);

    const availableSlots = data?.available_times || [];
    const formattedSlots = extractStartTimes(availableSlots);

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
                    onChange={(e) => updateAppointmentField('provider', e.target.value)}
                >
                    {clinic.providers.map((provider: string, index: number) => (
                        <MenuItem key={index} value={provider}>
                            {provider}
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
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={appointment.date}
                        onChange={(e) => updateAppointmentField('date', e.target.value)}
                        error={!!errors.date}
                        helperText={errors.date}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    />
                </>
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
                    <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
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
