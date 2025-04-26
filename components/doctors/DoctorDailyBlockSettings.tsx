import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    CircularProgress,
    Alert,
    IconButton,
    Typography,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { DailyBlockRead, DailyBlockCreate, DailyBlockUpdate } from '@/types/doctorAvailabilities';
import { useCreateDailyBlock } from '@/hooks/doctorAvailabilities/useCreateDailyBlock';
import { useDailyBlocks } from '@/hooks/doctorAvailabilities/useDailyBlocks';
import { useUpdateDailyBlock } from '@/hooks/doctorAvailabilities/useUpdateDailyBlock';
import { useDeleteDailyBlock } from '@/hooks/doctorAvailabilities/useDeleteDailyBlock';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

interface DoctorDailyBlockSettingsProps {
    doctorId: number;
}

export default function DoctorDailyBlockSettings({ doctorId }: DoctorDailyBlockSettingsProps) {
    const { data: blocks, isLoading, error } = useDailyBlocks(doctorId);
    const createMutation = useCreateDailyBlock(doctorId);
    const updateMutation = useUpdateDailyBlock(doctorId);
    const deleteMutation = useDeleteDailyBlock(doctorId);

    const [form, setForm] = useState<DailyBlockCreate>({
        doctor_id: doctorId,
        day_of_week: 'monday',
        start_time: '09:00',
        end_time: '10:00',
    });
    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<DailyBlockUpdate>({});

    useEffect(() => {
        if (editId !== null && blocks) {
            const b = blocks.find((blk: DailyBlockRead) => blk.id === editId);
            if (b) {
                setEditForm({
                    day_of_week: b.day_of_week,
                    start_time: b.start_time,
                    end_time: b.end_time,
                });
            }
        }
    }, [editId, blocks]);

    const handleAdd = () => {
        createMutation.mutate(form, {
            onSuccess: () => {
                setForm({ ...form });
            },
        });
    };

    const handleUpdate = (id: number) => {
        updateMutation.mutate(
            { blockId: id, data: editForm },
            { onSuccess: () => setEditId(null) },
        );
    };

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">Failed to load daily blocks.</Alert>;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Daily Time Blocks
            </Typography>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="day-label">Day</InputLabel>
                            <Select
                                labelId="day-label"
                                value={form.day_of_week || 'monday'}
                                label="Day"
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, day_of_week: e.target.value }))
                                }
                            >
                                {DAYS.map((d) => (
                                    <MenuItem key={d} value={d}>
                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            value={form.start_time}
                            onChange={(e) => setForm((f) => ({ ...f, start_time: e.target.value }))}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            label="End Time"
                            type="time"
                            value={form.end_time}
                            onChange={(e) => setForm((f) => ({ ...f, end_time: e.target.value }))}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            onClick={handleAdd}
                            disabled={createMutation.isPending}
                        >
                            Add Block
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {blocks &&
                blocks.map((blk) => (
                    <Paper key={blk.id} sx={{ p: 1, mb: 1 }}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} sm={3}>
                                {editId === blk.id ? (
                                    <FormControl fullWidth>
                                        <Select
                                            value={editForm.day_of_week || 'monday'}
                                            onChange={(e) =>
                                                setEditForm((f) => ({
                                                    ...f,
                                                    day_of_week: e.target.value,
                                                }))
                                            }
                                        >
                                            {DAYS.map((d) => (
                                                <MenuItem key={d} value={d}>
                                                    {d.charAt(0).toUpperCase() + d.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Typography>
                                        {blk.day_of_week.charAt(0).toUpperCase() +
                                            blk.day_of_week.slice(1)}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={5} sm={3}>
                                {editId === blk.id ? (
                                    <TextField
                                        type="time"
                                        value={editForm.start_time || ''}
                                        onChange={(e) =>
                                            setEditForm((f) => ({
                                                ...f,
                                                start_time: e.target.value,
                                            }))
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                ) : (
                                    <Typography>{blk.start_time}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={5} sm={3}>
                                {editId === blk.id ? (
                                    <TextField
                                        type="time"
                                        value={editForm.end_time || ''}
                                        onChange={(e) =>
                                            setEditForm((f) => ({ ...f, end_time: e.target.value }))
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                ) : (
                                    <Typography>{blk.end_time}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                {editId === blk.id ? (
                                    <IconButton
                                        onClick={() => handleUpdate(blk.id)}
                                        disabled={updateMutation.isPending}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => setEditId(blk.id)}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <IconButton onClick={() => handleDelete(blk.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
        </Box>
    );
}
