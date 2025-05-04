'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Pagination,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { usePatientsByClinic } from '@/hooks/clinics/usePatientsByClinic';
import { useDoctorsByClinic } from '@/hooks/clinics/useDoctorsByClinic';
import RegisterPatientDialog from '@/components/forms/register-patient/RegisterPatientDialog';
import { ListPatientsParams, PatientRead } from '@/types/patients';
import { ListDoctorsParams, DoctorRead } from '@/types/doctors';

export default function PatientCatalog() {
    const paramsUrl = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(paramsUrl);
    const initialParams: ListPatientsParams = { page: 1, limit: 20 };
    const [params, setParams] = useState<ListPatientsParams>(initialParams);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const {
        data: patients = [],
        isLoading,
        error,
        refetch,
    } = usePatientsByClinic(clinicId, params);

    const { data: doctors = [] } = useDoctorsByClinic(clinicId, {
        page: 1,
        limit: 500,
    } as ListDoctorsParams);

    const doctorMap = useMemo(() => {
        const m = new Map<number, DoctorRead>();
        doctors.forEach((d) => m.set(d.id, d));
        return m;
    }, [doctors]);

    const handleTextFieldChange =
        (field: keyof ListPatientsParams) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value.trim();
            setParams((prev) => ({ ...prev, [field]: value || undefined, page: 1 }));
        };

    const handleSelectChange =
        (field: keyof ListPatientsParams) => (e: SelectChangeEvent<string>) => {
            const val = e.target.value;
            setParams((prev) => ({ ...prev, [field]: val ? Number(val) : undefined, page: 1 }));
        };

    const handleSearch = () => {
        setParams((prev) => ({ ...prev, page: 1 }));
        refetch();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePageChange = (_: any, value: number) => {
        setParams((prev) => ({ ...prev, page: value }));
    };

    const doctorForDialog = params.doctor_id ?? doctors[0]?.id ?? 0;

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard`)}
                >
                    Back to Dashboard
                </Button>
                <Button variant="contained" onClick={openDialog}>
                    Register Patient
                </Button>
            </Stack>

            <Typography variant="h4" align="center" gutterBottom>
                Patient Catalog
            </Typography>

            <Box mb={3}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Surname"
                            value={params.surname || ''}
                            onChange={handleTextFieldChange('surname')}
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="First Name"
                            value={params.first_name || ''}
                            onChange={handleTextFieldChange('first_name')}
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Phone"
                            value={params.phone || ''}
                            onChange={handleTextFieldChange('phone')}
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="doctor-select-label">Doctor</InputLabel>
                            <Select
                                labelId="doctor-select-label"
                                label="Doctor"
                                value={params.doctor_id != null ? String(params.doctor_id) : ''}
                                onChange={handleSelectChange('doctor_id')}
                            >
                                <MenuItem value="">All</MenuItem>
                                {doctors.map((doc) => (
                                    <MenuItem key={doc.id} value={String(doc.id)}>
                                        {doc.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button variant="contained" onClick={handleSearch} fullWidth>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">Error loading patients.</Alert>
            ) : patients.length === 0 ? (
                <Alert severity="info">No patients found.</Alert>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {patients.map((patient: PatientRead) => (
                            <Grid item xs={12} sm={6} md={4} key={patient.id}>
                                <Card
                                    sx={{ height: '100%', cursor: 'pointer' }}
                                    onClick={() =>
                                        router.push(
                                            `/clinic/${clinicId}/admin/dashboard/patients/${patient.id}`,
                                        )
                                    }
                                >
                                    <CardContent>
                                        <Typography variant="h6">
                                            {patient.first_name} {patient.surname}
                                        </Typography>
                                        <Typography variant="body2">
                                            OHIP: {patient.health_card_number}
                                        </Typography>
                                        <Typography variant="body2">
                                            Phone: {patient.phone_number || '-'}
                                        </Typography>
                                        <Typography variant="body2">
                                            Doctor:{' '}
                                            {patient.doctor_id
                                                ? doctorMap.get(patient.doctor_id)?.name ||
                                                  'Unknown'
                                                : 'Unassigned'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                            count={Math.ceil((patients.length || 0) / (params.limit || 1))}
                            page={params.page || 1}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            )}

            <RegisterPatientDialog
                open={isDialogOpen}
                onClose={closeDialog}
                clinicId={clinicId}
                doctorId={doctorForDialog}
                onRegistered={() => refetch()}
            />
        </Box>
    );
}
