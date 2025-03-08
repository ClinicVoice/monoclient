import React, { useState } from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

export function CalendarDatePicker<TDate extends Date = Date>(props: DatePickerProps<TDate>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                {...props}
                open={props.open || isOpen}
                onOpen={() => {
                    setIsOpen(true);
                    if (props.onOpen) props.onOpen();
                }}
                onClose={() => {
                    setIsOpen(false);
                    if (props.onClose) props.onClose();
                }}
                slotProps={{
                    ...props.slotProps,
                    textField: {
                        ...props.slotProps?.textField,
                        onClick: () => setIsOpen(true),
                    },
                }}
            />
        </LocalizationProvider>
    );
}
