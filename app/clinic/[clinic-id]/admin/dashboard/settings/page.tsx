'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Divider,
    Alert,
    Chip,
    Paper,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useRouter, useParams } from 'next/navigation';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { useToaster } from '@/providers/ToasterProvider';
import { TimeRange } from '@/types/clinics';

export default function AdminSettings() {
    const params = useParams();
    const familyClinicId = parseClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);
    const { setToaster } = useToaster();

    const [timeOffStart, setTimeOffStart] = useState<Date | null>(null);
    const [timeOffEnd, setTimeOffEnd] = useState<Date | null>(null);
    const [timeOffRanges, setTimeOffRanges] = useState<TimeRange[]>([]);

    const [dailyUnavailableRanges, setDailyUnavailableRanges] = useState<TimeRange[]>([]);

    useEffect(() => {
        if (clinic) {
            setTimeOffRanges(clinic.restrictions?.time_off_ranges || []);
            setDailyUnavailableRanges(clinic.restrictions?.daily_unavailable_ranges || []);
        }
    }, [clinic]);

    const handleAddTimeOff = () => {
        if (timeOffStart && timeOffEnd) {
            const newRange: TimeRange = {
                start: timeOffStart.toISOString(),
                end: timeOffEnd.toISOString(),
            };
            setTimeOffRanges((prev) => [...prev, newRange]);
            setTimeOffStart(null);
            setTimeOffEnd(null);
        }
    };

    const handleAddDailyRange = () => {
        const newRange: TimeRange = { start: '13:00', end: '14:00' };
        setDailyUnavailableRanges((prev) => [...prev, newRange]);
    };

    const handleDailyRangeChange = (index: number, field: 'start' | 'end', value: string) => {
        setDailyUnavailableRanges((prev) => {
            const newRanges = [...prev];
            newRanges[index] = { ...newRanges[index], [field]: value };
            return newRanges;
        });
    };

    const handleRemoveDailyRange = (index: number) => {
        setDailyUnavailableRanges((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        setToaster('Settings saved successfully!', 'success');
    };

    if (isLoading) return <Typography>Loading clinic information...</Typography>;
    if (error || !clinic) return <Alert severity="error">Error loading clinic information.</Alert>;

    return (
        <Box sx={{ p: 4 }}>
            <Alert severity="warning" sx={{ mb: 4 }}>
                This settings page is in demo mode. Changes will not be saved to the backend.
            </Alert>

            <Typography variant="h3" gutterBottom>
                Clinic Restrictions
            </Typography>
            <Divider sx={{ mb: 4 }} />

            {/* Time Off Section */}
            <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
                <Typography variant="h5" gutterBottom>
                    Time Off
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                    Select a start and end date/time range to indicate when you will be off.
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Start Time Off"
                                value={timeOffStart}
                                onChange={(newDate) => setTimeOffStart(newDate)}
                                minDateTime={new Date()}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="End Time Off"
                                value={timeOffEnd}
                                onChange={(newDate) => setTimeOffEnd(newDate)}
                                minDateTime={timeOffStart || new Date()}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={handleAddTimeOff}>
                            Add Time Off Range
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {timeOffRanges.map((range, index) => (
                        <Chip
                            key={index}
                            label={`From ${new Date(range.start).toLocaleString()} to ${new Date(
                                range.end,
                            ).toLocaleString()}`}
                            onDelete={() =>
                                setTimeOffRanges((prev) => prev.filter((_, i) => i !== index))
                            }
                        />
                    ))}
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
                <Typography variant="h5" gutterBottom>
                    Time Block Breaks
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                    Log recurring daily time ranges when you will not be available (e.g., lunch
                    break).
                </Typography>
                {dailyUnavailableRanges.map((range, index) => (
                    <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                label="Start Time"
                                type="time"
                                value={range.start}
                                onChange={(e) =>
                                    handleDailyRangeChange(index, 'start', e.target.value)
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                label="End Time"
                                type="time"
                                value={range.end}
                                onChange={(e) =>
                                    handleDailyRangeChange(index, 'end', e.target.value)
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => handleRemoveDailyRange(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Button variant="contained" color="secondary" onClick={handleAddDailyRange}>
                    Add Time Block Break
                </Button>
            </Paper>

            <Grid container spacing={2} mt={2} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                            router.push(`/family-clinic/${familyClinicId}/admin/dashboard`)
                        }
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save Settings
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
