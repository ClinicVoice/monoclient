import React, { useRef, useState } from 'react';
import { Box, IconButton, Typography, ClickAwayListener } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CalendarDatePicker } from '@/components/datepicker/CalendarDatePicker';

interface DateNavigatorProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    formattedDate: string;
    onPrev: () => void;
    onNext: () => void;
}

export const DateNavigator = ({
    currentDate,
    setCurrentDate,
    formattedDate,
    onPrev,
    onNext,
}: DateNavigatorProps) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const dateAnchorRef = useRef<HTMLDivElement>(null);

    const handleClickAway = () => {
        if (isCalendarOpen) {
            setIsCalendarOpen(false);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={onPrev}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Box
                    ref={dateAnchorRef}
                    onClick={() => setIsCalendarOpen(true)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        userSelect: 'none',
                        p: 1,
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: 'grey.100',
                        },
                    }}
                >
                    <CalendarTodayIcon sx={{ mr: 1 }} />
                    <Typography variant="h5">{formattedDate}</Typography>
                </Box>
                <IconButton onClick={onNext}>
                    <ArrowForwardIosIcon />
                </IconButton>
                <CalendarDatePicker
                    value={currentDate}
                    onChange={(newDate) => {
                        if (newDate) {
                            setCurrentDate(newDate);
                        }
                        setIsCalendarOpen(false);
                    }}
                    open={isCalendarOpen}
                    slotProps={{
                        textField: {
                            sx: { display: 'none' },
                        },
                        popper: {
                            anchorEl: dateAnchorRef.current,
                            placement: 'bottom-end',
                        },
                    }}
                />
            </Box>
        </ClickAwayListener>
    );
};
