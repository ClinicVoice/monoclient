import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import {
    CreateAppointmentForm,
    SetAppointmentField,
} from '@/types/family_clinic/appointment_records';
import { StepCard } from '@/app/family-clinic/[family-clinic-id]/book-appointment/styles';
import { useRouter } from 'next/navigation';

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
    return (
        <StepCard>
            <FormControl fullWidth margin="normal" error={!!errors.provider}>
                <InputLabel>Provider</InputLabel>
                <Select
                    label="Provider"
                    value={appointment.provider}
                    onChange={(e) => updateAppointmentField('provider', e.target.value)}
                >
                    <MenuItem value="Dr. John Doe">Dr. John Doe</MenuItem>
                </Select>
            </FormControl>
            {appointment.provider && (
                <FormControl fullWidth margin="normal" error={!!errors.appointmentType}>
                    <InputLabel>Appointment Type</InputLabel>
                    <Select
                        label="Appointment Type"
                        value={appointment.appointmentType}
                        onChange={(e) => updateAppointmentField('appointmentType', e.target.value)}
                    >
                        <MenuItem value="General Consultation">General Consultation</MenuItem>
                    </Select>
                </FormControl>
            )}
            {appointment.provider && (
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
            )}
            {appointment.provider && appointment.appointmentType && (
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
                />
            )}
            {appointment.date && (
                <TextField
                    fullWidth
                    margin="normal"
                    label="Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={appointment.time}
                    onChange={(e) => updateAppointmentField('time', e.target.value)}
                    error={!!errors.time}
                    helperText={errors.time}
                />
            )}
            <Grid container spacing={2} mt={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={!appointment.provider}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </StepCard>
    );
};

export default Step1SelectAppointment;
