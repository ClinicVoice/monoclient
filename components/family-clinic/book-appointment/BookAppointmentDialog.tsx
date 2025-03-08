import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookAppointmentComponent from '@/components/family-clinic/book-appointment/BookAppointmentComponent';

interface BookAppointmentDialogProps {
    open: boolean;
    onClose: () => void;
}

export const BookAppointmentDialog = ({ open, onClose }: BookAppointmentDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                style: {
                    height: '95vh',
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h3" component="div">
                    Create Appointment
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ overflowY: 'auto' }}>
                <BookAppointmentComponent onExit={onClose} />
            </DialogContent>
        </Dialog>
    );
};
