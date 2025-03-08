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
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useRouter, useParams } from 'next/navigation';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import { useToaster } from '@/providers/ToasterProvider';
import { TimeRange, RestrictedDay } from '@/types/family_clinic/family_clinic';

type UnavailableDayDetail = {
    date: string;
    allDay: boolean;
    customTime?: TimeRange;
};

export default function AdminSettings() {
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);
    const { setToaster } = useToaster();

    const [restrictions, setRestrictions] = useState<{
        unavailableDays: UnavailableDayDetail[];
        dailyUnavailableRanges: TimeRange[];
        restrictedDays: RestrictedDay[];
    }>({
        unavailableDays: [],
        dailyUnavailableRanges: [],
        restrictedDays: [],
    });

    const [selectedUnavailableDay, setSelectedUnavailableDay] = useState<Date | null>(null);
    const [unavailableDayType, setUnavailableDayType] = useState<'allDay' | 'custom'>('allDay');
    const [customUnavailableTime, setCustomUnavailableTime] = useState<TimeRange>({
        start: '09:00',
        end: '10:00',
    });

    useEffect(() => {
        if (clinic) {
            const loadedUnavailableDays = (clinic.restrictions?.unavailableDays || []).map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (day: any) => {
                    if (typeof day === 'string') {
                        return { date: day, allDay: true };
                    }
                    return day;
                },
            );
            setRestrictions({
                unavailableDays: loadedUnavailableDays,
                dailyUnavailableRanges: clinic.restrictions?.dailyUnavailableRanges || [],
                restrictedDays: clinic.restrictions?.restrictedDays || [],
            });
        }
    }, [clinic]);

    const handleAddDailyRange = () => {
        const newRange: TimeRange = { start: '13:00', end: '14:00' };
        setRestrictions((prev) => ({
            ...prev,
            dailyUnavailableRanges: [...(prev.dailyUnavailableRanges || []), newRange],
        }));
    };

    const handleDailyRangeChange = (index: number, field: 'start' | 'end', value: string) => {
        setRestrictions((prev) => {
            const newRanges = prev.dailyUnavailableRanges ? [...prev.dailyUnavailableRanges] : [];
            newRanges[index] = { ...newRanges[index], [field]: value };
            return { ...prev, dailyUnavailableRanges: newRanges };
        });
    };

    const handleAddUnavailableDay = () => {
        if (selectedUnavailableDay) {
            const dateString = selectedUnavailableDay.toISOString().split('T')[0];
            const newUnavailableDay: UnavailableDayDetail = {
                date: dateString,
                allDay: unavailableDayType === 'allDay',
                customTime: unavailableDayType === 'custom' ? customUnavailableTime : undefined,
            };
            setRestrictions((prev) => ({
                ...prev,
                unavailableDays: [...prev.unavailableDays, newUnavailableDay],
            }));
            // Reset fields after adding
            setSelectedUnavailableDay(null);
            setUnavailableDayType('allDay');
            setCustomUnavailableTime({ start: '09:00', end: '10:00' });
        }
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

            <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
                <Typography variant="h5" gutterBottom>
                    Unavailable Days
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                    Log specific days when you will not be available. Choose &quot;All Day&#34; if
                    you are unavailable the entire day, or select a specific time range.
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Day"
                                value={selectedUnavailableDay}
                                onChange={(newDate) => setSelectedUnavailableDay(newDate)}
                                minDate={new Date()}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                value={unavailableDayType}
                                onChange={(e) =>
                                    setUnavailableDayType(e.target.value as 'allDay' | 'custom')
                                }
                            >
                                <FormControlLabel
                                    value="allDay"
                                    control={<Radio />}
                                    label="All Day"
                                />
                                <FormControlLabel
                                    value="custom"
                                    control={<Radio />}
                                    label="Custom Time"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {unavailableDayType === 'custom' && (
                        <>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    fullWidth
                                    label="Start Time"
                                    type="time"
                                    value={customUnavailableTime.start}
                                    onChange={(e) =>
                                        setCustomUnavailableTime((prev) => ({
                                            ...prev,
                                            start: e.target.value,
                                        }))
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    fullWidth
                                    label="End Time"
                                    type="time"
                                    value={customUnavailableTime.end}
                                    onChange={(e) =>
                                        setCustomUnavailableTime((prev) => ({
                                            ...prev,
                                            end: e.target.value,
                                        }))
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddUnavailableDay}
                        >
                            Add Unavailable Day
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {restrictions.unavailableDays.map((day, index) => (
                        <Chip
                            key={index}
                            label={
                                day.allDay
                                    ? `${day.date} (All Day)`
                                    : `${day.date} (${day.customTime?.start} - ${day.customTime?.end})`
                            }
                            onDelete={() =>
                                setRestrictions((prev) => ({
                                    ...prev,
                                    unavailableDays: prev.unavailableDays.filter(
                                        (d) => d.date !== day.date,
                                    ),
                                }))
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
                    break between 1:00 PM and 2:00 PM).
                </Typography>
                {restrictions.dailyUnavailableRanges?.map((range, index) => (
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
