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
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Provider" secondary={appointment.provider} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Appointment Type"
                            secondary={appointment.appointment_type}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Reason for Visit" secondary={appointment.note} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Date & Time"
                            secondary={`${appointment.date} at ${appointment.time}`}
                        />
                    </ListItem>
                    {appointment.hasHealthCard ? (
                        <>
                            <ListItem>
                                <ListItemText
                                    primary="Health Card Number"
                                    secondary={appointment.healthCardNumber}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Health Card Version"
                                    secondary={appointment.healthCardVersion}
                                />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <ListItemText
                                    primary="First Name"
                                    secondary={appointment.firstName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Last Name"
                                    secondary={appointment.lastName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Birth Date"
                                    secondary={appointment.birthday}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Sex" secondary={appointment.sex} />
                            </ListItem>
                        </>
                    )}
                    <ListItem>
                        <ListItemText primary="Phone Number" secondary={appointment.contact} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary={appointment.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Pharmacy"
                            secondary={appointment.pharmacy || 'N/A'}
                        />
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
