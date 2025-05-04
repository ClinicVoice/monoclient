'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    TextField,
    FormControlLabel,
    Switch,
    Button,
    CircularProgress,
    Alert,
    Grid,
    Stack,
} from '@mui/material';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useDoctor } from '@/hooks/doctors/useDoctor';
import { useUpdateDoctor } from '@/hooks/doctors/useUpdateDoctor';
import { UpdateDoctorRequest } from '@/types/doctors';
import DoctorDailyBlockSettings from '@/components/doctors/DoctorDailyBlockSettings';
import DoctorTimeOffSettings from '@/components/doctors/DoctorTimeOffSettings';

export default function DoctorDetail() {
    const params = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(params);
    const doctorId = Number(params['doctor-id']);

    const { data: doctor, isLoading, error } = useDoctor(doctorId);
    const updateMutation = useUpdateDoctor(doctorId);

    const [form, setForm] = useState<UpdateDoctorRequest>({
        name: '',
        default_appt_duration_minutes: undefined,
        accepting_new_patients: undefined,
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (doctor) {
            setForm({
                name: doctor.name,
                default_appt_duration_minutes: doctor.default_appt_duration_minutes,
                accepting_new_patients: doctor.accepting_new_patients,
            });
        }
    }, [doctor]);

    const handleChange =
        (field: keyof UpdateDoctorRequest) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const value =
                field === 'accepting_new_patients' ? event.target.checked : event.target.value;
            setForm((prev) => ({ ...prev, [field]: value }));
        };

    const handleSave = () => {
        setShowSuccess(false);
        updateMutation.mutate(form, {
            onSuccess: () => {
                setShowSuccess(true);
            },
        });
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !doctor) {
        return <Alert severity="error">Failed to load doctor.</Alert>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Stack spacing={4}>
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard/doctors`)}
                    >
                        Back to Doctors
                    </Button>
                </Box>

                <Card elevation={3}>
                    <CardHeader title="Edit Doctor" />
                    <CardContent>
                        {showSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Doctor updated successfully.
                            </Alert>
                        )}

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={form.name}
                                    onChange={handleChange('name')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Default Appointment Duration (min)"
                                    type="number"
                                    fullWidth
                                    value={form.default_appt_duration_minutes ?? ''}
                                    onChange={handleChange('default_appt_duration_minutes')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={form.accepting_new_patients ?? false}
                                            onChange={handleChange('accepting_new_patients')}
                                        />
                                    }
                                    label="Accepting New Patients"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    router.push(`/clinic/${clinicId}/admin/dashboard/doctors`)
                                }
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                disabled={updateMutation.isPending}
                            >
                                {updateMutation.isPending ? 'Saving…' : 'Save'}
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>

                <Card elevation={3}>
                    <CardHeader title="Schedule Blocks" />
                    <CardContent>
                        <DoctorDailyBlockSettings doctorId={doctorId} />
                    </CardContent>
                </Card>

                <Card elevation={3}>
                    <CardHeader title="Time Off" />
                    <CardContent>
                        <DoctorTimeOffSettings doctorId={doctorId} />
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
}
