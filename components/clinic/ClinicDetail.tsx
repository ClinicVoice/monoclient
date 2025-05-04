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
    Paper,
} from '@mui/material';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useClinic } from '@/hooks/clinics/useClinic';
import { useUpdateClinic } from '@/hooks/clinics/useUpdateClinic';
import { ClinicUpdateRequest } from '@/types/clinics';
import { ClinicOpeningHours } from '@/types/openingHours';
import { useOpeningHoursForClinic } from '@/hooks/clinics/useOpeningHoursForClinic';
import { useUpdateOpeningHoursForClinic } from '@/hooks/clinics/useUpdateOpeningHoursForClinic';

const dayLabels: Record<keyof ClinicOpeningHours['opening_hours'], string> = {
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
};

export default function ClinicDetail() {
    const params = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(params);

    const { data: clinic, isLoading: clinicLoading, error: clinicError } = useClinic(clinicId);
    const updateClinicMutation = useUpdateClinic(clinicId);

    const {
        data: hours,
        isLoading: hoursLoading,
        error: hoursError,
    } = useOpeningHoursForClinic(clinicId);
    const updateHoursMutation = useUpdateOpeningHoursForClinic(clinicId);

    const [clinicForm, setClinicForm] = useState<ClinicUpdateRequest>({});
    const [hoursForm, setHoursForm] = useState<ClinicOpeningHours | null>(null);
    const [showClinicSuccess, setShowClinicSuccess] = useState(false);
    const [showHoursSuccess, setShowHoursSuccess] = useState(false);

    useEffect(() => {
        if (clinic) {
            setClinicForm({
                name: clinic.name,
                address: clinic.address,
                phone: clinic.phone,
                email: clinic.email,
                accepting_new_patients: clinic.accepting_new_patients,
            });
        }
    }, [clinic]);

    useEffect(() => {
        if (hours) {
            setHoursForm(hours);
        }
    }, [hours]);

    const handleClinicChange =
        (field: keyof ClinicUpdateRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = field === 'accepting_new_patients' ? e.target.checked : e.target.value;
            setClinicForm((prev) => ({ ...prev, [field]: value }));
        };
    const saveClinic = () => {
        setShowClinicSuccess(false);
        updateClinicMutation.mutate(clinicForm, {
            onSuccess: () => setShowClinicSuccess(true),
        });
    };

    const toggleClosed =
        (day: keyof ClinicOpeningHours['opening_hours']) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!hoursForm) return;
            const closed = e.target.checked;
            setHoursForm(
                (prev) =>
                    prev && {
                        ...prev,
                        opening_hours: {
                            ...prev.opening_hours,
                            [day]: closed
                                ? null
                                : { open_time: '09:00:00', close_time: '17:00:00' },
                        },
                    },
            );
        };

    const handleTimeChange =
        (day: keyof ClinicOpeningHours['opening_hours'], field: 'open_time' | 'close_time') =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!hoursForm) return;
            const val = e.target.value;
            setHoursForm(
                (prev) =>
                    prev && {
                        ...prev,
                        opening_hours: {
                            ...prev.opening_hours,
                            [day]: prev.opening_hours[day]
                                ? { ...prev.opening_hours[day]!, [field]: val }
                                : { open_time: val, close_time: val },
                        },
                    },
            );
        };

    const saveHours = () => {
        if (!hoursForm) return;
        setShowHoursSuccess(false);
        updateHoursMutation.mutate(hoursForm, {
            onSuccess: () => setShowHoursSuccess(true),
        });
    };

    if (clinicLoading || hoursLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }
    if (clinicError) {
        return <Alert severity="error">Failed to load clinic data.</Alert>;
    }
    if (hoursError) {
        return <Alert severity="error">Failed to load opening hours.</Alert>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* Back button */}
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard`)}
                    >
                        Back to Dashboard
                    </Button>
                </Box>

                {/* Clinic details form */}
                <Card elevation={3}>
                    <CardHeader title="Edit Clinic Details" />
                    <CardContent>
                        {showClinicSuccess && <Alert severity="success">Clinic updated!</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={clinicForm.name || ''}
                                    onChange={handleClinicChange('name')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    fullWidth
                                    value={clinicForm.address || ''}
                                    onChange={handleClinicChange('address')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone"
                                    fullWidth
                                    value={clinicForm.phone || ''}
                                    onChange={handleClinicChange('phone')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={clinicForm.email || ''}
                                    onChange={handleClinicChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={clinicForm.accepting_new_patients ?? false}
                                            onChange={handleClinicChange('accepting_new_patients')}
                                        />
                                    }
                                    label="Accepting New Patients"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push(`/clinic/${clinicId}`)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={saveClinic}
                            disabled={updateClinicMutation.isPending}
                        >
                            {updateClinicMutation.isPending ? 'Saving…' : 'Save'}
                        </Button>
                    </CardActions>
                </Card>

                {/* Opening hours form */}
                {hoursForm && (
                    <Card elevation={3}>
                        <CardHeader title="Opening Hours" />
                        <CardContent>
                            {showHoursSuccess && (
                                <Alert severity="success">Opening hours updated!</Alert>
                            )}
                            <Grid container spacing={2}>
                                {Object.keys(hoursForm.opening_hours).map((key) => {
                                    const day = key as keyof ClinicOpeningHours['opening_hours'];
                                    const range = hoursForm.opening_hours[day];
                                    const closed = range === null;
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={day}>
                                            <Paper variant="outlined" sx={{ p: 2 }}>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle1">
                                                        {dayLabels[day]}
                                                    </Typography>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={closed}
                                                                onChange={toggleClosed(day)}
                                                            />
                                                        }
                                                        label="Closed"
                                                    />
                                                    {!closed && (
                                                        <>
                                                            <TextField
                                                                label="Open"
                                                                type="time"
                                                                fullWidth
                                                                value={range.open_time}
                                                                onChange={handleTimeChange(
                                                                    day,
                                                                    'open_time',
                                                                )}
                                                                InputLabelProps={{ shrink: true }}
                                                            />
                                                            <TextField
                                                                label="Close"
                                                                type="time"
                                                                fullWidth
                                                                value={range.close_time}
                                                                onChange={handleTimeChange(
                                                                    day,
                                                                    'close_time',
                                                                )}
                                                                InputLabelProps={{ shrink: true }}
                                                            />
                                                        </>
                                                    )}
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={saveHours}
                                disabled={updateHoursMutation.isPending}
                            >
                                {updateHoursMutation.isPending ? 'Saving…' : 'Save Hours'}
                            </Button>
                        </CardActions>
                    </Card>
                )}

                {clinic && (
                    <Typography variant="body2" color="textSecondary" align="center">
                        Created at: {new Date(clinic.created_at).toLocaleString()}
                    </Typography>
                )}
            </Stack>
        </Container>
    );
}
