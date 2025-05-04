'use client';

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    FormControlLabel,
    Switch,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateDoctor } from '@/hooks/doctors/useCreateDoctor';
import { DoctorCreateRequest, DoctorRead } from '@/types/doctors';

interface CreateDoctorDialogProps {
    open: boolean;
    onClose: () => void;
    clinicId: number;
    onCreated?: (doctor: DoctorRead) => void;
}

export default function CreateDoctorDialog({
    open,
    onClose,
    clinicId,
    onCreated,
}: CreateDoctorDialogProps) {
    const createMutation = useCreateDoctor();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DoctorCreateRequest>({
        defaultValues: {
            name: '',
            clinic_id: clinicId,
            default_appt_duration_minutes: 15,
            accepting_new_patients: true,
        },
    });

    const onSubmit = (data: DoctorCreateRequest) => {
        createMutation.mutate(data, {
            onSuccess: (doctor) => {
                reset();
                if (onCreated) onCreated(doctor);
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create New Doctor</DialogTitle>
            <DialogContent>
                {createMutation.isError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (createMutation.error as any)?.message || 'Error creating doctor'
                        }
                    </Alert>
                )}
                <form id="create-doctor-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="default_appt_duration_minutes"
                                control={control}
                                rules={{
                                    required: 'Duration is required',
                                    min: { value: 1, message: 'Must be at least 1' },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Default Duration (min)"
                                        type="number"
                                        fullWidth
                                        error={!!errors.default_appt_duration_minutes}
                                        helperText={errors.default_appt_duration_minutes?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="accepting_new_patients"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        }
                                        label="Accepting New Patients"
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
                    form="create-doctor-form"
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? <CircularProgress size={24} /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
