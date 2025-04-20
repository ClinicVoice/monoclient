'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    Divider,
    Typography,
    IconButton,
    Button,
    TextField,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { AppointmentRead, AppointmentUpdateRequest } from '@/types/appointments';
import { useToaster } from '@/providers/ToasterProvider';
import { format } from 'date-fns';
import { useUpdateAppointment } from '@/hooks/appointments/useUpdateAppointment';
import { useDeleteAppointment } from '@/hooks/appointments/useDeleteAppointment';

export interface AppointmentDetailsPanelProps {
    appointment: AppointmentRead;
    onClose: () => void;
}

export const AppointmentDetailsPanel: React.FC<AppointmentDetailsPanelProps> = ({
    appointment,
    onClose,
}) => {
    const { setToaster } = useToaster();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<AppointmentUpdateRequest>({
        phone_number: appointment.phone_number || '',
        appt_start_time: appointment.appt_start_time,
        appt_duration_minutes: appointment.appt_duration_minutes,
        notes: appointment.notes || '',
    });

    const updateMutation = useUpdateAppointment(appointment.id);
    const deleteMutation = useDeleteAppointment(appointment.id);

    useEffect(() => {
        setFormData({
            phone_number: appointment.phone_number || '',
            appt_start_time: appointment.appt_start_time,
            appt_duration_minutes: appointment.appt_duration_minutes,
            notes: appointment.notes || '',
        });
        setIsEditing(false);
    }, [appointment]);

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        setFormData({
            phone_number: appointment.phone_number || '',
            appt_start_time: appointment.appt_start_time,
            appt_duration_minutes: appointment.appt_duration_minutes,
            notes: appointment.notes || '',
        });
        setIsEditing(false);
    };

    const handleSave = () => {
        updateMutation.mutate(formData, {
            onSuccess: () => {
                setToaster('Appointment updated', 'success');
                setIsEditing(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                setToaster(err.message || 'Failed to update appointment', 'error');
            },
        });
    };

    const handleDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                setToaster('Appointment deleted', 'success');
                onClose();
            },
            onError: (err) => {
                setToaster(err.message || 'Failed to delete appointment', 'error');
            },
        });
    };

    return (
        <Drawer anchor="right" open onClose={onClose}>
            <Box sx={{ width: 340, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="h6">Appointment Details</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />

                {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Phone Number"
                            value={formData.phone_number}
                            onChange={(e) =>
                                setFormData({ ...formData, phone_number: e.target.value })
                            }
                            fullWidth
                        />
                        <TextField
                            label="Start Time"
                            type="datetime-local"
                            value={(formData.appt_start_time ?? new Date().toISOString()).slice(
                                0,
                                16,
                            )}
                            onChange={(e) =>
                                setFormData({ ...formData, appt_start_time: e.target.value })
                            }
                            fullWidth
                        />
                        <TextField
                            label="Duration (min)"
                            type="number"
                            value={formData.appt_duration_minutes}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    appt_duration_minutes: Number(e.target.value),
                                })
                            }
                            fullWidth
                        />
                        <TextField
                            label="Notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                disabled={updateMutation.isPending}
                            >
                                {updateMutation.isPending ? <CircularProgress size={20} /> : 'Save'}
                            </Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography>
                            <strong>Patient:</strong> {appointment.patient.surname},{' '}
                            {appointment.patient.first_name}
                        </Typography>
                        <Typography>
                            <strong>Health Card:</strong> {appointment.health_card_number}
                        </Typography>
                        <Typography>
                            <strong>Phone:</strong> {appointment.phone_number || '-'}
                        </Typography>
                        <Typography>
                            <strong>Start:</strong>{' '}
                            {format(new Date(appointment.appt_start_time), 'PPP p')}
                        </Typography>
                        <Typography>
                            <strong>End:</strong>{' '}
                            {format(new Date(appointment.appt_end_time), 'PPP p')}
                        </Typography>
                        <Typography>
                            <strong>Duration:</strong> {appointment.appt_duration_minutes} min
                        </Typography>
                        <Typography>
                            <strong>Notes:</strong> {appointment.notes || '-'}
                        </Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                startIcon={<EditIcon />}
                                onClick={handleEdit}
                                disabled={deleteMutation.isPending}
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};
