'use client';

import { Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ModuleContainer } from '@/components/containers/Container';
import { FormContainer } from '@/app/family-clinic/[family-clinic-id]/book-appointment/styles';
import { useCreateAppointment } from '@/hooks/family_clinic/useCreateAppointment';
import Step1SelectAppointment from '@/components/family-clinic/book-appointment/Step1SelectAppointment';
import Step2EnterContactInfo from '@/components/family-clinic/book-appointment/Step2EnterContactInfo';
import ConfirmAppointmentModal from '@/components/family-clinic/book-appointment/ConfirmAppointmentModal';
import { useToaster } from '@/providers/ToasterProvider';
import {
    CreateAppointmentForm,
    SetAppointmentField,
} from '@/types/family_clinic/appointment_records';
import { convertTo24HourFormat } from '@/utils/dateTimeUtils';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';

const steps = ['Select Appointment', 'Enter Contact Info'];

export default function BookAppointment() {
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const { setToaster } = useToaster();
    const [step, setStep] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [appointment, setAppointment] = useState<CreateAppointmentForm>({
        provider: '',
        appointment_type: '',
        note: '',
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

    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);
    const { mutate: createAppointment, isPending } = useCreateAppointment();

    const updateAppointmentField: SetAppointmentField = (field: string, value: unknown) => {
        setAppointment((prev: CreateAppointmentForm) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!appointment.provider) newErrors.provider = 'Provider is required';
        if (!appointment.appointment_type)
            newErrors.appointment_type = 'Appointment Type is required';
        if (!appointment.note) newErrors.note = 'Reason for Visit is required';
        if (!appointment.date) newErrors.date = 'Date is required';
        if (!appointment.time) newErrors.time = 'Time is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setToaster('Please complete all required contact details.', 'error');
        }

        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};
        if (appointment.hasHealthCard) {
            if (!appointment.healthCardNumber)
                newErrors.healthCardNumber = 'Health Card Number is required';
            if (!appointment.healthCardVersion) newErrors.healthCardVersion = 'Version is required';
        } else {
            if (!appointment.firstName) newErrors.firstName = 'First Name is required';
            if (!appointment.lastName) newErrors.lastName = 'Last Name is required';
            if (!appointment.sex) newErrors.sex = 'Sex is required';
            if (!appointment.birthday) newErrors.birthday = 'Birthday is required';
        }
        if (!appointment.contact) newErrors.contact = 'Phone Number is required';
        if (!appointment.email) newErrors.email = 'Email is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setToaster('Please complete all required contact details.', 'error');
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 0 && validateStep1()) setStep(1);
    };

    const handleBack = () => setStep((prev) => prev - 1);

    const handleReviewAppointment = () => {
        if (!validateStep2()) return;

        setShowConfirmModal(true);
    };

    const handleConfirmAppointment = () => {
        const date = appointment.date;
        const time = convertTo24HourFormat(appointment.time);
        const appointmentDateTime = new Date(`${date}T${time}:00Z`).toISOString();

        createAppointment(
            {
                provider: appointment.provider,
                appointment_type: appointment.appointment_type,
                health_card_number: appointment.hasHealthCard ? appointment.healthCardNumber : '',
                health_card_version: appointment.hasHealthCard ? appointment.healthCardVersion : '',
                first_name: appointment.firstName,
                last_name: appointment.lastName,
                phone_number: appointment.contact,
                email: appointment.email,
                appointment_date_time: appointmentDateTime,
                birth_date: appointment.birthday,
                sex: appointment.sex,
                pharmacy: appointment.pharmacy,
                notes: appointment.note,
            },
            {
                onSuccess: () => {
                    setToaster('Appointment successfully booked!', 'success');
                    router.push(`/family-clinic/${familyClinicId}`);
                },
                onError: () => {
                    setToaster('Failed to book appointment. Please try again.', 'error');
                },
            },
        );
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error || !clinic) {
        return <ErrorScreen message="Error loading clinic information." />;
    }

    return (
        <ModuleContainer>
            <FormContainer>
                <Typography variant="h1" gutterBottom>
                    {clinic.name}
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
                    <Step1SelectAppointment
                        appointment={appointment}
                        updateAppointmentField={updateAppointmentField}
                        errors={errors}
                        handleNext={handleNext}
                    />
                ) : (
                    <Step2EnterContactInfo
                        appointment={appointment}
                        updateAppointmentField={updateAppointmentField}
                        errors={errors}
                        handleBack={handleBack}
                        handleSubmit={handleReviewAppointment}
                        isPending={isPending}
                    />
                )}

                <ConfirmAppointmentModal
                    open={showConfirmModal}
                    appointment={appointment}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirmAppointment}
                    isPending={isPending}
                />
            </FormContainer>
        </ModuleContainer>
    );
}
