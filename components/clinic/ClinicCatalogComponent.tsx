'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useClinics } from '@/hooks/clinics/useClinics';
import {
    Box,
    Grid,
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Card,
    CardContent,
    Typography,
    Pagination,
    CircularProgress,
} from '@mui/material';
import { ClinicRead, ListClinicsParams } from '@/types/clinics';

export const ClinicCatalogComponent = () => {
    const initialParams: ListClinicsParams = { page: 1, limit: 12 };
    const [params, setParams] = useState<ListClinicsParams>(initialParams);

    const { data: clinics, isLoading, isError } = useClinics(params);

    const handleChange =
        (field: keyof ListClinicsParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
            let value: any;
            if (field === 'accepting_new_patients') {
                value = event.target.checked;
            } else {
                const val = event.target.value.trim();
                value = val === '' ? undefined : val;
            }
            setParams((prev) => ({ ...prev, [field]: value, page: 1 }));
        };

    const handleSearch = () => {
        setParams((prev) => ({ ...prev, page: 1 }));
    };

    const handleReset = () => {
        setParams(initialParams);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setParams((prev) => ({ ...prev, page: value }));
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4, pb: 12 }}>
            <Typography variant="h1" gutterBottom align="left">
                Clinic Catalog
            </Typography>

            <Typography variant="h6" gutterBottom align="left">
                Search for a clinic
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={2} mb={4} justifyContent="center">
                <TextField
                    label="Name"
                    variant="outlined"
                    value={params.name || ''}
                    onChange={handleChange('name')}
                    size="small"
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    value={params.phone || ''}
                    onChange={handleChange('phone')}
                    size="small"
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={params.email || ''}
                    onChange={handleChange('email')}
                    size="small"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={!!params.accepting_new_patients}
                            onChange={handleChange('accepting_new_patients')}
                            color="primary"
                        />
                    }
                    label="Accepting New Patients"
                />
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
                <Button variant="outlined" onClick={handleReset}>
                    Reset
                </Button>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error" align="center">
                    Error loading clinics.
                </Typography>
            ) : (
                <Grid container spacing={3} justifyContent="left">
                    {clinics?.map((clinic: ClinicRead) => (
                        <Grid item xs={12} sm={6} md={4} key={clinic.id}>
                            <Link href={`/clinic/${clinic.id}`} passHref>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {clinic.name}
                                        </Typography>
                                        <Typography variant="body2">{clinic.address}</Typography>
                                        <Typography variant="body2">📞 {clinic.phone}</Typography>
                                        <Typography variant="body2">✉️ {clinic.email}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {clinic.accepting_new_patients
                                                ? '✅ Accepting New Patients'
                                                : '🚫 Not Accepting New Patients'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Box
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                bgcolor="background.paper"
                py={2}
                boxShadow={3}
                display="flex"
                justifyContent="center"
            >
                <Pagination
                    count={10}
                    page={params.page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};
