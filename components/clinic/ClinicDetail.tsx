'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Alert,
    Stack,
} from '@mui/material';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useClinic } from '@/hooks/clinics/useClinic';
import { useUpdateClinic } from '@/hooks/clinics/useUpdateClinic';
import { ClinicUpdateRequest } from '@/types/clinics';

export default function ClinicDetail() {
    const params = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(params);

    const { data: clinic, isLoading, error } = useClinic(clinicId);
    const updateMutation = useUpdateClinic(clinicId);

    const [form, setForm] = useState<ClinicUpdateRequest>({});
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (clinic) {
            setForm({
                name: clinic.name,
                address: clinic.address,
                phone: clinic.phone,
                email: clinic.email,
                accepting_new_patients: clinic.accepting_new_patients,
            });
        }
    }, [clinic]);

    const handleChange =
        (field: keyof ClinicUpdateRequest) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (error || !clinic) {
        return <Alert severity="error">Failed to load clinic data.</Alert>;
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Stack spacing={4}>
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard`)}
                    >
                        Back to Dashboard
                    </Button>
                </Box>

                <Card elevation={3}>
                    <CardHeader title="Edit Clinic Details" />
                    <CardContent>
                        {showSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Clinic updated successfully.
                            </Alert>
                        )}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={form.name || ''}
                                    onChange={handleChange('name')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    fullWidth
                                    value={form.address || ''}
                                    onChange={handleChange('address')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone"
                                    fullWidth
                                    value={form.phone || ''}
                                    onChange={handleChange('phone')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={form.email || ''}
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                onClick={() => router.push(`/clinic/${clinicId}`)}
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

                <Typography variant="body2" color="textSecondary" align="center">
                    Created at: {new Date(clinic.created_at).toLocaleString()}
                </Typography>
            </Stack>
        </Container>
    );
}
