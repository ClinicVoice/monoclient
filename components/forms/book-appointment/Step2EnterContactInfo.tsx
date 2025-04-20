import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { StepCard } from '@/app/clinic/[clinic-id]/book-appointment/styles';
import { CreateAppointmentForm, SetAppointmentField } from '@/types/appointments';

interface Step2Props {
    appointment: CreateAppointmentForm;
    updateAppointmentField: SetAppointmentField;
    errors: Record<string, string>;
    handleBack: () => void;
    handleSubmit: () => void;
    isPending: boolean;
}

export default function Step2EnterContactInfo({
    appointment,
    updateAppointmentField,
    errors,
    handleBack,
    handleSubmit,
    isPending,
}: Step2Props) {
    return (
        <StepCard>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Health Card Number"
                        value={appointment.health_card_number}
                        onChange={(e) =>
                            updateAppointmentField('health_card_number', e.target.value)
                        }
                        error={!!errors.health_card_number}
                        helperText={errors.health_card_number}
                        margin="normal"
                    />
                </Grid>

                <Grid item xs={12}>
                    <MuiTelInput
                        fullWidth
                        label="Phone Number"
                        value={appointment.phone_number}
                        onChange={(val) => updateAppointmentField('phone_number', val)}
                        error={!!errors.phone_number}
                        helperText={errors.phone_number}
                        margin="normal"
                    />
                </Grid>

                <Grid container item xs={12} spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="outlined" onClick={handleBack}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending ? 'Submitting...' : 'Next'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </StepCard>
    );
}
