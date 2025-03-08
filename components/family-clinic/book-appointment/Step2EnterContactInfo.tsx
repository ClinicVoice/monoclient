import {
    TextField,
    Button,
    Grid,
    Switch,
    FormControlLabel,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    CreateAppointmentForm,
    SetAppointmentField,
} from '@/types/family_clinic/appointment_records';
import { StepCard } from '@/app/family-clinic/[family-clinic-id]/book-appointment/styles';
import { MuiTelInput } from 'mui-tel-input';
import { CalendarDatePicker } from '@/components/datepicker/CalendarDatePicker';

interface Step2Props {
    appointment: CreateAppointmentForm;
    updateAppointmentField: SetAppointmentField;
    errors: { [key: string]: string };
    handleBack: () => void;
    handleSubmit: () => void;
    isPending: boolean;
}

const Step2EnterContactInfo = ({
    appointment,
    updateAppointmentField,
    errors,
    handleBack,
    handleSubmit,
    isPending,
}: Step2Props) => {
    const handleHealthCardToggle = (isHealthCard: boolean) => {
        updateAppointmentField('hasHealthCard', isHealthCard);

        if (isHealthCard) {
            updateAppointmentField('firstName', '');
            updateAppointmentField('lastName', '');
            updateAppointmentField('sex', '');
            updateAppointmentField('birthday', '');
        } else {
            updateAppointmentField('healthCardNumber', '');
            updateAppointmentField('healthCardVersion', '');
        }
    };

    return (
        <StepCard>
            <FormControlLabel
                control={
                    <Switch
                        checked={appointment.hasHealthCard}
                        onChange={(e) => handleHealthCardToggle(e.target.checked)}
                    />
                }
                label="Do you have an Ontario Health Card?"
            />

            {appointment.hasHealthCard ? (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Health Card Number"
                        value={appointment.healthCardNumber}
                        onChange={(e) => updateAppointmentField('healthCardNumber', e.target.value)}
                        error={!!errors.healthCardNumber}
                        helperText={errors.healthCardNumber}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Version"
                        value={appointment.healthCardVersion}
                        onChange={(e) =>
                            updateAppointmentField('healthCardVersion', e.target.value)
                        }
                        error={!!errors.healthCardVersion}
                        helperText={errors.healthCardVersion}
                    />
                </>
            ) : (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        value={appointment.firstName}
                        onChange={(e) => updateAppointmentField('firstName', e.target.value)}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        value={appointment.lastName}
                        onChange={(e) => updateAppointmentField('lastName', e.target.value)}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.sex}>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            label="Sex"
                            value={appointment.sex}
                            onChange={(e) => updateAppointmentField('sex', e.target.value)}
                            error={!!errors.sex}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <CalendarDatePicker
                        label="Birthday"
                        value={appointment.birthday ? new Date(appointment.birthday) : null}
                        onChange={(newDate) => {
                            if (newDate) {
                                updateAppointmentField(
                                    'birthday',
                                    newDate.toISOString().split('T')[0],
                                );
                            }
                        }}
                        sx={{
                            width: '100%',
                            marginTop: '0.5rem',
                        }}
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date()}
                    />
                </>
            )}

            <MuiTelInput
                fullWidth
                margin="normal"
                label="Phone Number"
                value={appointment.contact}
                onChange={(newValue) => updateAppointmentField('contact', newValue)}
                error={!!errors.contact}
                helperText={errors.contact}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={appointment.email}
                onChange={(e) => updateAppointmentField('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
            />

            <Grid container spacing={2} mt={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? 'Booking...' : 'Book Appointment'}
                    </Button>
                </Grid>
            </Grid>
        </StepCard>
    );
};

export default Step2EnterContactInfo;
