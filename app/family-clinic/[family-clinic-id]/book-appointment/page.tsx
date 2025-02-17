'use client';

import {
    Container,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stepper,
    Step,
    StepLabel,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModuleContainer } from '@/components/containers/Container';

const FormContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(6),
}));

const StepCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));

const steps = ['Select Appointment', 'Enter Contact Info'];

export default function BookAppointment() {
    const [step, setStep] = useState(0);
    const [appointment, setAppointment] = useState({
        provider: '',
        appointmentType: '',
        reason: '',
        date: '',
        time: '',
        hasHealthCard: true,
        healthCardNumber: '',
        healthCardVersion: '',
        firstName: '',
        lastName: '',
        birthday: '',
        sex: '',
        contact: '',
        email: '',
        pharmacy: '',
    });
    const router = useRouter();

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);
    const resetForm = () =>
        setAppointment({
            provider: '',
            appointmentType: '',
            reason: '',
            date: '',
            time: '',
            hasHealthCard: true,
            healthCardNumber: '',
            healthCardVersion: '',
            firstName: '',
            lastName: '',
            birthday: '',
            sex: '',
            contact: '',
            email: '',
            pharmacy: '',
        });

    return (
        <ModuleContainer>
            <FormContainer>
                <Typography variant="h1" gutterBottom>
                    Greenleaf Family Clinic
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Book an Appointment
                </Typography>
                <Stepper
                    activeStep={step}
                    alternativeLabel
                    sx={{ width: '100%', maxWidth: 600, mb: 4, mt: 2 }}
                >
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {step === 0 ? (
                    <StepCard>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Provider</InputLabel>
                            <Select
                                label="Provider"
                                value={appointment.provider}
                                onChange={(e) =>
                                    setAppointment({ ...appointment, provider: e.target.value })
                                }
                            >
                                <MenuItem value="Dr. John Doe">Dr. John Doe</MenuItem>
                            </Select>
                        </FormControl>
                        {appointment.provider && (
                            <>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Appointment Type</InputLabel>
                                    <Select
                                        label="Appointment Type"
                                        value={appointment.appointmentType}
                                        onChange={(e) =>
                                            setAppointment({
                                                ...appointment,
                                                appointmentType: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem value="General Consultation">
                                            General Consultation
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Reason for Visit"
                                    inputProps={{ maxLength: 75 }}
                                    value={appointment.reason}
                                    onChange={(e) =>
                                        setAppointment({ ...appointment, reason: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={appointment.date}
                                    onChange={(e) =>
                                        setAppointment({ ...appointment, date: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={appointment.time}
                                    onChange={(e) =>
                                        setAppointment({ ...appointment, time: e.target.value })
                                    }
                                />
                            </>
                        )}
                        <Grid container spacing={2} mt={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => router.push('/')}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    disabled={!appointment.provider}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepCard>
                ) : (
                    <StepCard>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={appointment.hasHealthCard}
                                    onChange={(e) =>
                                        setAppointment({
                                            ...appointment,
                                            hasHealthCard: e.target.checked,
                                        })
                                    }
                                />
                            }
                            label="Do you have an Ontario Health Card?"
                        />
                        {appointment.hasHealthCard ? (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Health Card Number"
                                    value={appointment.healthCardNumber}
                                    onChange={(e) =>
                                        setAppointment({
                                            ...appointment,
                                            healthCardNumber: e.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Version"
                                    value={appointment.healthCardVersion}
                                    onChange={(e) =>
                                        setAppointment({
                                            ...appointment,
                                            healthCardVersion: e.target.value,
                                        })
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="First Name"
                                    value={appointment.firstName}
                                    onChange={(e) =>
                                        setAppointment({
                                            ...appointment,
                                            firstName: e.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Last Name"
                                    value={appointment.lastName}
                                    onChange={(e) =>
                                        setAppointment({ ...appointment, lastName: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Birthday"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={appointment.birthday}
                                    onChange={(e) =>
                                        setAppointment({ ...appointment, birthday: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Sex"
                                    value={appointment.sex}
                                    onChange={(e) =>
                                        setAppointment({ ...appointment, sex: e.target.value })
                                    }
                                />
                            </>
                        )}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number"
                            type="tel"
                            value={appointment.contact}
                            onChange={(e) =>
                                setAppointment({ ...appointment, contact: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            value={appointment.email}
                            onChange={(e) =>
                                setAppointment({ ...appointment, email: e.target.value })
                            }
                        />
                        <Grid container spacing={2} mt={2} justifyContent="center">
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={handleBack}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => router.push('/')}
                                >
                                    Book Appointment
                                </Button>
                            </Grid>
                        </Grid>
                    </StepCard>
                )}
            </FormContainer>
        </ModuleContainer>
    );
}
