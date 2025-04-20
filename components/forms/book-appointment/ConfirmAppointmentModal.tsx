'use client';

import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { CreateAppointmentForm } from '@/types/appointments';

interface ConfirmAppointmentModalProps {
    open: boolean;
    appointment: CreateAppointmentForm;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

export default function ConfirmAppointmentModal({
    open,
    appointment,
    onClose,
    onConfirm,
    isPending,
}: ConfirmAppointmentModalProps) {
    const apptDate = format(parseISO(appointment.appt_start_time), 'PPP');
    const apptTime = format(parseISO(appointment.appt_start_time), 'p');

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Doctor ID" secondary={appointment.doctor_id} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Date" secondary={apptDate} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Time" secondary={apptTime} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Duration"
                            secondary={`${appointment.appt_duration_minutes} minutes`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Health Card Number"
                            secondary={appointment.health_card_number}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Phone Number" secondary={appointment.phone_number} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Notes" secondary={appointment.notes || 'N/A'} />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="contained">
                    Back
                </Button>
                <Button
                    onClick={onConfirm}
                    color="primary"
                    variant="contained"
                    disabled={isPending}
                >
                    {isPending ? 'Booking...' : 'Confirm & Book'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
