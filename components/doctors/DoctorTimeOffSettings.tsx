import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Button,
    Paper,
    TextField,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DoctorTimeOffRead } from '@/types/doctorAvailabilities';
import { useTimeOff } from '@/hooks/doctorAvailabilities/useTimeOff';
import { useCreateTimeOff } from '@/hooks/doctorAvailabilities/useCreateTimeOff';
import { useUpdateTimeOff } from '@/hooks/doctorAvailabilities/useUpdateTimeOff';
import { useDeleteTimeOff } from '@/hooks/doctorAvailabilities/useDeleteTimeOff';

interface DoctorDailyTimeOffSettingsProps {
    doctorId: number;
}

export default function DoctorTimeOffSettings({ doctorId }: DoctorDailyTimeOffSettingsProps) {
    const { data: timeOffs, isLoading, error } = useTimeOff(doctorId);
    const createMutation = useCreateTimeOff(doctorId);
    const updateMutation = useUpdateTimeOff(doctorId);
    const deleteMutation = useDeleteTimeOff(doctorId);

    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const [reason, setReason] = useState<string>('');

    // editing state
    const [editId, setEditId] = useState<number | null>(null);
    const [editStart, setEditStart] = useState<Date | null>(null);
    const [editEnd, setEditEnd] = useState<Date | null>(null);
    const [editReason, setEditReason] = useState<string>('');

    useEffect(() => {
        if (editId !== null && timeOffs) {
            const rec = timeOffs.find((t) => t.id === editId);
            if (rec) {
                setEditStart(new Date(rec.start_datetime));
                setEditEnd(new Date(rec.end_datetime));
                setEditReason(rec.reason || '');
            }
        }
    }, [editId, timeOffs]);

    const handleAdd = () => {
        if (!start || !end) return;
        createMutation.mutate(
            {
                doctor_id: doctorId,
                start_datetime: start.toISOString(),
                end_datetime: end.toISOString(),
                reason,
            },
            {
                onSuccess: () => {
                    setStart(null);
                    setEnd(null);
                    setReason('');
                },
            },
        );
    };

    const handleUpdate = (id: number) => {
        if (!editStart || !editEnd) return;
        updateMutation.mutate(
            {
                timeOffId: id,
                data: {
                    start_datetime: editStart.toISOString(),
                    end_datetime: editEnd.toISOString(),
                    reason: editReason,
                },
            },
            { onSuccess: () => setEditId(null) },
        );
    };

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">Failed to load time off records.</Alert>;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Doctor Time Off
            </Typography>

            {/* Create form */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <DateTimePicker
                                label="Start"
                                value={start}
                                onChange={(d) => setStart(d)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <DateTimePicker
                                label="End"
                                value={end}
                                onChange={(d) => setEnd(d)}
                                slotProps={{ textField: { fullWidth: true } }}
                                minDateTime={start || undefined}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                fullWidth
                                label="Reason (optional)"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Button
                                variant="contained"
                                onClick={handleAdd}
                                disabled={createMutation.isPending}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </Paper>

            {/* List & Edit existing */}
            {timeOffs?.map((rec: DoctorTimeOffRead) => (
                <Paper key={rec.id} sx={{ p: 1, mb: 1 }}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={12} sm={4}>
                            {editId === rec.id ? (
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="Start"
                                        value={editStart}
                                        onChange={(d) => setEditStart(d)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </LocalizationProvider>
                            ) : (
                                <Typography>
                                    {new Date(rec.start_datetime).toLocaleString()}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {editId === rec.id ? (
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="End"
                                        value={editEnd}
                                        onChange={(d) => setEditEnd(d)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                        minDateTime={editStart || undefined}
                                    />
                                </LocalizationProvider>
                            ) : (
                                <Typography>
                                    {new Date(rec.end_datetime).toLocaleString()}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {editId === rec.id ? (
                                <TextField
                                    fullWidth
                                    label="Reason"
                                    value={editReason}
                                    onChange={(e) => setEditReason(e.target.value)}
                                />
                            ) : (
                                <Typography>{rec.reason || '-'}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            {editId === rec.id ? (
                                <IconButton
                                    onClick={() => handleUpdate(rec.id)}
                                    disabled={updateMutation.isPending}
                                >
                                    <CheckIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => setEditId(rec.id)}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            {editId === rec.id ? (
                                <IconButton onClick={() => setEditId(null)}>
                                    <CloseIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleDelete(rec.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    );
}
