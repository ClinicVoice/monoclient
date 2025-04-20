'use client';

import React, { useState } from 'react';
import { Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useParams } from 'next/navigation';
import { FormContainer } from '@/app/clinic/[clinic-id]/book-appointment/styles';
import { useCreateAppointment } from '@/hooks/appointments/useCreateAppointment';
import { useClinic } from '@/hooks/clinics/useClinic';
import Step1SelectAppointment from '@/components/forms/book-appointment/Step1SelectAppointment';
import Step2EnterContactInfo from '@/components/forms/book-appointment/Step2EnterContactInfo';
import ConfirmAppointmentModal from '@/components/forms/book-appointment/ConfirmAppointmentModal';
import { useToaster } from '@/providers/ToasterProvider';
import { CreateAppointmentForm, SetAppointmentField } from '@/types/appointments';
import { CreateAppointmentRequest } from '@/types/appointments';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { AxiosError } from 'axios';

const steps = ['Select Appointment', 'Enter Contact Info'];

interface BookAppointmentComponentProps {
    onExit: () => void;
}

export default function BookAppointmentComponent({ onExit }: BookAppointmentComponentProps) {
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);
    const { setToaster } = useToaster();
    const [step, setStep] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [appointment, setAppointment] = useState<CreateAppointmentForm>({
        doctor_id: 0,
        health_card_number: '',
        phone_number: '',
        appt_start_time: '',
        appt_duration_minutes: 15,
        notes: '',
    });

    const { data: clinic, isLoading: clinicLoading, error: clinicError } = useClinic(clinicId);
    const { mutate: createAppointment, isPending } = useCreateAppointment();

    const updateAppointmentField: SetAppointmentField = (field, value) => {
        setAppointment((prev) => ({ ...prev, [field]: value }));
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!appointment.doctor_id) newErrors.doctor_id = 'Doctor is required';
        if (!appointment.appt_start_time) newErrors.appt_start_time = 'Time is required';
        if (!appointment.appt_duration_minutes || appointment.appt_duration_minutes <= 0)
            newErrors.appt_duration_minutes = 'Duration must be greater than 0';
        if (!appointment.notes) newErrors.notes = 'Notes are required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setToaster('Please complete all required fields.', 'error');
            return false;
        }
        return true;
    };
    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!appointment.health_card_number)
            newErrors.health_card_number = 'Health card number is required';
        if (!appointment.phone_number) newErrors.phone_number = 'Phone number is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setToaster('Please complete all contact info.', 'error');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (step === 0 && validateStep1()) setStep(1);
    };

    const handleBack = () => setStep((prev) => prev - 1);
    const handleReview = () => {
        if (validateStep2()) setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        const payload: CreateAppointmentRequest = appointment;
        createAppointment(payload, {
            onSuccess: () => {
                setToaster('Appointment successfully booked!', 'success');
                onExit();
            },
            onError: (err: AxiosError) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setToaster(err?.response?.data?.detail || 'Failed to book appointment', 'error');
            },
        });
    };

    if (clinicLoading) return <Loading />;
    if (clinicError || !clinic) return <ErrorScreen message="Error loading clinic information." />;

    return (
        <FormContainer>
            <Typography variant="h1" gutterBottom>
                {clinic.name}
            </Typography>
            <Typography variant="h3" gutterBottom>
                Book an Appointment
            </Typography>
            <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label, idx) => (
                    <Step key={idx}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {step === 0 ? (
                <Step1SelectAppointment
                    appointment={appointment}
                    updateAppointmentField={updateAppointmentField}
                    errors={errors}
                    handleNext={handleNext}
                    onExit={onExit}
                />
            ) : (
                <Step2EnterContactInfo
                    appointment={appointment}
                    updateAppointmentField={updateAppointmentField}
                    errors={errors}
                    handleBack={handleBack}
                    handleSubmit={handleReview}
                    isPending={isPending}
                />
            )}

            {showConfirmModal && (
                <ConfirmAppointmentModal
                    open={showConfirmModal}
                    appointment={appointment}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirm}
                    isPending={isPending}
                />
            )}
        </FormContainer>
    );
}
