'use client';

import React, { useState } from 'react';
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
    Stack,
} from '@mui/material';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useDoctorsByClinic } from '@/hooks/clinics/useDoctorsByClinic';
import { DoctorRead, ListDoctorsParams } from '@/types/doctors';
import CreateDoctorDialog from '@/components/forms/create-doctor/CreateDoctorDialog';

export default function DoctorCatalog() {
    const paramsUrl = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(paramsUrl);
    const initialParams: ListDoctorsParams = { page: 1, limit: 20 };
    const [params, setParams] = useState<ListDoctorsParams>(initialParams);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { data: doctors, isLoading, error, refetch } = useDoctorsByClinic(clinicId, params);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value.trim();
        setParams((prev) => ({
            ...prev,
            name_search: val === '' ? undefined : val,
            page: 1,
        }));
    };

    const handlePageChange = (_: unknown, value: number) => {
        setParams((prev) => ({ ...prev, page: value }));
    };

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const onDoctorCreated = () => {
        closeDialog();
        refetch();
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard`)}
                >
                    Back to Dashboard
                </Button>
                <Button variant="contained" onClick={openDialog}>
                    Create Doctor
                </Button>
            </Stack>

            <Typography variant="h1" align="center" gutterBottom>
                Doctor Catalog
            </Typography>

            <Box sx={{ display: 'flex', mb: 3 }}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    sx={{ width: 300, mr: 2 }}
                />
                <Button variant="contained" onClick={() => setParams((p) => ({ ...p, page: 1 }))}>
                    Search
                </Button>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">Error loading doctors.</Alert>
            ) : doctors && doctors.length === 0 ? (
                <Alert severity="info">No doctors found.</Alert>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {doctors?.map((doc: DoctorRead) => (
                            <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                <Card
                                    sx={{ height: '100%', cursor: 'pointer' }}
                                    onClick={() =>
                                        router.push(
                                            `/clinic/${clinicId}/admin/dashboard/doctors/${doc.id}`,
                                        )
                                    }
                                >
                                    <CardContent>
                                        <Typography variant="h6">{doc.name}</Typography>
                                        <Typography variant="body2">
                                            Preferred Appt Duration:{' '}
                                            {doc.default_appt_duration_minutes} min
                                        </Typography>
                                        <Typography variant="body2">
                                            {doc.accepting_new_patients
                                                ? 'Accepting new patients'
                                                : 'Not accepting new patients'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={Math.ceil((doctors?.length || 0) / (params.limit || 1))}
                            page={params.page || 1}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            )}

            <CreateDoctorDialog
                open={isDialogOpen}
                onClose={closeDialog}
                clinicId={clinicId}
                onCreated={onDoctorCreated}
            />
        </Box>
    );
}
