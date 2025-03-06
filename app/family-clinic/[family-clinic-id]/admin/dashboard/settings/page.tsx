'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Divider, Alert, Chip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useRouter, useParams } from 'next/navigation';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import { useToaster } from '@/providers/ToasterProvider';
import {
    FamilyClinicRestrictions,
    TimeRange,
    RestrictedDay,
} from '@/types/family_clinic/family_clinic';

export default function AdminSettings() {
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);
    const { setToaster } = useToaster();

    const [restrictions, setRestrictions] = useState<FamilyClinicRestrictions>({
        unavailableDays: [],
        dailyUnavailableRanges: [],
        restrictedDays: [],
    });

    const [selectedUnavailableDay, setSelectedUnavailableDay] = useState<Date | null>(null);

    useEffect(() => {
        if (clinic) {
            setRestrictions(
                clinic.restrictions || {
                    unavailableDays: [],
                    dailyUnavailableRanges: [],
                    restrictedDays: [],
                },
            );
        }
    }, [clinic]);

    const handleAddDailyRange = () => {
        const newRange: TimeRange = { start: '09:00', end: '10:00' };
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

    const handleAddRestrictedDay = () => {
        const newRestrictedDay: RestrictedDay = {
            date: new Date().toISOString().split('T')[0],
            unavailableRanges: [{ start: '12:00', end: '13:00' }],
        };
        setRestrictions((prev) => ({
            ...prev,
            restrictedDays: [...(prev.restrictedDays || []), newRestrictedDay],
        }));
    };

    const handleRestrictedDayDateChange = (index: number, newDate: Date | null) => {
        if (newDate) {
            setRestrictions((prev) => {
                const newRestrictedDays = prev.restrictedDays ? [...prev.restrictedDays] : [];
                newRestrictedDays[index] = {
                    ...newRestrictedDays[index],
                    date: newDate.toISOString().split('T')[0],
                };
                return { ...prev, restrictedDays: newRestrictedDays };
            });
        }
    };

    const handleAddRestrictedRange = (dayIndex: number) => {
        setRestrictions((prev) => {
            const newRestrictedDays = prev.restrictedDays ? [...prev.restrictedDays] : [];
            const day = newRestrictedDays[dayIndex];
            const newRange: TimeRange = { start: '14:00', end: '15:00' };
            day.unavailableRanges = [...day.unavailableRanges, newRange];
            newRestrictedDays[dayIndex] = day;
            return { ...prev, restrictedDays: newRestrictedDays };
        });
    };

    const handleRestrictedRangeChange = (
        dayIndex: number,
        rangeIndex: number,
        field: 'start' | 'end',
        value: string,
    ) => {
        setRestrictions((prev) => {
            const newRestrictedDays = prev.restrictedDays ? [...prev.restrictedDays] : [];
            const day = newRestrictedDays[dayIndex];
            const newRanges = [...day.unavailableRanges];
            newRanges[rangeIndex] = { ...newRanges[rangeIndex], [field]: value };
            day.unavailableRanges = newRanges;
            newRestrictedDays[dayIndex] = day;
            return { ...prev, restrictedDays: newRestrictedDays };
        });
    };

    const handleSave = () => {
        setToaster('Settings saved successfully!', 'success');
    };

    if (isLoading) return <Typography>Loading clinic information...</Typography>;
    if (error || !clinic) return <Alert severity="error">Error loading clinic information.</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom>
                Clinic Restrictions
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Unavailable Days
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Unavailable Day"
                        value={selectedUnavailableDay}
                        onChange={(newDate) => setSelectedUnavailableDay(newDate)}
                        minDate={new Date()}
                        sx={{ marginRight: '1rem' }}
                    />
                </LocalizationProvider>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        if (selectedUnavailableDay) {
                            const newDate = selectedUnavailableDay.toISOString().split('T')[0];
                            setRestrictions((prev) => ({
                                ...prev,
                                unavailableDays: prev.unavailableDays
                                    ? [...prev.unavailableDays, newDate]
                                    : [newDate],
                            }));
                            setSelectedUnavailableDay(null);
                        }
                    }}
                    sx={{ height: '56px' }}
                >
                    Add Unavailable Day
                </Button>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {restrictions.unavailableDays?.map((day, index) => (
                        <Chip
                            key={index}
                            label={day}
                            onDelete={() =>
                                setRestrictions((prev) => ({
                                    ...prev,
                                    unavailableDays: prev.unavailableDays?.filter((d) => d !== day),
                                }))
                            }
                        />
                    ))}
                </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Daily Unavailable Time Ranges
                </Typography>
                {restrictions.dailyUnavailableRanges?.map((range, index) => (
                    <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 1 }}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
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
                    Add Daily Range
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Restricted Days
                </Typography>
                {restrictions.restrictedDays?.map((rDay, dayIndex) => (
                    <Box
                        key={dayIndex}
                        sx={{ mb: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Restricted Date"
                                value={new Date(rDay.date)}
                                onChange={(newDate) =>
                                    handleRestrictedDayDateChange(dayIndex, newDate)
                                }
                                sx={{ width: '100%', marginBottom: '1rem' }}
                            />
                        </LocalizationProvider>
                        {rDay.unavailableRanges.map((range, rangeIndex) => (
                            <Grid container spacing={2} key={rangeIndex} alignItems="center">
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Start Time"
                                        type="time"
                                        value={range.start}
                                        onChange={(e) =>
                                            handleRestrictedRangeChange(
                                                dayIndex,
                                                rangeIndex,
                                                'start',
                                                e.target.value,
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="End Time"
                                        type="time"
                                        value={range.end}
                                        onChange={(e) =>
                                            handleRestrictedRangeChange(
                                                dayIndex,
                                                rangeIndex,
                                                'end',
                                                e.target.value,
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleAddRestrictedRange(dayIndex)}
                            sx={{ mt: 1 }}
                        >
                            Add Restricted Range
                        </Button>
                    </Box>
                ))}
                <Button variant="contained" color="secondary" onClick={handleAddRestrictedDay}>
                    Add Restricted Day
                </Button>
            </Box>

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
