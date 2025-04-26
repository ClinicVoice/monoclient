'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useDoctorsByClinic } from '@/hooks/clinics/useDoctorsByClinic';
import DoctorDailyBlockSettings from '@/components/doctors/DoctorDailyBlockSettings';
import DoctorTimeOffSettings from '@/components/doctors/DoctorTimeOffSettings';

export default function AdminSettings() {
    const router = useRouter();
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);

    const {
        data: doctors,
        isLoading: isDoctorsLoading,
        error: doctorsError,
    } = useDoctorsByClinic(clinicId);

    const [selectedDoctorId, setSelectedDoctorId] = useState<number | ''>('');

    useEffect(() => {
        if (selectedDoctorId === '' && doctors && doctors.length > 0) {
            setSelectedDoctorId(doctors[0].id);
        }
    }, [doctors, selectedDoctorId]);

    if (isDoctorsLoading) return <CircularProgress />;
    if (doctorsError) return <Alert severity="error">Failed to load doctors.</Alert>;

    return (
        <Box sx={{ p: 4 }}>
            <Button
                color="secondary"
                variant="contained"
                onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard`)}
                sx={{ mb: 2 }}
            >
                Back to Dashboard
            </Button>

            <Typography variant="h4" gutterBottom>
                Doctor Availability Settings
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
                <Select
                    labelId="doctor-select-label"
                    label="Select Doctor"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                >
                    {doctors?.map((doc) => (
                        <MenuItem key={doc.id} value={doc.id}>
                            {doc.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {typeof selectedDoctorId === 'number' && (
                <>
                    <DoctorDailyBlockSettings doctorId={selectedDoctorId} />
                    <Box sx={{ mt: 6 }}>
                        <DoctorTimeOffSettings doctorId={selectedDoctorId} />
                    </Box>
                </>
            )}
        </Box>
    );
}
