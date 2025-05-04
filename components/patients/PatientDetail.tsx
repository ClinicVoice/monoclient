'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { usePatient } from '@/hooks/patients/usePatient';
import { useUpdatePatient } from '@/hooks/patients/useUpdatePatient';
import { useDoctorsByClinic } from '@/hooks/clinics/useDoctorsByClinic';
import { PatientUpdate } from '@/types/patients';
import { ListDoctorsParams, DoctorRead } from '@/types/doctors';

export default function PatientDetail() {
    const params = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(params);
    const patientId = Number(params['patient-id']);

    const { data: patient, isLoading, error } = usePatient(patientId);
    const updateMutation = useUpdatePatient(patientId);

    const { data: doctors = [], isLoading: doctorsLoading } = useDoctorsByClinic(clinicId, {
        page: 1,
        limit: 500,
    } as ListDoctorsParams);

    const [form, setForm] = useState<PatientUpdate>({});
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (patient) {
            setForm({
                health_card_number: patient.health_card_number,
                surname: patient.surname,
                first_name: patient.first_name,
                phone_number: patient.phone_number || '',
                doctor_id: patient.doctor_id || undefined,
            });
        }
    }, [patient]);

    const handleChange =
        (field: keyof PatientUpdate) =>
        (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ value: unknown }>) => {
            const value = event.target.value;
            setForm((prev) => ({
                ...prev,
                [field]:
                    field === 'doctor_id'
                        ? value === ''
                            ? undefined
                            : Number(value)
                        : String(value),
            }));
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

    if (error || !patient) {
        return <Alert severity="error">Failed to load patient.</Alert>;
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard/patients`)}
                sx={{ mb: 2 }}
            >
                Back to Patients
            </Button>

            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Edit Patient
                    </Typography>

                    {showSuccess && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Patient updated successfully.
                        </Alert>
                    )}

                    <TextField
                        label="Health Card #"
                        fullWidth
                        margin="normal"
                        value={form.health_card_number || ''}
                        onChange={handleChange('health_card_number')}
                    />

                    <TextField
                        label="Surname"
                        fullWidth
                        margin="normal"
                        value={form.surname || ''}
                        onChange={handleChange('surname')}
                    />

                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        value={form.first_name || ''}
                        onChange={handleChange('first_name')}
                    />

                    <TextField
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        value={form.phone_number || ''}
                        onChange={handleChange('phone_number')}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="doctor-select-label">Assigned Doctor</InputLabel>
                        <Select
                            labelId="doctor-select-label"
                            label="Assigned Doctor"
                            value={form.doctor_id != null ? String(form.doctor_id) : ''}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={(e) => handleChange('doctor_id')(e as any)}
                        >
                            <MenuItem value="">None</MenuItem>
                            {doctors.map((doc: DoctorRead) => (
                                <MenuItem key={doc.id} value={String(doc.id)}>
                                    {doc.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? 'Saving…' : 'Save'}
                        </Button>
                    </Box>

                    {updateMutation.isError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            Failed to update patient.
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
