import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreatePatient } from '@/hooks/patients/useCreatePatient';
import { PatientCreate } from '@/types/patients';

interface RegisterPatientDialogProps {
    open: boolean;
    onClose: () => void;
    clinicId: number;
    doctorId: number;
    onRegistered?: (patientId: number) => void;
}

export default function RegisterPatientDialog({
    open,
    onClose,
    clinicId,
    doctorId,
    onRegistered,
}: RegisterPatientDialogProps) {
    const createMutation = useCreatePatient();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PatientCreate>({
        defaultValues: {
            health_card_number: '',
            surname: '',
            first_name: '',
            phone_number: '',
            doctor_id: doctorId,
            clinic_id: clinicId,
        },
    });

    const onSubmit = (data: PatientCreate) => {
        createMutation.mutate(data, {
            onSuccess: (patient) => {
                reset();
                if (onRegistered) onRegistered(patient.id);
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Register New Patient</DialogTitle>
            <DialogContent>
                {createMutation.isError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (createMutation.error as any)?.message || 'Error registering patient'
                        }
                    </Alert>
                )}
                <form id="register-patient-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="health_card_number"
                                control={control}
                                rules={{ required: 'Health card number is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Health Card #"
                                        fullWidth
                                        error={!!errors.health_card_number}
                                        helperText={errors.health_card_number?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="surname"
                                control={control}
                                rules={{ required: 'Surname is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Surname"
                                        fullWidth
                                        error={!!errors.surname}
                                        helperText={errors.surname?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="first_name"
                                control={control}
                                rules={{ required: 'First name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        fullWidth
                                        error={!!errors.first_name}
                                        helperText={errors.first_name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="phone_number"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Phone Number"
                                        fullWidth
                                        error={!!errors.phone_number}
                                        helperText={errors.phone_number?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={createMutation.isPending}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    form="register-patient-form"
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? <CircularProgress size={24} /> : 'Register'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
