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
                open={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                slotProps={{
                    textField: {
                        inputProps: {
                            readOnly: true,
                        },
                        onClick: () => setIsOpen(true),
                    },
                }}
            />
        </LocalizationProvider>
    );
}
