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
import { useRouter } from 'next/navigation';
import { useAvailableAppointmentSlots } from '@/hooks/family_clinic/useAvailableAppointmentSlots';
import { extractStartTimes } from '@/utils/dateTimeUtils';
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
    const [selectedTime, setSelectedTime] = useState('');

    const { data, isLoading } = useAvailableAppointmentSlots(appointment.date, 30);
    const availableSlots = data?.available_times || [];
    const formattedSlots = extractStartTimes(availableSlots);

    useEffect(() => {
        if (selectedTime) {
            updateAppointmentField('time', selectedTime);
        }
    }, [selectedTime, updateAppointmentField]);

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
                    <MenuItem value="Dr. John Doe">Dr. John Doe</MenuItem>
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
                            <MenuItem value="General Consultation">General Consultation</MenuItem>
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
                    {isLoading ? (
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
