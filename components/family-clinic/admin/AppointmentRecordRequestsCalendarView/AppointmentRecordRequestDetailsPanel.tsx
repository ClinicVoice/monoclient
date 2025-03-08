'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Drawer, Divider, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { useToaster } from '@/providers/ToasterProvider';

export interface AppointmentRecordRequestDetailsPanelProps {
    appointment: AppointmentRecordRequest;
    onClose: () => void;
}

export const AppointmentRecordRequestDetailsPanel: React.FC<
    AppointmentRecordRequestDetailsPanelProps
> = ({ appointment, onClose }) => {
    const { setToaster } = useToaster();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<AppointmentRecordRequest>(appointment);

    useEffect(() => {
        setFormData(appointment);
    }, [appointment]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setToaster('Appointment updated (mock)', 'success');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(appointment);
    };

    const handleDelete = () => {
        setToaster('Delete appointment action (mock)', 'error');
    };

    return (
        <Drawer anchor="right" open onClose={onClose}>
            <Box sx={{ width: 320, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        Appointment Details
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                {isEditing ? (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <TextField
                                label="Provider"
                                value={formData.provider}
                                onChange={(e) =>
                                    setFormData({ ...formData, provider: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Type"
                                value={formData.appointment_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, appointment_type: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Patient First Name"
                                value={formData.first_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, first_name: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Patient Last Name"
                                value={formData.last_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, last_name: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Health Card"
                                value={`${formData.health_card_number} (${formData.health_card_version})`}
                                disabled
                                fullWidth
                            />
                            <TextField
                                label="Phone"
                                value={formData.phone_number}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone_number: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Appointment Date"
                                value={formData.appointment_date}
                                onChange={(e) =>
                                    setFormData({ ...formData, appointment_date: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Duration (minutes)"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData({ ...formData, duration: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Birth Date"
                                value={formData.birth_date}
                                onChange={(e) =>
                                    setFormData({ ...formData, birth_date: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Sex"
                                value={formData.sex}
                                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label="Pharmacy"
                                value={formData.pharmacy}
                                onChange={(e) =>
                                    setFormData({ ...formData, pharmacy: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Notes"
                                value={formData.notes}
                                onChange={(e) =>
                                    setFormData({ ...formData, notes: e.target.value })
                                }
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#1565c0' },
                                }}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="body1">
                                <strong>Provider:</strong> {appointment.provider}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Type:</strong> {appointment.appointment_type}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Patient:</strong> {appointment.first_name}{' '}
                                {appointment.last_name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Health Card:</strong> {appointment.health_card_number} (
                                {appointment.health_card_version})
                            </Typography>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {appointment.phone_number}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> {appointment.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Appointment Date:</strong> {appointment.appointment_date}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Time:</strong>{' '}
                                {new Date(
                                    Number(appointment.appointment_time_epoch) * 1000,
                                ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Duration:</strong> {appointment.duration} minutes
                            </Typography>
                            <Typography variant="body1">
                                <strong>Birth Date:</strong> {appointment.birth_date}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Sex:</strong> {appointment.sex}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Pharmacy:</strong> {appointment.pharmacy}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Notes:</strong> {appointment.notes}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Requested:</strong>{' '}
                                {new Date(
                                    Number(appointment.request_timestamp) * 1000,
                                ).toLocaleString()}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#1565c0' },
                                }}
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                sx={{
                                    backgroundColor: '#d32f2f',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#c62828' },
                                }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};
